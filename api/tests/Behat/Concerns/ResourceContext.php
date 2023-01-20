<?php


namespace SIP\Tests\Behat\Concerns;


use Behat\Behat\Hook\Scope\BeforeScenarioScope;
use SIP\Tests\Behat\ResourceContext as Context;

trait ResourceContext
{
    protected ?Context $resourceContext = null;

    /**
     * @BeforeScenario
     */
    public function gatherResourceContext(BeforeScenarioScope $scope): void
    {
        $this->resourceContext = $scope->getEnvironment()->getContext(Context::class);
    }
}
