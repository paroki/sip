<?php

/*
 * This file is part of the SIP project.
 *
 * (c) 2023 SIP Developer Team
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace SIP\Security\Subscriber;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Events;
use SIP\Security\Entity\User;
use SIP\Security\UserProfileGenerator;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Http\Event\LogoutEvent;

class JWTEventSubscriber implements EventSubscriberInterface
{
    private UserProfileGenerator $profileGenerator;

    public function __construct(
        UserProfileGenerator $profileGenerator
    ) {
        $this->profileGenerator = $profileGenerator;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            Events::AUTHENTICATION_SUCCESS => 'onAuthenticationSuccess',
            LogoutEvent::class => 'onLogout',
        ];
    }

    public function onAuthenticationSuccess(AuthenticationSuccessEvent $event): void
    {
        $data = $event->getData();

        if (isset($data['token'])) {
            /** @var User $user */
            $user = $event->getUser();
            $response = $event->getResponse();
            $data = json_decode($response->getContent(), true);
            $data = array_merge($data, $this->profileGenerator->getProfileData($user));
            $cookies = $response->headers->getCookies();
            $expires = $cookies[1]->getExpiresTime();
            $data['expiresAt'] = date_timestamp_set(
                new \DateTime(),
                $cookies[0]->getExpiresTime())
                ->format('c');
            $data['refreshExpiresAt'] = date_timestamp_set(
                new \DateTime(),
                $expires)
                ->format('c');
            $event->setData($data);
        }
    }

    public function onLogout(LogoutEvent $event)
    {
        $cookie = $_ENV['COOKIE_BEARER'];
        $event->getResponse()->headers->clearCookie($cookie);
    }
}
