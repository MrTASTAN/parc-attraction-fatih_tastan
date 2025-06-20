import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private httpClient = inject(HttpClient);

  // Création du formulaire avec validation de base
  loginForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private auth: AuthService,
    private navigation: Router
  ) {}

  // Méthode appelée à la soumission du formulaire
  handleLogin(): void {
    const credentials = this.loginForm.getRawValue();

    this.auth.login(credentials).subscribe(() => {
      if (this.auth.isLoggedIn) {
        this.navigation.navigate(['/admin']);
      }
    });
  }
}
