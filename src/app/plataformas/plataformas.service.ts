import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, tap, delay } from 'rxjs/operators';
import { Plataforma } from './plataforma';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlataformasService {
  private readonly API = `${environment.API}plataformas`;

  constructor(private http: HttpClient) {
    this.list();
  }

  list() {
    return this.http.get<Plataforma[]>(this.API)
      .pipe(
        delay(1500),
        tap(console.log)
      );
  }

  /** take(1) faz o unsubscribe automaticamente */

  loadByID(id: number) {
    return this.http.get<Plataforma>(`${this.API}/${id}`).pipe(take(1));
  }

  private create(plataforma: any) {
    return this.http.post(this.API, plataforma).pipe(take(1));
  }

  private update(plataforma: any) {
    return this.http.put(`${this.API}/${plataforma.id}`, plataforma).pipe(take(1));
  }    

  save(plataforma: any) {
    if (plataforma.id) {
      return this.update(plataforma);
    }
    return this.create(plataforma);
  }

  delete(id: number) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }

}
