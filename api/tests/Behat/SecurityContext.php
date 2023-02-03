<?php

/*
 * This file is part of the SIP project.
 *
 * (c) 2023 SIP Developer Team
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace SIP\Tests\Behat;

use Behat\Behat\Context\Context;
use Behat\Gherkin\Node\PyStringNode;
use SIP\Security\Entity\User;
use SIP\Security\SecurityConstant;
use SIP\Tests\Behat\Concerns\ResourceContext;
use SIP\Tests\Behat\Concerns\Rest;

use function PHPUnit\Framework\assertNotNull;

class SecurityContext implements Context
{
    use ResourceContext;
    use Rest;

    /**
     * @Given I sign in with :email and password :password
     * @Given I have signed in with email :email and password :password
     */
    public function iSignInWithEmailAndPassword(string $email, string $password): void
    {
        $rest = $this->restContext;
        $json = json_encode([
            'email' => $email,
            'password' => $password,
        ]);
        $rest->iAddHeaderEqualTo('Content-Type', 'application/json');
        $rest->iAddHeaderEqualTo('Accept', 'application/json');
        $rest->iSendARequestToWithBody('POST', '/auth/login', new PyStringNode([$json], 0));
    }

    /**
     * @Given I should be logged in
     */
    public function iShouldBeLoggedin()
    {
        $session = $this->restContext->getSession();

        assertNotNull(
            $session->getCookie(SecurityConstant::BEARER_COOKIE),
            'Cookie should contain '.SecurityConstant::BEARER_COOKIE
        );
        // assertNotNull(
        //    $session->getCookie(SecurityConstant::PROFILE_COOKIE),
        //    "Cookie should contain ".SecurityConstant::PROFILE_COOKIE
        // );
    }

    /**
     * @Given I have signed in as admin
     */
    public function iHaveSignedInAsAdmin()
    {
        $this->iHaveUser(
            $email = 'sip@example.com',
            $password = 'sip',
            [User::ROLE_SUPER_ADMIN]
        );
        $this->iSignInWithEmailAndPassword($email, $password);
    }

    /**
     * @Given I have signed in
     */
    public function iHaveSignedIn()
    {
        $this->iHaveUser(
            $email = 'test@example.com',
            $password = 'test',
            [User::ROLE_USER]
        );
        $this->iSignInWithEmailAndPassword($email, $password);
    }

    public function iHaveUser(string $email, string $password, array $roles = [User::ROLE_USER])
    {
        $this->resourceContext->iHaveResource(User::class, [
            'email' => $email,
            'plainPassword' => $password,
            'roles' => $roles,
        ]);
    }
}
