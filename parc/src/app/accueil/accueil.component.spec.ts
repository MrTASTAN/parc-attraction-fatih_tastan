import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccueilComponent } from './accueil.component';

describe('ComposantAccueil', () => {
  let instance: AccueilComponent;
  let bancEssai: ComponentFixture<AccueilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccueilComponent],
    }).compileComponents();

    bancEssai = TestBed.createComponent(AccueilComponent);
    instance = bancEssai.componentInstance;
    bancEssai.detectChanges();
  });

  it('doit être instancié correctement', () => {
    expect(instance).toBeTruthy();
  });
});
