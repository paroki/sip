<?php

namespace SIP\Install\Command;

use Doctrine\ORM\EntityManagerInterface;
use SIP\Referensi\Fixtures\KeuskupanFixture;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ImportData extends Command
{
    private EntityManagerInterface $em;
    private KeuskupanFixture $keuskupan;

    public function __construct(
        EntityManagerInterface $em,
        KeuskupanFixture $keuskupan
    )
    {
        $this->em = $em;
        $this->keuskupan = $keuskupan;
        parent::__construct("sip:install");
    }

    public function execute(InputInterface $input, OutputInterface $output): int
    {
        $this->keuskupan->start();
        return Command::SUCCESS;
    }
}
