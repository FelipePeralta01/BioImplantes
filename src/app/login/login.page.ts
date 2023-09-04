import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  formLogin: FormGroup;
  modalForm : FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController) {
      this.modalForm = this.fb.group({
        'email': new FormControl("",[Validators.required, Validators.email])
      })
    this.formLogin = this.fb.group({
      'name': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.compose([
        Validators.maxLength(8),
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ]))
    })
   }

  ngOnInit() {
  }

  async login(){
    var f = this.formLogin.value;
    if(this.formLogin.invalid){
      const alert = await this.alertController.create({
        header: 'ERROR',
        message: 'Tienes que ingresar los datos',
        buttons: ['Aceptar']
      });
      await alert.present();
        return;
    }
    if(this.formLogin.valid){
      this.navCtrl.navigateRoot('home');
    }

    var username = {
      name: f.name,
    }
    var userPassword = {
      password: f.password
    }

    localStorage.setItem('user', f.name);
    localStorage.setItem('password', f.password);
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
