import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarEstadoComponent } from './registrar-estado.component';

describe('RegistrarEstadoComponent', () => {
  let component: RegistrarEstadoComponent;
  let fixture: ComponentFixture<RegistrarEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarEstadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
