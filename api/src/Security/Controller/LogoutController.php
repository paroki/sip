<?php


namespace SIP\Security\Controller;

use SIP\Security\SecurityConstant;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;

#[AsController]
class LogoutController
{
    #[Route(path: '/auth/logout', name: 'auth_logout', methods: 'GET')]
    public function index(): Response
    {
        $response = new Response();
        $response->headers->clearCookie(SecurityConstant::BEARER_COOKIE);

        return $response;
    }
}
