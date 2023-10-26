import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlataformasFormComponent } from './plataformas-form.component';

describe('PlataformasFormComponent', () => {
  let component: PlataformasFormComponent;
  let fixture: ComponentFixture<PlataformasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlataformasFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlataformasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
