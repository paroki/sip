<?php


namespace SIP\Tests\Behat\Concerns;


use Behat\Behat\Hook\Scope\BeforeScenarioScope;
use Behat\MinkExtension\Context\MinkContext;
use Behatch\Context\RestContext;

trait Rest
{
    protected RestContext $restContext;
    protected MinkContext $minkContext;
    /**
     * @BeforeScenario
     */
    public function gatherRestContext(BeforeScenarioScope $scope): void
    {
        $this->restContext = $scope->getEnvironment()->getContext(RestContext::class);
        $this->minkContext = $scope->getEnvironment()->getContext(MinkContext::class);

        $this->restContext->iAddHeaderEqualTo('Content-Type', 'application/json');
        $this->restContext->iAddHeaderEqualTo('Accept', 'application/json');
    }
}
