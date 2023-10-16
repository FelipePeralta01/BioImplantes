import { Component, OnInit} from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

// Importamos ClienteService y IRegistro
import { ClienteService } from '../cliente.servicio';
import { IRegistro } from '../interface/IRegistro';

@Component({
  selector: 'app-listar',
  templateUrl: './cliente.listar.page.html',
  //styleUrls: ['./cliente.page.scss'],
})
export class ListarClientePage implements OnInit {
  // Creamos la Variable para el Html
  clientes: IRegistro[] = [];
  // Injectamos Librerias
  constructor(public restApi: ClienteService
    , public loadingController: LoadingController
    , public router: Router) { }

  // LLamamos al método que rescata los cliente  
  ngOnInit() {
    this.getClients();
  }

  // Método  que rescta los cliente
  async getClients() {
    console.log("Entrando :getClients");
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
  // Si funciona asigno el resultado al arreglo cliente
          this.clientes = res;
          console.log("thisClientes:",this.clientes);
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
  //   moveItemInArray(this.cliente, event.previousIndex, event.currentIndex);
  // }

}
