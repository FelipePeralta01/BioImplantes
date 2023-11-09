import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  username: string = '';
  password: string = '';

  @ViewChild(IonModal) modal: IonModal;

  modalForm : FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController, private storage: Storage, private router: Router, private navCtrl: NavController, private authService: AuthService) {
      this.modalForm = this.fb.group({
        'email': new FormControl("",[Validators.required, Validators.email])
      })
   }

   async login() {
    if (this.username && this.password) {
      const loggedIn: boolean = await this.authService.login(this.username, this.password);
      if (loggedIn) {
        this.navCtrl.navigateRoot('/home');
      } else {
        console.log('Credenciales incorrectas');
      }
    } else {
      console.log('Por favor, ingrese nombre de usuario y contraseña.');
    }
  }
  

  async register() {
    const registered = await this.authService.register(this.username, this.password);
    if (registered) {
      console.log('Usuario registrado correctamente',this.username);
    } else {
      console.log('Error al registrar el usuario');
    }
  }

  email: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async confirm() {
    var f = this.modalForm.value;
    if(this.modalForm.invalid){
      const alert = await this.alertController.create({
        header: 'ERROR',
        message: 'Tienes que ingresar un email valido',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }
    this.modal.dismiss(this.email, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
    }
  }
}
