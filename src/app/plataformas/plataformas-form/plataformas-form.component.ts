import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { PlataformasService } from '../plataformas.service';
import { Plataforma } from '../plataforma';
import { map, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-plataformas-form',
  templateUrl: './plataformas-form.component.html',
  styleUrls: ['./plataformas-form.component.scss']
})
export class PlataformasFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  mensagem!: string;
  classe: string = 'col-sm-12';

  subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private service: PlataformasService,
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  updateForm(plataforma: Plataforma) {
    this.form.patchValue({
      id: plataforma.id,
      nome: plataforma.nome
    });
  }

  initForm(plataforma: any) {
    this.form = this.fb.group({
      id: [plataforma.id],
      nome: [
        plataforma.nome,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
    });
  }

  ngOnInit(): void {
    let novaPlataforma = {id: null, nome: null};
    this.initForm(novaPlataforma);

    if (this.route.params) {
      this.route.params.
      pipe(
        map((params: any) => params['id']),
        switchMap(
          (id) => {
            if (id) {
              return this.service.loadByID(id);
            } else {
              return [];
            }
          }
        )
      )
      .subscribe(plataforma => this.initForm(plataforma));
    }

  }

  salvar() {
    if (this.form.valid) {
      let msgSuccesso: string = 'Plataforma criada com sucesso!';
      let msgErro: string = 'Erro ao criar plataforma';
      if (this.form.value.id) {
        msgSuccesso = 'Plataforma atualizada com sucesso!';
        msgErro = 'Erro ao atualizar plataforma';
      }
      this.subscription = this.service.save(this.form.value).subscribe( {
        next: () => {
          this.mensagem = msgSuccesso;
          this.classe += ' alert alert-success';
        },
        error: () => {
          this.mensagem = msgErro;
          this.classe += ' alert alert-danger';
        },
        complete: () => setTimeout(() => {
          this.location.back();
        }, 1500)
      }
      );
    }
  }

  cancelar() {
    this.form.reset();
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

}
