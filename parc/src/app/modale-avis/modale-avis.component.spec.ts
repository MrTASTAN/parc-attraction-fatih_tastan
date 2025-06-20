import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModaleAvisComponent } from './modale-avis.component';

describe('ModaleAvisComponent', () => {
  let fixture: ComponentFixture<ModaleAvisComponent>;
  let component: ModaleAvisComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModaleAvisComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ModaleAvisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait créer correctement le composant', () => {
    expect(component).toBeDefined();
  });
});
