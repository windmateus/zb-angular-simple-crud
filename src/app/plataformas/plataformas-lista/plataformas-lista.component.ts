import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, Subject } from 'rxjs';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { catchError } from 'rxjs/operators';
import { Plataforma } from '../plataforma';
import { PlataformasService } from '../plataformas.service';

@Component({
  selector: 'app-plataformas-lista',
  templateUrl: './plataformas-lista.component.html',
  styleUrls: ['./plataformas-lista.component.scss'],
})
export class PlataformasListaComponent implements OnInit {
  plataformas$!: Observable<Plataforma[]>;
  plataformaSelecionada!: Plataforma;

  erro$ = new Subject<boolean>();
  mensagemErro!: string;
  sucessoExclusao = false;

  deleteModalRef!: BsModalRef;
  @ViewChild('deleteModal', { static: true }) deleteModal: any;

  constructor(
    private service: PlataformasService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {
    console.log('construtor');
  }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.plataformas$ = this.service.list()
    .pipe(
      catchError(erro => {
        console.error(erro);
        this.mensagemErro = 'Erro ao carregar plataformas';
        this.erro$.next(true);
        return EMPTY;
      })
    );

  }

  alterar(id: number): void {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  excluir(p: Plataforma) {
    console.log('excluir', p);
    this.plataformaSelecionada = p;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'})
  }

  confirmaExcluir() {
    // não precisa fazer o unsubscribe desse método pois já temos o take(1) lá no método do serviço que vai finalizar
    // o método pra gente assim que for pro servidor e voltar com o resultado
    this.service.delete(this.plataformaSelecionada.id)
    .subscribe({
      next: () => {
        this.listar();
      },
      error: () => {
        this.mensagemErro = 'Erro ao excluir plataforma. Tente novamente mais tarde';
        this.erro$.next(true);
      },
      complete: () => {
        this.deleteModalRef.hide();
        this.sucessoExclusao = true;
      }
    }
    );
  }

  desisteExcluir() {
    this.deleteModalRef.hide();
  }

}
