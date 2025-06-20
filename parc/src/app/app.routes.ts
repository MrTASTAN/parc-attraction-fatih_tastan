import { Routes, Router } from '@angular/router';
import { inject } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AccueilComponent } from './accueil/accueil.component';
import { VoirAvisComponent } from './voir-avis/voir-avis.component';
import { AuthService } from './Service/auth.service';

/**
 * Vérifie si l'utilisateur est authentifié avant d'accéder à certaines routes.
 * Redirige vers la page de connexion si l'accès est refusé.
 */
const authentificationRequise = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn ? true : router.parseUrl('/login');
};

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authentificationRequise]
  },
  {
    path: 'accueil',
    component: AccueilComponent
  },
  {
    path: '',
    redirectTo: '/accueil',
    pathMatch: 'full'
  },
  {
    path: 'voir-avis/:id',
    component: VoirAvisComponent
  }
];
