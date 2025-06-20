import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttractionService } from '../Service/attraction.service';
import { AttractionInterface } from '../Interface/attraction.interface';
import { Observable, of, catchError } from 'rxjs';

import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ModaleAvisComponent } from '../modale-avis/modale-avis.component';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    TranslateModule,
  ],
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
})
export class AccueilComponent {
  attractions$: Observable<AttractionInterface[]> | null = null;

  constructor(
    private attractionSrv: AttractionService,
    private routeur: Router,
    private popup: MatDialog,
    private i18n: TranslateService
  ) {
    this.initialiserAttractions();
    this.configurerLangue();
  }

  private initialiserAttractions() {
    this.attractions$ = this.attractionSrv.getAllAttraction().pipe(
      catchError((err) => {
        console.error('Erreur de récupération des attractions :', err);
        return of([]);
      })
    );
  }

  private configurerLangue() {
    this.i18n.setDefaultLang('fr');
    const langueStockee = localStorage.getItem('lang');
    if (langueStockee) {
      this.i18n.use(langueStockee);
    }
  }

  changerLangue(langue: string) {
    this.i18n.use(langue);
    localStorage.setItem('lang', langue);
  }

  ouvrirModaleAvis(nomAttraction: string, idAttraction: number) {
    const modale = this.popup.open(ModaleAvisComponent, {
      width: '500px',
      data: { attractionNom: nomAttraction, attractionId: idAttraction },
    });

    modale.afterClosed().subscribe((avis) => {
      if (avis) {
        console.log('Avis récupéré depuis la modale :', avis);
      }
    });
  }

  afficherAvis(idAttraction: number | null) {
    if (idAttraction) {
      this.routeur.navigate(['/voir-avis', idAttraction]);
    } else {
      console.warn("L'ID de l'attraction est invalide");
    }
  }
}
