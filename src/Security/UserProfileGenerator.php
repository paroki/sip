<?php

namespace SIP\Security;

use SIP\Security\Entity\User;
use Symfony\Component\Security\Core\Role\RoleHierarchyInterface;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

class UserProfileGenerator
{
    private RoleHierarchyInterface $hierarchy;

    public function __construct(
        RoleHierarchyInterface $hierarchy,
    )
    {
        $this->hierarchy = $hierarchy;
    }

    public function getProfileData(User $user): array
    {
        return [
            'id' => $user->getId(),
            'nama' => $user->getNama(),
            'roles' => $this->hierarchy->getReachableRoleNames($user->getRoles()),
        ];
    }
}
