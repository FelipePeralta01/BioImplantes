import { Injectable } from '@angular/core';
import { IRegistro } from './interface/IRegistro';

// Importamos  las librerías necesarias
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

// creamos Constantes que utilizaremos en el envio
const apiUrl = "http://localhost:3000/usuarios";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
// Injectable permite utilizar la misma instancia en varias páginas
// Se pasa como parámetro en el constructor (Injección) 
@Injectable({
    providedIn: 'root'
})
export class ClienteService {
 // Injectamos HttpClient, para poder consular una página
constructor(private http: HttpClient) { }

// Controla y enviará un mensaje a consola para todos los errores
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error("handleError Harrys", error); // log to console instead
    return of(result as T);
  };
}

// Método Agregar client, y devuelve un observable del tipo client
// Debe ser un Observable si deses suscribir este método en otro lado
addClient(client: IRegistro): Observable<IRegistro> {
  console.log("Res-api Enviando Addclient : ", client);
  // Ojo No lo ejecuta lo declara
  // El Pipe lo intercepta
  return this.http.post<IRegistro>(apiUrl, client, httpOptions)
    .pipe(  // Tubería
      // tap intersecta la respuesta si no hay error
      tap((client: IRegistro) => console.log('added product w/:', client)),
      // En caso de que ocurra Error
      catchError(this.handleError<IRegistro>('addClient'))
    );
}

// Obtenemos todos los clients
getClients(): Observable<IRegistro[]> {
  console.log("getClients ()");
  return this.http.get<IRegistro[]>(apiUrl)
    .pipe(
      tap(heroes => console.log('fetched clients')),
      catchError(this.handleError('getClients', []))
    );
}


//  Obtener un client
getClient(id: string): Observable<IRegistro> {
  //const url = '${apiUrl}/${id}';
  //return this.http.get<client>(url).pipe(
  console.log("getClient ID:" + id);
  return this.http.get<IRegistro>(apiUrl + "/" + id)
    .pipe(
      tap(_ => console.log('fetched client id=${id}')),
      catchError(this.handleError<IRegistro>('getClient id=${id}'))
    );
}

deleteClient(id: string): Observable<IRegistro> {
  //const url = '${apiUrl}/${id}';
  //return this.http.delete<client>(url, httpOptions).pipe(
  return this.http.delete<IRegistro>(apiUrl + "/" + id, httpOptions)
    .pipe(
      tap(_ => console.log('deleted client id=${id}')),
      catchError(this.handleError<IRegistro>('deleteClient'))
    );
}

updateClient(id: string, client: IRegistro): Observable<IRegistro> {
  return this.http.put<IRegistro>(apiUrl + "/" + id, client, httpOptions)
    .pipe(
      tap(_ => console.log('updated client id=${id}')),
      catchError(this.handleError<any>('updateClient'))
    );
}

}