import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvisService {

  private readonly baseUrl = 'http://localhost:5000/avis';

  constructor(private httpClient: HttpClient) {}

  /**
   * Envoie un nouvel avis pour une attraction spécifique
   * @param donneeAvis - Contenu de l'avis à enregistrer
   */
  envoyerAvis(donneeAvis: {
    attraction_id: number;
    texte: string;
    note: number;
    nom?: string;
    prenom?: string;
    anonyme: boolean;
  }): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, donneeAvis);
  }

  /**
   * Récupère tous les avis liés à une attraction
   * @param idAttraction - Identifiant unique de l'attraction
   */
  recupererAvisParAttraction(idAttraction: number): Observable<any[]> {
    if (!idAttraction || isNaN(idAttraction) || idAttraction < 1) {
      throw new Error('Identifiant d’attraction invalide');
    }

    return this.httpClient.get<any[]>(`${this.baseUrl}/${idAttraction}`);
  }
}
