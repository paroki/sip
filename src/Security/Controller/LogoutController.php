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
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;

// #[AsController]
class LogoutController
{
    // #[Route(path: '/auth/logout', name: 'auth_logout', methods: 'GET')]
    public function index(): JsonResponse
    {
        $response = new JsonResponse([
            'message' => 'Anda berhasil keluar dari aplikasi SIP',
        ]);
        $response->headers->clearCookie(SecurityConstant::BEARER_COOKIE);
        $response->headers->clearCookie('refresh_token');
        $response->headers->clearCookie('REFRESH_TOKEN');

        return $response;
    }
}
