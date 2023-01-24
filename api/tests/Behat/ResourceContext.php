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
use Behat\Behat\Context\Context;
use Behat\Gherkin\Node\PyStringNode;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use SIP\Security\Entity\User;
use SIP\Security\Repository\UserRepository;
use SIP\Tests\Behat\Concerns\Rest;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class ResourceContext implements Context
{
    use Rest;

    private array $resourceMaps = [];
    private IriConverterInterface $iriConverter;
    private EntityManagerInterface $em;
    private ?object $currentResource = null;

    public function __construct(
        IriConverterInterface $iriConverter,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $hasher
    ) {
        $this->iriConverter = $iriConverter;
        $this->resourceMaps = include __DIR__.'/Resources/resource_maps.php';
        $this->em           = $em;
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
        $json = json_decode($data, true);
        $this->iHaveResource($name, $json);
    }

    public function iHaveResource(string $name, array $data): object
    {
        $class = $this->getResourceClass($name);
        $ob    = $this->updateResource($class, $data);

        $this->currentResource = $ob;

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
        $url  = $resource;
        $rest = $this->restContext;
        if ('/' === substr($resource, 0)) {
            $class = $this->getResourceClass($resource);
            // $url = $this->iriConverter->getIriFromResource(User::class);
            $url = '/users';
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
}
