<?php

namespace SIP\Security\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gesdinet\JWTRefreshTokenBundle\Entity\RefreshToken as BaseRefreshToken;

#[ORM\Entity]
#[ORM\Table(name: 'scr_refresh_tokens')]
class RefreshToken extends BaseRefreshToken
{

}
