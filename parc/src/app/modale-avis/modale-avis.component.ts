import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { AvisService } from '../Service/avis.service';

@Component({
  selector: 'app-modale-avis',
  standalone: true,
  templateUrl: './modale-avis.component.html',
  styleUrls: ['./modale-avis.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule
  ]
})
export class ModaleAvisComponent {
  avisFormulaire: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<ModaleAvisComponent>,
    @Inject(MAT_DIALOG_DATA) public info: { attractionNom: string, attractionId: number },
    private serviceAvis: AvisService
  ) {
    this.avisFormulaire = this.formBuilder.group({
      texte: ['', [Validators.required, Validators.minLength(10)]],
      note: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      anonyme: [false],
      nom: [''],
      prenom: ['']
    });
  }

  envoyerAvis() {
    const nouveauAvis = {
      attraction_id: this.info.attractionId,
      ...this.avisFormulaire.value
    };

    this.serviceAvis.ajouterAvis(nouveauAvis).subscribe((res) => {
      console.info('Avis soumis avec succès :', res);
      this.dialog.close(nouveauAvis);
    });
  }
}
