<?php

/*
 * This file is part of the SIP project.
 *
 * (c) 2023 SIP Developer Team
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace SIP\Referensi\Entity;

use ApiPlatform\Metadata as Api;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use SIP\Security\Entity\User;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ORM\Table(name: 'ref_paroki')]
#[Api\ApiResource(
    operations: [
        new Api\GetCollection(),
        new Api\Post(),
        new Api\Get(),
        new Api\Put(),
        new Api\Delete(),
        new Api\GetCollection(
            uriTemplate: '/paroki/select',
            routeName: 'paroki_select',
            normalizationContext: ['groups' => 'select'],
            name: 'paroki_select'
        ),
    ],
    normalizationContext: ['groups' => ['read']],
    denormalizationContext: ['groups' => ['write']]
)]
class Paroki
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    #[ORM\Column(type: UuidType::NAME)]
    #[Groups(['read', 'select'])]
    private ?string $id = null;

    #[ORM\Column(type: 'string', length: 7, unique: true)]
    #[Groups(['read', 'write'])]
    private ?string $kode = null;

    #[ORM\ManyToOne(
        targetEntity: Keuskupan::class
    )]
    #[Groups(['read', 'select', 'write'])]
    private Keuskupan $keuskupan;

    #[ORM\Column(type: 'integer')]
    #[Groups(['read', 'write'])]
    private int $nomor = 0;

    #[ORM\Column(length: 100)]
    #[Groups(['read', 'select', 'write'])]
    private ?string $nama = null;

    #[ORM\Column(length: 100)]
    #[Groups(['read', 'write'])]
    private ?string $gereja = null;

    #[ORM\Column(length: 150, nullable: true)]
    #[Groups(['read', 'write'])]
    private ?string $alamat = null;

    /**
     * Kabupaten/Kota Keuskupan.
     */
    #[ORM\Column(length: 50, nullable: true)]
    #[Groups(['read', 'write'])]
    private ?string $kota = null;

    #[ORM\Column(length: 50, nullable: true)]
    #[Groups(['read', 'write'])]
    private ?string $telepon = null;

    #[ORM\Column(length: 50, nullable: true)]
    #[Groups(['read', 'write'])]
    private ?string $fax = null;

    #[ORM\Column(length: 50, nullable: true)]
    #[Groups(['read', 'write'])]
    private ?string $website = null;

    #[ORM\Column(length: 50, nullable: true)]
    #[Groups(['read', 'write'])]
    private ?string $email = null;

    #[ORM\Column(length: 50, nullable: true)]
    #[Groups(['read', 'write'])]
    private ?string $pastorParoki = null;

    #[ORM\Column(length: 100, nullable: true)]
    #[Groups(['read', 'write'])]
    private ?string $wilayahKeuskupan = null;

    #[ORM\Column(type: Types::DATETIME_IMMUTABLE, nullable: true)]
    #[Gedmo\Timestampable()]
    #[Groups(['read'])]
    private \DateTimeImmutable $updatedAt;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[Groups(['read'])]
    private ?User $updatedBy = null;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getKode(): ?string
    {
        return $this->kode;
    }

    public function setKode(?string $kode): self
    {
        $this->kode = $kode;

        return $this;
    }

    public function getKeuskupan(): Keuskupan
    {
        return $this->keuskupan;
    }

    public function setKeuskupan(Keuskupan $keuskupan): self
    {
        $this->keuskupan = $keuskupan;

        return $this;
    }

    public function getNomor(): int
    {
        return $this->nomor;
    }

    public function setNomor(int $nomor): self
    {
        $this->nomor = $nomor;

        return $this;
    }

    public function getNama(): ?string
    {
        return $this->nama;
    }

    public function setNama(?string $nama): self
    {
        $this->nama = $nama;

        return $this;
    }

    public function getGereja(): ?string
    {
        return $this->gereja;
    }

    public function setGereja(?string $gereja): self
    {
        $this->gereja = $gereja;

        return $this;
    }

    public function getAlamat(): ?string
    {
        return $this->alamat;
    }

    public function setAlamat(?string $alamat): self
    {
        $this->alamat = $alamat;

        return $this;
    }

    public function getKota(): ?string
    {
        return $this->kota;
    }

    public function setKota(?string $kota): self
    {
        $this->kota = $kota;

        return $this;
    }

    public function getTelepon(): ?string
    {
        return $this->telepon;
    }

    public function setTelepon(?string $telepon): self
    {
        $this->telepon = $telepon;

        return $this;
    }

    public function getFax(): ?string
    {
        return $this->fax;
    }

    public function setFax(?string $fax): self
    {
        $this->fax = $fax;

        return $this;
    }

    public function getWebsite(): ?string
    {
        return $this->website;
    }

    public function setWebsite(?string $website): self
    {
        $this->website = $website;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPastorParoki(): ?string
    {
        return $this->pastorParoki;
    }

    public function setPastorParoki(?string $pastorParoki): self
    {
        $this->pastorParoki = $pastorParoki;

        return $this;
    }

    public function getWilayahKeuskupan(): ?string
    {
        return $this->wilayahKeuskupan;
    }

    public function setWilayahKeuskupan(?string $wilayahKeuskupan): self
    {
        $this->wilayahKeuskupan = $wilayahKeuskupan;

        return $this;
    }

    public function getUpdatedAt(): \DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getUpdatedBy(): ?User
    {
        return $this->updatedBy;
    }

    public function setUpdatedBy(?User $updatedBy): self
    {
        $this->updatedBy = $updatedBy;

        return $this;
    }
}
