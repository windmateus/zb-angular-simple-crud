import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlataformasListaComponent } from './plataformas-lista.component';

describe('PlataformasListaComponent', () => {
  let component: PlataformasListaComponent;
  let fixture: ComponentFixture<PlataformasListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlataformasListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlataformasListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
