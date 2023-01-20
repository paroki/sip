<?php


namespace SIP\Security\Controller;

use ApiPlatform\Api\IriConverterInterface;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use Psr\Container\ContainerInterface;
use SIP\Security\Entity\User;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Role\RoleHierarchyInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

#[AsController]
class ProfileController
{
    /**
     * @var RoleHierarchyInterface
     */
    private RoleHierarchyInterface $hierarchy;
    /**
     * @var IriConverterInterface
     */
    private IriConverterInterface $iriConverter;

    public function __construct(
        RoleHierarchyInterface $hierarchy,
        IriConverterInterface $iriConverter,
        UrlGeneratorInterface $urlGenerator
    )
    {
        //$foo = $urlGenerator->generate('user_get_collection');
        $this->hierarchy = $hierarchy;
        $this->iriConverter = $iriConverter;
    }

    #[Route(path: '/auth/profile', name: 'auth_profile', methods: 'GET')]
    public function index(
        UserInterface $user
    ): JsonResponse{
        $hierarchy = $this->hierarchy;
        $roles = $hierarchy->getReachableRoleNames($user->getRoles());
        $routes = $this->generateRoutes();
        /* @var User $user */
        return new JsonResponse([
            'id' => $user->getId(),
            'nama' => $user->getNama(),
            // 'email' => $user->getEmail(),
            'roles' => $roles,
            'routes' => $routes,
        ]);
    }

    private function generateRoutes()
    {
        $iriConverter = $this->iriConverter;
        $user = $iriConverter->getIriFromResource(
            User::class,
            UrlGeneratorInterface::ABSOLUTE_PATH,
            new GetCollection()
        );
        return [
            'auth_login' => '/auth/login',
            'auth_logout' => '/auth/logout',
            'API_USER' => $user
        ];
    }
}
