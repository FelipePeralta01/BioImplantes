import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.servicio';
import { IRegistro } from '../interface/IRegistro';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
    selector: 'app-leer',
    templateUrl: './cliente.leer.page.html',
    //styleUrls: ['./cliente.leer.page.scss'],
})
export class ClienteLeerPage implements OnInit{
    clientForm!: FormGroup;
    msgError = ""
    cliente: IRegistro = {id: '', first_name: '', last_name: '', email: '', clave: ''
    };

    constructor(
        private formBuilder: FormBuilder,
        public restApi: ClienteService, 
        public loadingController: LoadingController, 
        public alertController: AlertController,
        public route: ActivatedRoute, 
        public router: Router) { 
    }

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
          console.log("Error leer.producto Página", err);
          loading.dismiss(); //Elimina la espera
        }
      })
  }
}
