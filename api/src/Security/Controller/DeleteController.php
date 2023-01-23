<?php

namespace SIP\Security\Controller;

use SIP\Security\Entity\User;
use SIP\Security\Repository\UserRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class DeleteController
{
    private UserRepository $userRepository;

    public function __construct(
        UserRepository $userRepository
    )
    {
        $this->userRepository = $userRepository;
    }

    public function __invoke(User $resource): JsonResponse
    {
        $repo = $this->userRepository;
        $resource->setActive(false);
        $repo->save($resource);

        return new JsonResponse([], Response::HTTP_NO_CONTENT);
    }
}
