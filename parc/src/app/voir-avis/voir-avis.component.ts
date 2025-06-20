import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { AvisService } from '../service/avis.service';

@Component({
  selector: 'app-voir-avis',
  standalone: true,
  templateUrl: './voir-avis.component.html',
  styleUrls: ['./voir-avis.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule
  ]
})
export class VoirAvisComponent implements OnInit {
  avis: any[] = [];
  idAttraction: number = 0;

  constructor(
    private routeActive: ActivatedRoute,
    private serviceAvis: AvisService
  ) {}

  ngOnInit(): void {
    const idParam = this.routeActive.snapshot.paramMap.get('id');
    this.idAttraction = Number(idParam);

    if (!this.idAttraction || isNaN(this.idAttraction)) {
      console.warn('Identifiant d’attraction invalide.');
      return;
    }

    this.serviceAvis.getAvis(this.idAttraction).subscribe({
      next: (avisRecus) => {
        console.debug('Avis récupérés avec succès :', avisRecus);
        this.avis = avisRecus;
      },
      error: (err) => {
        console.error('Erreur de chargement des avis :', err);
      }
    });
  }
}
