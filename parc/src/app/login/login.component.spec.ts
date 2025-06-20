import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';

describe('Composant LoginComponent', () => {
  let loginCmp: LoginComponent;
  let testFixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent]
    }).compileComponents();

    testFixture = TestBed.createComponent(LoginComponent);
    loginCmp = testFixture.componentInstance;
    testFixture.detectChanges();
  });

  it('doit instancier le composant correctement', () => {
    expect(loginCmp).toBeTruthy();
  });
});
