import { Component} from '@angular/core';

// Importamos ClienteService y IRegistro
import { ClienteService } from '../cliente.servicio';
import { IRegistro } from '../interface/IRegistro';

// Importamos Librerías
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
//import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-listar',
  templateUrl: './cliente.listar.page.html',
  //styleUrls: ['./cliente.page.scss'],
})
export class ListarClientePage {
 
  // Creamos la Variable para el Html
  clientes: IRegistro[] = [];
  // Injectamos Librerias
  constructor(public restApi: ClienteService
    , public loadingController: LoadingController
    , public router: Router) { }

  // LLamamos al método que rescata los productos  
  ngOnInit() {
    this.getClients();
  }

  // Método  que rescta los productos
  async getClients() {
    console.log("Entrando :getProducts");
    // Crea un Wait (Esperar)
    const loading = await this.loadingController.create({
      message: 'Harrys Loading...'
    });
    // Muestra el Wait
    await loading.present();
    console.log("Entrando :");
    // Obtiene el Observable del servicio
    await this.restApi.getClients()
      .subscribe({
        next: (res) => { 
          console.log("Res:" + res);
  // Si funciona asigno el resultado al arreglo productos
          this.clientes = res;
          console.log("thisProductos:",this.clientes);
          loading.dismiss();
        }
        , complete: () => { }
        , error: (err) => {
  // Si da error, imprimo en consola.
          console.log("Err:" + err);
          loading.dismiss();
        }
      })
  }


  
  // drop(event: CdkDragDrop<string[]>) {
  //   console.log("Moviendo Item Array Drop ***************:");
  //   moveItemInArray(this.productos, event.previousIndex, event.currentIndex);
  // }
}
