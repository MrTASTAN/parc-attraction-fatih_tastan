import { TestBed, ComponentFixture } from '@angular/core/testing';
import { VoirAvisComponent } from './voir-avis.component';

describe('Composant VoirAvis', () => {
  let vue: VoirAvisComponent;
  let testFixture: ComponentFixture<VoirAvisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoirAvisComponent]
    }).compileComponents();

    testFixture = TestBed.createComponent(VoirAvisComponent);
    vue = testFixture.componentInstance;
    testFixture.detectChanges();
  });

  it('devrait être instancié correctement', () => {
    expect(vue).toBeTruthy();
  });
});
