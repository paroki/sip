<?php


namespace SIP\Security\Subscriber;


use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Events;
use SIP\Security\SecurityConstant;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Cookie;

class JWTEventSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            Events::AUTHENTICATION_SUCCESS => 'onAuthenticationSuccess',
        ];
    }

    public function onAuthenticationSuccess(AuthenticationSuccessEvent $event): void
    {
        $data = $event->getData();

        if(isset($data['token'])){
            /* @var \SIP\Security\Entity\User $user */
            $user = $event->getUser();
            $response = $event->getResponse();
            $data = json_decode($response->getContent(), true);
            $data['user_id'] = $user->getId();

            $event->setData($data);
        }
    }
}
