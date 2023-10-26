import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { PlataformasRoutingModule } from './plataformas-routing.module';
import { PlataformasListaComponent } from './plataformas-lista/plataformas-lista.component';
import { PlataformasFormComponent } from './plataformas-form/plataformas-form.component';

@NgModule({
  declarations: [PlataformasListaComponent, PlataformasFormComponent],
  imports: [CommonModule, PlataformasRoutingModule, ReactiveFormsModule],
})
export class PlataformasModule {}
