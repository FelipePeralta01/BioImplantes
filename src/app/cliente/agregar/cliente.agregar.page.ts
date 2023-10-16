import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../cliente.servicio';
import { IRegistro } from '../interface/IRegistro';

@Component({
  selector: 'app-agregar',
  templateUrl: './cliente.agregar.page.html',
  //styleUrls: ['./cliente.agregar.page.scss'],
})
export class ClienteAgregarPage {
  // Estructura registro, agrupa varios campos
  // Debieramos utilizar una interface
  clientForm!: FormGroup;
  // Generalmente se usa una interface, sin embargo para jugar utilizaremos  una clase
  cliente: IRegistro = {
    id: ''
    , first_name: ''
    , last_name: ''
    , email: ''
    , clave: ''
  };

  // Injectamos FormBuilder, el cual nos permitirá realizar validaciones                         
  constructor(private formBuilder: FormBuilder,
    // Injectamos las librerías necesarias
    private loadingController: LoadingController,
    private restApi: ClienteService,
    private router: Router,
  ) { }

  // Antes que inicie en pantalla
  // especificamos las validaciones, 
  //    por medio de formBuilder injectado en el constructor
  ngOnInit() {
    // Especificamos que todos los campos son obligatorios
    this.clientForm = this.formBuilder.group({
      "cli_nombres": [null, Validators.required],
      'cli_apellidos': [null, Validators.required],
      'cli_correo': [null, Validators.required],
      'cli_clave': [null, Validators.required]
    });
  }
  // se ejecutará cuando presione el Submit
  async onFormSubmit(form: NgForm) {
    console.log("onFormSubmit del client ADD")

    // Creamos un Loading Controller, Ojo no lo muestra
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    // Muestra el Loading Controller
    await loading.present();

    // Ejecuta el método del servicio y los suscribe
    await this.restApi.addClient(this.cliente)
      .subscribe({
        next: (res) => {
          console.log("Next addClient Page",res)
          loading.dismiss(); //Elimina la espera
          if (res== null){ // No viene respuesta del registro
            console.log("Next No Agrego, Ress Null ");
            return
          }
          // Si viene respuesta
          console.log("Next Agrego SIIIIII Router saltaré ;",this.router);
          this.router.navigate(['/cliente.listar']);
        }
        , complete: () => { }
        , error: (err) => {
          console.log("Error addClient Página",err);
          loading.dismiss(); //Elimina la espera
        }
      });
    console.log("Observe que todo lo del suscribe sale después de este mensaje")
  }


}
