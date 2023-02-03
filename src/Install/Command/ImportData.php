<?php

/*
 * This file is part of the SIP project.
 *
 * (c) 2023 SIP Developer Team
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace SIP\Install\Command;

use SIP\Referensi\Fixtures\KeuskupanFixture;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ImportData extends Command
{
    private KeuskupanFixture $keuskupan;

    public function __construct(
        KeuskupanFixture $keuskupan
    ) {
        $this->keuskupan = $keuskupan;
        parent::__construct('sip:install');
    }

    public function execute(InputInterface $input, OutputInterface $output): int
    {
        $this->keuskupan->start();

        return Command::SUCCESS;
    }
}
