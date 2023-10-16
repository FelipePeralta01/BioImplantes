import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.servicio';
import { IRegistro } from '../interface/IRegistro';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-eliminar',
  templateUrl: './cliente.eliminar.page.html',
  //styleUrls: ['./eliminar.page.scss'],
})
export class ClienteEliminarPage implements OnInit {

  // Creamos registro a utilizar en el Html
  cliente: IRegistro = {id: '', first_name: '', last_name: '', email: '', clave: ''
  };

  // Injectamos Librerías a utilizar
  constructor(
    public restApi: ClienteService
    , public loadingController: LoadingController
    , public alertController: AlertController
    , public route: ActivatedRoute
    , public router: Router
  ) { }

  // En el OnInit, ejecutamos la lectura
  ngOnInit() {
    this.getClient();
  }

// Método que permite leer el cliente
  async getClient() {
    console.log("getClient **************** ParamMap ID:" + this.route.snapshot.paramMap.get('id'));
    // Creamos un Wait
    const loading = await this.loadingController.create({ message: 'Loading...' });
    // Mostramos el Wait
    await loading.present();
    await this.restApi.getClient(this.route.snapshot.paramMap.get('id')!)
      .subscribe({
        next: (res) => {
          console.log("Data *****************");
          console.log(res);
          // Si funciona la respuesta la pasamos al cliente
          this.cliente = res;
          loading.dismiss();
        }
        , complete: () => { }
        , error: (err) => {
          //Si no funcion desplegamos en consola el error
          console.log("Error cliente.eliminar Página", err);
          loading.dismiss(); //Elimina la espera
        }
      })
  }

  // El Html invoca el método delete
  async delete(id: string) {
    // Confirma Primero
    this.presentAlertConfirm(id, 'Confirme la Eliminación, De lo cantrario Cancele');
  }
  // Creamos una rutina para confirmar la eliminación
  async presentAlertConfirm(id: string, msg: string) {
    const alert = await this.alertController.create({
      header: 'Warning!', // Título
      message: msg,   // Mensaje
      buttons: [   // Botones
        {
          text: 'Eliminar : ' + id + " OK",
          handler: () => { // Si presiona ejecuta esto
            //this.router.navigate(['']);
            this.deleteConfirmado(id)
          }
        }
      ]
    });
    // Presenta en pantalla
    await alert.present();
  }

  // Es invocado desde el Alert
  async deleteConfirmado(id: string) {
    alert("Eliminando " + id)
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    await this.restApi.deleteClient(id)
      .subscribe({
        next: (res) => {
          console.log("Error deleteClient Página", res);
          loading.dismiss();
          this.router.navigate(['/client-listar/']);
        },
        complete: () => { },
        error: (err) => {
          console.log("Error deleteClient Página", err);
          loading.dismiss(); //Elimina la espera
        }
      })
  }
}
