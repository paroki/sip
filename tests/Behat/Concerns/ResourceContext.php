<?php

/*
 * This file is part of the SIP project.
 *
 * (c) 2023 SIP Developer Team
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

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
