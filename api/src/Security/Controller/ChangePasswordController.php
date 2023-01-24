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

use SIP\Security\Entity\User;
use SIP\Security\Repository\UserRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[AsController]
class ChangePasswordController
{
    private UserRepository $userRepository;

    public function __construct(
        UserRepository $userRepository
    ) {
        $this->userRepository = $userRepository;
    }

    #[Route('/auth/change-password', 'auth_change_password', methods: ['POST'])]
    #[IsGranted(User::ROLE_ADMIN)]
    public function index(
        Request $request,
        #[CurrentUser]
        User $currentUser
    ): JsonResponse {
        $content            = $request->getContent();
        $data               = json_decode($content);
        $userRepository     = $this->userRepository;
        $password        = $data->password;
        $passwordConfirm = $data->passwordConfirm;
        $user               = null;

        if(property_exists($data, 'id')){
            $id                 = $data->id;
            $user = $userRepository->find($id);
        }

        if ($password !== $passwordConfirm) {
            return new JsonResponse([
                'message' => 'Password dan konfirmasi password tidak sama',
            ], 422);
        }

        if(null !== $user){
            $userRepository->upgradePassword($user, $password);
            return new JsonResponse([], 200);
        }

        return new JsonResponse([
            "code" => "422",
            "message" => "Unknown user to process",
        ], 422);
    }
}
