<?php

namespace SIP\Core\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;

#[AsController]
class DashboardController extends AbstractController
{
    #[Route(path: '/', name: 'homepage', methods: ['GET'])]
    public function indexAction()
    {
        return $this->render('homepage.html.twig');
    }
}
