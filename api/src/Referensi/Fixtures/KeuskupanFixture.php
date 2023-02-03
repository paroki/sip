<?php

/*
 * This file is part of the SIP project.
 *
 * (c) 2023 SIP Developer Team
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace SIP\Referensi\Fixtures;

use Doctrine\ORM\EntityManagerInterface;
use League\Csv\Reader;
use League\Csv\Statement;
use League\Csv\TabularDataReader;
use SIP\Referensi\Entity\Keuskupan;
use SIP\Referensi\Entity\Paroki;

final class KeuskupanFixture
{
    private array  $keuskupanMap = [
        'kode',
        'nomor',
        'nama',
        'namaLatin',
        'alamat',
        'kota',
        'telepon',
        'fax',
        'website',
        'email',
        'uskup',
    ];

    private array  $parokiMap = [
        'kode',
        'keuskupan',
        'nomor',
        'nama',
        'gereja',
        'alamat',
        'kota',
        'telepon',
        'fax',
        'website',
        'email',
        'pastorParoki',
        'wilayahKeuskupan',
    ];
    private EntityManagerInterface $em;

    public function __construct(
        EntityManagerInterface $em
    ) {
        $this->em = $em;
    }

    public function start(): void
    {
        $this->loadKeuskupan();
        $this->loadParoki();
    }

    public function loadKeuskupan(): void
    {
        $records = $this->loadRecords(__DIR__.'/../Resources/csv/keuskupan.csv');

        foreach ($records as $record) {
            $keuskupan = $this->em->getRepository(Keuskupan::class)
                ->findOneBy(['kode' => $record[0]]);
            if ( ! \is_object($keuskupan)) {
                $keuskupan = new Keuskupan();
            }

            $this->doLoad($this->keuskupanMap, $keuskupan, $record);
        }
    }

    private function loadParoki()
    {
        $records = $this->loadRecords(__DIR__.'/../Resources/csv/paroki.csv');

        foreach ($records as $record) {
            $paroki = $this->em->getRepository(Paroki::class)
                ->findOneBy(['kode' => $record[0]]);
            if ( ! \is_object($paroki)) {
                $paroki = new Paroki();
            }

            $keuskupan = $this->em->getRepository(Keuskupan::class)
                ->findOneBy(['kode' => $record[1]]);
            $paroki->setKeuskupan($keuskupan);
            $this->doLoad($this->parokiMap, $paroki, $record);
        }
    }

    private function loadRecords(string $file): TabularDataReader
    {
        $reader = Reader::createFromPath($file);
        $stmt   = Statement::create()->offset(1);

        return $stmt->process($reader);
    }

    private function doLoad(array $map, object $resource, array $record)
    {
        foreach ($map as $index => $prop) {
            $current = \call_user_func([$resource, 'get'.$prop]);
            $data    = str_replace('"', '', $record[$index]);
            if ( ! \is_object($current)) {
                \call_user_func([$resource, 'set'.$prop], $data);
            }
        }
        $this->em->persist($resource);
        $this->em->flush();
    }
}
