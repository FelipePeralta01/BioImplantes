import { Injectable } from '@angular/core';
import { ClProducto } from './model/ClProducto';

// Importamos  las librerías necesarias
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

// creamos Constantes que utilizaremos en el envio
const apiUrl = "https://sumativa2.onrender.com/api/productos/";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
// Injectamos HttpClient, para poder consular una página
constructor(private http: HttpClient) { }

// Controla y enviará un mensaje a consola para todos los errores
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(`${operation} failed: ${error.message}`);
    if (error instanceof HttpErrorResponse && error.status === 400) {
      console.log('Response body:', error.error);
    }
    return of(result as T);
  };
}



// Método Agregar producto, y devuelve un observable del tipo Producto
// Debe ser un Observable si deses suscribir este método en otro lado
addProduct(producto: ClProducto): Observable<ClProducto> {
  console.log("Res-api Enviando AddProducto : ", producto);
  // Ojo No lo ejecuta lo declara
  // El Pipe lo intercepta
  return this.http.post<ClProducto>(apiUrl, producto, httpOptions)
    .pipe(  // Tubería
      // tap intersecta la respuesta si no hay error
      tap((producto: ClProducto) => console.log('added product w/:', producto)),
      // En caso de que ocurra Error
      catchError(this.handleError<ClProducto>('addProduct'))
    );
}

// Obtenemos todos los Productos
getProducts(): Observable<ClProducto[]> {
  console.log("getProducts ()");
  return this.http.get<ClProducto[]>(apiUrl)
    .pipe(
      tap(heroes => console.log('fetched products')),
      catchError(this.handleError('getProducts', []))
    );
}


//  Obtener un Producto
getProduct(idProducto: String): Observable<ClProducto> {
  //const url = '${apiUrl}/${id}';
  //return this.http.get<Producto>(url).pipe(
  console.log("getProduct ID:" + idProducto);
  return this.http.get<ClProducto>(apiUrl + idProducto)
    .pipe(
      tap(_ => console.log('fetched product id=${id}')),
      catchError(this.handleError<ClProducto>('getProduct id=${id}'))
    );
}

deleteProduct(idProducto: string): Observable<ClProducto> {
  //const url = '${apiUrl}/${id}';
  //return this.http.delete<Producto>(url, httpOptions).pipe(
  return this.http.delete<ClProducto>(apiUrl + idProducto, httpOptions)
    .pipe(
      tap(_ => console.log('deleted product id=${id}')),
      catchError(this.handleError<ClProducto>('deleteProduct'))
    );
}

updateProduct(idProducto: string, producto: ClProducto): Observable<ClProducto> {
  return this.http.put<ClProducto>(apiUrl + idProducto, producto, httpOptions)
    .pipe(
      tap(_ => console.log('updated product id=${id}')),
      catchError(this.handleError<any>('updateProduct'))
    );
}
}
