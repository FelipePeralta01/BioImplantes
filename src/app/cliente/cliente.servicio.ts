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
    // providedIn: 'root', No Es necesario incluirlos en las librerías
    providedIn: 'root'
})
export class ClienteService {
    // Creamos un Arreglo del tipo IRegistro
    private registros: IRegistro[] =
        [{ id: "122", nombres: "Juan Gabriel", apellidos: "Picapiedras", correo: "picapiedrax@harrys.cl", clave: "1134" }
            , { id: "128", nombres: "Tito Gabril", apellidos: "Picapiedras", clave: "1134" }
            , { id: "129", nombres: "Ana Maria", apellidos: "Picapiedras"}
            , { id: "1234", nombres: "Tortuelo Jaime", apellidos: "Picapiedras" }
            , { id: "1223242", nombres: "El Gato", apellidos: "Picapiedras",  }
            , { id: "122324", nombres: "El Cocodrilo", apellidos: "Picapiedras" }
            , { id: "12232", nombres: "Mario Jose", apellidos: "Picapiedras" }]

    constructor( private http: HttpClient) {
        // Revisar CUANDO y CUANTAS veces se inicia el servicio 
        console.log("Inicio Servicio****************}")
    }
    // Método que retorna la dirección del arreglo
    getRegistroMetodo(): IRegistro[] {
        return this.registros
    }
    // Nadien toca la variable, a no ser que sea por métodos 
    // que se crearán más adelante
    // por lo cual retorno una copia
    get getRegistros(): IRegistro[] {
        return [...this.registros]
    }

    // Accesador que retorna el contenido(Copia)
    get getRegistrosCopia(): IRegistro[] {
        // 3 punto retorna una copia
        return [...this.registros]
    }
    // Accesador que retorna la dirección del arreglo
    get getRegistrosReferencia(): IRegistro[] {
        return this.registros
    }

   // agregarServicio(reg:IRegistro){
   //     this.registros.push(reg)    
   //     console.log("Registro Agregars:",this.registros)
   // }
    actualizarServicio(id:string,reg:IRegistro){
        console.log("buscando")
        // Buscamos el Objeto por medio del id
        // Recuerde que found apunta al objeto
        let found = this.registros.find((element) => element.id == id);
        // Si existe realizo los cambios
        if (found){
            // Found contiene la dirección 
            found!.apellidos=reg.apellidos
            found!.nombres=reg.nombres
            found!.clave=reg.clave
            found!.correo=reg.correo
            console.log("found",found)
            console.log("Registro Actualizar:",this.registros)
        }
    }
     eliminarServicio(id:string){
        console.log("Registro Eliminar:",this.registros)
        // Observe que parte del final
        // Pregunte al Profesor( El Magnifico :)  )
        // Pista los registros cuando se elimina uno los demás se corren un espacio
        for (let i = this.registros.length-1; i >= 0; i--) {
            console.log("busco",i,id,this.registros[i].id)
            if (this.registros[i].id === id) {
                let spliced = this.registros.splice(i, 1);
                console.log(" Eliminado: " , this.registros,[i]);
                // Si solo existe una vez, debiera realizar un return
            }
        }
        console.log("Registro Eliminar:",this.registros)
     }

     // Recibimos el ID a buscar
     // Devuelve una estructura del tipo IRegistro
     leerServicio(id:string):IRegistro{
        for (let i = 0; i < this.registros.length; i++) {
            if (this.registros[i].id === id) {
                // Si lo encuentro realizo un return
                // devulevo la direccion, no el contenido
                return this.registros[i]
            }
        }        

        // En caso  de que no exista, devuelve una estructura vacia
        return {id:"",nombres:"",apellidos:"",correo:"",clave:""}
     }

     private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          console.error("handleError Harrys", error); // log to console instead
          return of(result as T);
        };
      }

     addClient(producto: IRegistro): Observable<IRegistro> {
        console.log("Res-api Enviando AddCliente : ", producto);
        // Ojo No lo ejecuta lo declara
        // El Pipe lo intercepta
        return this.http.post<IRegistro>(apiUrl, producto, httpOptions)
          .pipe(  // Tubería
            // tap intersecta la respuesta si no hay error
            tap((producto: IRegistro) => console.log('added client w/:', producto)),
            // En caso de que ocurra Error
            catchError(this.handleError<IRegistro>('addClient'))
          );
      }

      getClients(): Observable<IRegistro[]> {
        console.log("getProducts ()");
        return this.http.get<IRegistro[]>(apiUrl)
          .pipe(
            tap(heroes => console.log('fetched clients')),
            catchError(this.handleError('getClients', []))
          );
      }

      deleteClient(id: string): Observable<IRegistro> {
        //const url = '${apiUrl}/${id}';
        //return this.http.delete<Producto>(url, httpOptions).pipe(
        return this.http.delete<IRegistro>(apiUrl + "/" + id, httpOptions)
          .pipe(
            tap(_ => console.log('deleted client id=${id}')),
            catchError(this.handleError<IRegistro>('deleteClient'))
          );
      }

      updateClient(id: string, producto: IRegistro): Observable<IRegistro> {
        return this.http.put<IRegistro>(apiUrl + "/" + id, producto, httpOptions)
          .pipe(
            tap(_ => console.log('updated client id=${id}')),
            catchError(this.handleError<any>('updateClient'))
          );
      }
}