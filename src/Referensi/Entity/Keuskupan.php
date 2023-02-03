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

use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata as Api;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use SIP\Security\Entity\User;
use Symfony\Bridge\Doctrine\IdGenerator\UuidGenerator;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
#[ORM\Table(name: 'ref_keuskupan')]
#[Api\ApiResource(
    shortName: 'keuskupan',
    operations: [
        new Api\GetCollection(),
        new Api\Post(),
        new Api\Get(),
        new Api\Put(),
        new Api\Delete(),
        new Api\GetCollection(
            uriTemplate: '/keuskupan/select',
            routeName: 'keuskupan_select',
            normalizationContext: ['groups' => 'select'],
            name: 'keuskupan_select'
        ),
    ],
    normalizationContext: ['groups' => ['read', 'select']],
    denormalizationContext: ['groups' => ['write']]
)]
#[Api\ApiFilter(
    OrderFilter::class,
    properties: ['nama' => 'ASC', 'kode' => 'ASC'],
    arguments: ['orderParameterName' => 'sort'],
)]
#[Api\ApiFilter(
    SearchFilter::class,
    properties: ['nama' => 'ipartial']
)]
class Keuskupan
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: UuidGenerator::class)]
    #[ORM\Column(type: UuidType::NAME)]
    #[Groups(['select', 'read'])]
    private ?string $id = null;

    #[ORM\Column(type: 'string', length: 3, unique: true)]
    #[Groups(['read', 'write'])]
    private ?string $kode = null;

    #[ORM\Column(type: 'integer')]
    #[Groups(['read', 'write'])]
    private int $nomor = 0;

    #[ORM\Column(type: 'string', length: 100)]
    #[Groups(['select', 'read', 'write'])]
    #[Assert\NotBlank]
    private ?string $nama = null;

    #[ORM\Column(length: 50, nullable: true)]
    #[Groups(['read', 'write'])]
    private ?string $namaLatin = null;

    #[ORM\Column(length: 500, nullable: true)]
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
    private ?string $uskup = null;

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

    public function getNamaLatin(): ?string
    {
        return $this->namaLatin;
    }

    public function setNamaLatin(?string $namaLatin): self
    {
        $this->namaLatin = $namaLatin;

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

    public function getUskup(): ?string
    {
        return $this->uskup;
    }

    public function setUskup(?string $uskup): self
    {
        $this->uskup = $uskup;

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
