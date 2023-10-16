import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.servicio';
import { IRegistro } from '../interface/IRegistro';

import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
    selector: 'app-actualizar',
    templateUrl: './cliente.actualizar.page.html',
    //styleUrls: ['./cliente.actualizar.page.scss'],
})
export class ClienteActualizarPage implements OnInit{
   // FormGroup para validaciones
  clientForm!: FormGroup;
  // Esquema a utilizar en el Html
  cliente: IRegistro = { id: '', first_name: '', last_name: '', clave: '', email: '' };
  id: any = '';
  //cli_nombres: string = '';
  //prod_desc: string = '';
  //prod_price:number=null;
  //prod_cantidad:number=null

  // Injectamos librerías
  constructor(public restApi: ClienteService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    console.log("ngOnInit ID:" + this.route.snapshot.params['id']);
    // Relizamos lectura
    this.getClient(this.route.snapshot.params['id']);
    // Especificamos Validaciones por medio de FormGroup
    this.clientForm = this.formBuilder.group({
        'cli_nombres': [null, Validators.required],
        'cli_apellidos': [null, Validators.required],
        'cli_correo': [null, Validators.required],
        'cli_clave': [null, Validators.required]
    });
  }
  async onFormSubmit(form: NgForm) {
    console.log("onFormSubmit ID:" + this.id)
    this.cliente.id = this.id;
    //this.cliente.nombres = form.cli_nombres;
    //this.cliente.apellidos = form.cli_apellidos;
    //this.cliente.correo = form.cli_correo;
    //this.cliente.clave = form.cli_clave;
    
    // si envio form, envio los nombres del campo del formulario
    //await this.restApi.updateClient(this.id, form)
    await this.restApi.updateClient(this.id, this.cliente)
      .subscribe({
        next: (res) => {
          let id = res['id'];
          //this.router.navigate([ 'detail', { outlets: { details: id }} ]);
          this.router.navigate(['/cliente.leer/' + this.id]);
        }
        , complete: () => { }
        , error: (err) => { console.log(err); }
      })

  }

  // Método que permite leer el cliente
  async getClient(id: any) {
    // Crea Wait
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      // Muestra Wait
      await loading.present();
      // Obtiene el Observable
      await this.restApi.getClient(id + "")
        .subscribe({
          next: (data) => {
            console.log("getClientID data****");
            console.log(data);
            // Si funciona Rescata el los datos
            this.id = data.id;
            // Actualiza los datos
            this.clientForm.setValue({
              cli_nombres: [data.first_name],
              cli_apellidos: [data.last_name],
              cli_correo: [data.email],
              cli_clave: [data.clave]
            });
            loading.dismiss();
          }
          , complete: () => { }
          , error: (err) => {
            console.log("getClientID Errr****+");
            console.log(err);
            loading.dismiss();
          }
        })
    }
  

 // Método que actualiza el cliente por medio de submit
  async presentAlertConfirm(msg: string) {
    const alert = await this.alertController.create({
      header: 'Warning!',
      message: msg,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            //Si funciona el actualizar navega a listar
            this.router.navigate(['/cliente.listar/']);
          }
        }
      ]
    });
    await alert.present();
  }

}

