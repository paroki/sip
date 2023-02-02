<?php

/*
 * This file is part of the SIP project.
 *
 * (c) 2023 SIP Developer Team
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use SIP\Kernel;

require_once dirname(__DIR__).'/vendor/autoload_runtime.php';

sleep(1);
return function (array $context) {
    return new Kernel($context['APP_ENV'], (bool) $context['APP_DEBUG']);
};
