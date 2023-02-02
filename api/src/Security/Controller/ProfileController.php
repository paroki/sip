<?php

/*
 * This file is part of the SIP project.
 *
 * (c) 2023 SIP Developer Team
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace SIP\Security\Controller;

use ApiPlatform\Api\IriConverterInterface;
use ApiPlatform\Metadata\GetCollection;
use SIP\Security\Entity\User;
use SIP\Security\UserProfileGenerator;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Role\RoleHierarchyInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

#[AsController]
class ProfileController
{
    private UserProfileGenerator $profileGenerator;

    public function __construct(
        UserProfileGenerator $profileGenerator
    )
    {
        $this->profileGenerator = $profileGenerator;
    }

    #[Route(path: '/auth/profile', name: 'auth_profile', methods: 'GET')]
    public function index(
        #[CurrentUser]User $user
    ): JsonResponse
    {
        return new JsonResponse($this->profileGenerator->getProfileData($user));
    }
}
