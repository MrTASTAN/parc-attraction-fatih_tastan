import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonneesService {

  constructor(private httpClient: HttpClient) {}

  /**
   * Effectue une requête GET vers l'URL donnée
   * @param url - Adresse du service distant
   */
  recuperer<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url);
  }

  /**
   * Envoie des données via POST à l'URL donnée
   * @param url - Adresse cible
   * @param corps - Données à envoyer
   */
  envoyer<T>(url: string, corps: any): Observable<T> {
    return this.httpClient.post<T>(url, corps);
  }

  /**
   * Supprime une ressource via DELETE
   * @param url - URL de la ressource à supprimer
   */
  supprimer<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(url);
  }
}
