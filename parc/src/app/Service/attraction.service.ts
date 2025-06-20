import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { AttractionInterface } from '../Interface/attraction.interface';
import { MessageInterface } from '../Interface/message.interface';

@Injectable({
  providedIn: 'root',
})
export class AttractionService {

  private readonly baseUrl = 'http://127.0.0.1:5000/attraction';

  constructor(private apiService: DataService) {}

  /**
   * Récupère toutes les attractions
   */
  fetchAttractions(): Observable<AttractionInterface[]> {
    return this.apiService.getData(this.baseUrl) as Observable<AttractionInterface[]>;
  }

  /**
   * Envoie une attraction au backend pour ajout ou mise à jour
   * @param attraction - Les données de l'attraction
   */
  enregistrerAttraction(attraction: AttractionInterface): Observable<MessageInterface> {
    return this.apiService.postData(this.baseUrl, attraction) as Observable<MessageInterface>;
  }
}
