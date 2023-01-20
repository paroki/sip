<?php


namespace SIP\Security\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\User\UserInterface;

#[AsController]
class CheckTokenController
{
    #[Route(path: '/auth/check', name: 'auth_check_token', methods: 'GET')]
    public function checkToken(UserInterface $user): JsonResponse
    {
        /* @var \SIP\Security\Entity\User $user */
        return new JsonResponse([
            'id' => $user->getId(),
            'email' => $user->getEmail()
        ]);
    }
}
