import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarCategoriasComponent } from './registrar-categorias.component';

describe('RegistrarCategoriasComponent', () => {
  let component: RegistrarCategoriasComponent;
  let fixture: ComponentFixture<RegistrarCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarCategoriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
