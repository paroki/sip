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

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use SIP\Security\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

final class UserPasswordHasher implements ProcessorInterface
{
    private ProcessorInterface $processor;

    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(ProcessorInterface $processor, UserPasswordHasherInterface $passwordHasher)
    {
        $this->processor      = $processor;
        $this->passwordHasher = $passwordHasher;
    }

    public function process($data, Operation $operation, array $uriVariables = [], array $context = [])
    {
        if ( ! $data->getPlainPassword()) {
            return $this->processor->process($data, $operation, $uriVariables, $context);
        }

        $hashedPassword = $this->passwordHasher->hashPassword(
            $data,
            $data->getPlainPassword()
        );
        $data->setPassword($hashedPassword);
        $data->eraseCredentials();

        return $this->processor->process($data, $operation, $uriVariables, $context);
    }

    public function hashPassword(string $plainPassword): string
    {
        return $this->passwordHasher->hashPassword(new User(), $plainPassword);
    }
}
