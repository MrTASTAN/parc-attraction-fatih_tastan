import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { AttractionService } from '../Service/attraction.service';
import { AttractionInterface } from '../Interface/attraction.interface';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  public formulaireAttractions: FormGroup[] = [];
  public attractions$: Observable<AttractionInterface[]>;

  constructor(
    private serviceAttraction: AttractionService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.attractions$ = this.serviceAttraction.getAllAttraction().pipe(
      tap((data: AttractionInterface[]) => {
        data.forEach((item) => {
          this.formulaireAttractions.push(
            this.formBuilder.group({
              attraction_id: [item.attraction_id],
              nom: [item.nom, Validators.required],
              description: [item.description, Validators.required],
              difficulte: [item.difficulte],
              visible: [item.visible]
            })
          );
        });
      })
    );
  }

  public enregistrer(attractionForm: FormGroup): void {
    const formData = attractionForm.getRawValue();
    this.serviceAttraction.postAttraction(formData).subscribe((res) => {
      attractionForm.patchValue({ attraction_id: res.result });
      this.snackBar.open(res.message, undefined, { duration: 1000 });
    });
  }

  public ajouterAttraction(): void {
    this.formulaireAttractions.push(
      this.formBuilder.group({
        attraction_id: [],
        nom: ['', Validators.required],
        description: ['', Validators.required],
        difficulte: [],
        visible: [true]
      })
    );
  }
}
