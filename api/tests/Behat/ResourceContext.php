<?php

/*
 * This file is part of the SIP project.
 *
 * (c) 2023 SIP Developer Team
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace SIP\Tests\Behat;

use ApiPlatform\Api\IriConverterInterface;
use ApiPlatform\Api\UrlGeneratorInterface;
use ApiPlatform\Operation\PathSegmentNameGeneratorInterface;
use ApiPlatform\Symfony\Routing\SkolemIriConverter;
use Behat\Behat\Context\Context;
use Behat\Gherkin\Node\PyStringNode;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use SIP\Core\SingularPathSegmentNameGenerator;
use SIP\Security\Entity\User;
use SIP\Security\Repository\UserRepository;
use SIP\Tests\Behat\Concerns\Rest;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class ResourceContext implements Context
{
    use Rest;

    private array $resourceMaps = [];
    private EntityManagerInterface $em;
    private ?object $currentResource = null;
    private UrlGeneratorInterface $urlGenerator;
    private IriConverterInterface $iriConverter;
    private SingularPathSegmentNameGenerator $segmentNameGenerator;

    private array $createdResources = [];

    public function __construct(
        SingularPathSegmentNameGenerator $segmentNameGenerator,
        IriConverterInterface $iriConverter,
        UrlGeneratorInterface $urlGenerator,

        EntityManagerInterface $em,
        UserPasswordHasherInterface $hasher
    ) {
        $this->urlGenerator = $urlGenerator;
        $this->iriConverter = $iriConverter;
        $this->segmentNameGenerator = $segmentNameGenerator;
        $this->em           = $em;

        $this->resourceMaps = $this->generateResourceMaps();
    }

    /**
     * @Given I dont have :resource with :filter equal to :value
     */
    public function iDonTHaveResourceWith(
        string $resource,
        string $filter,
        string $value
    ): void {
        $repo = $this->getRepository($resource);
        $ob   = $repo->findOneBy([$filter => $value]);
        if (\is_object($ob)) {
            $this->em->remove($ob);
            $this->em->flush();
        }
    }

    /**
     * @Given I have :name resource with:
     */
    public function iHaveResourceWith(string $name, PyStringNode $data): void
    {
        $data = $this->patchData($data);
        $json = json_decode($data, true);
        $this->iHaveResource($name, $json);
    }

    public function iHaveResource(string $name, array $data): object
    {
        $class = $this->getResourceClass($name);
        $ob    = $this->updateResource($class, $data);

        $this->currentResource = $ob;
        $this->createdResources[$name] = $ob;

        return $ob;
    }

    /**
     * @Given I send a :method request to that resource
     * @Given I send a :method request to that resource with:
     */
    public function iSendARequestToWith(
        string $method,
        ?PyStringNode $body = null
    ): void {
        $uri = $this->iriConverter->getIriFromResource($this->currentResource);
        $this->restContext->iSendARequestTo($method, $uri, $body);
    }

    /**
     * @Given I send a :method request to :resource with:
     */
    public function iSendRequestTo($method, string $resource, ?PyStringNode $body=null)
    {
        $url  = "/".$resource;
        $rest = $this->restContext;
        if(null !== $body){
            $body = $this->patchData($body);
        }

        if ('/' !== substr($resource, 0)) {
            $class = $this->getResourceClass($resource);
            $r = new \ReflectionClass($class);
            $segment = $this->segmentNameGenerator->getSegmentName($r->getShortName());
            $url = $this->urlGenerator->generate('_api_/'.$segment.'{._format}_post');
        }
        $rest->iAddHeaderEqualTo('Content-Type', 'application/json');
        $rest->iAddHeaderEqualTo('Accept', 'application/json');
        $rest->iSendARequestTo($method, $url, $body);
    }

    public function findResource(string $class, array $filters): ?object
    {
        $repo = $this->em->getRepository($class);

        return $repo->findOneBy($filters);
    }

    public function updateResource(mixed $class, mixed $json): object
    {
        $em      = $this->em;
        $repo    = $em->getRepository($class);
        $filters = \array_slice($json, 0, 1);
        $ob      = $this->findResource($class, $filters);

        if ( ! \is_object($ob)) {
            $ob = new $class();
        }
        foreach ($json as $name => $value) {
            $setter = 'set'.$name;
            \call_user_func([$ob, $setter], $value);
        }

        if ($repo instanceof UserRepository) {
            $repo->hashPassword($ob);
        }

        $em->persist($ob);
        $em->flush();

        return $ob;
    }

    public function getRepository(string $resource): EntityRepository
    {
        return $this->em->getRepository($this->getResourceClass($resource));
    }

    public function getResourceClass(string $resource): string
    {
        if (class_exists($resource)) {
            return $resource;
        }
        if (isset($this->resourceMaps[$resource])) {
            return $this->resourceMaps[$resource];
        }
        throw new \Exception('Invalid resource name: '.$resource);
    }

    /**
     * @When I wait for the page to be loaded
     */
    public function waitForPageLoaded()
    {
        $this->minkContext->getSession()->wait(10000, "document.readyState === 'complete'");
    }

    private function generateResourceMaps(): array
    {
        $classes = $this->em->getConfiguration()->getMetadataDriverImpl()->getAllClassNames();
        $segmentNameGenerator = $this->segmentNameGenerator;
        $overrides = include __DIR__.'/Resources/resource_maps_override.php';
        $maps = [];

        foreach($classes as $class){
            $r = new \ReflectionClass($class);
            $segmentName = $segmentNameGenerator->getSegmentName($r->getShortName());
            $maps[$segmentName] = $class;

        }

        return array_merge($maps, $overrides);
    }

    private function patchData(string $data): PyStringNode
    {
        foreach($this->createdResources as $name => $resource){
            $method = 'getId';
            if(method_exists($resource, $method)){
                $id = call_user_func([$resource,$method]);
                $search = "${name}.id";
                $data = str_replace($search, "/$name/$id", $data);
            }
        }
        return new PyStringNode([$data], 0);
    }
}
