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
