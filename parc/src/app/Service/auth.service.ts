import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { UserInterface } from '../Interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private httpClient = inject(HttpClient);

  public utilisateur: UserInterface | null = null;
  public estConnecte: boolean = false;

  public urlRedirection: string | null = null;

  /**
   * Tente de se connecter avec les identifiants fournis
   * @param identifiants - Objet contenant le nom et le mot de passe
   */
  seConnecter(identifiants: object): Observable<boolean> {
    return this.httpClient.post<UserInterface>('http://127.0.0.1:5000/login', identifiants).pipe(
      map(reponse => {
        this.estConnecte = !!reponse.token;
        this.utilisateur = reponse || null;
        localStorage.setItem('user', JSON.stringify(reponse));
        return this.estConnecte;
      })
    );
  }

  /**
   * Déconnecte l'utilisateur et efface les données locales
   */
  seDeconnecter(): void {
    this.estConnecte = false;
    this.utilisateur = null;
    localStorage.setItem('user', '');
  }

  /**
   * Recharge l'utilisateur à partir du localStorage
   */
  initialiserUtilisateur(): void {
    const donnees = localStorage.getItem('user');
    if (donnees) {
      const utilisateurCharge = JSON.parse(donnees) as UserInterface;
      this.estConnecte = !!utilisateurCharge.token;
      this.utilisateur = utilisateurCharge;
    } else {
      this.estConnecte = false;
      this.utilisateur = null;
    }
  }
}
