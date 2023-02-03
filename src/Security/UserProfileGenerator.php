<?php

/*
 * This file is part of the SIP project.
 *
 * (c) 2023 SIP Developer Team
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace SIP\Security;

use SIP\Security\Entity\User;
use Symfony\Component\Security\Core\Role\RoleHierarchyInterface;

class UserProfileGenerator
{
    private RoleHierarchyInterface $hierarchy;

    public function __construct(
        RoleHierarchyInterface $hierarchy,
    ) {
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
