import { Injectable } from '@angular/core';
import { enviroment } from '../../environment/enviroment';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { ICliente } from '../models/cliente.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private apiUrl = enviroment.apiUrlDatabase;
  private clientesSubject = new BehaviorSubject<ICliente[]>([]);
  clientes$ = this.clientesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadClientes();
  }

  loadClientes() {
    let urlGet = `${this.apiUrl}clientes.json`;
    return this.http.get<{ [name: string]: ICliente }>(urlGet).pipe(
      map(res => {
        return Object.keys(res).map(name => ({ id: name, ...res[name] }));
      }),
      tap(clientes => this.clientesSubject.next(clientes))
    ).subscribe()
  }

  addCliente(cliente: ICliente){
    let urlPost = `${this.apiUrl}clientes.json`;
    return this.http.post<{cliente:ICliente}>(urlPost, cliente).pipe(
      tap(res => {
        this.clientesSubject.next([...this.clientesSubject.value, cliente]);
      })
    );
  }

  editCliente(idCliente: string, cliente: ICliente){
    let urlEdit = `${this.apiUrl}clientes/${idCliente}.json`;
    return this.http.put(urlEdit, cliente).pipe(
      tap(()=>{
        const actualizado = this.clientesSubject.value.map(
          c => c.id === idCliente ? {...c, ...cliente} : c
        );
        this.clientesSubject.next(actualizado);
      })
    );
  }

  deleteCliente(id: string){
    let urlDelete = `${this.apiUrl}clientes/${id}.json`;
    return this.http.delete(urlDelete).pipe(
      tap(()=>{
        const arrayActualizado = this.clientesSubject.value.filter(cliente => cliente.id !== id);
        this.clientesSubject.next(arrayActualizado);
      })
    );
  }

  // deleteCliente(id: string) {
  //   return this.http.delete(`${this.apiUrl}clientes/${id}.json`).pipe(
  //     tap(() => {
  //       const filtered = this.clientesSubject.value.filter(c => c.id !== id);
  //       this.clientesSubject.next(filtered);
  //     })
  //   );
  // }
}

