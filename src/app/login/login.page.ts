import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';



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
    private storage: Storage,
    private router: Router,) {
      this.modalForm = this.fb.group({
        'email': new FormControl("",[Validators.required, Validators.email])
      })
    this.formLogin = this.fb.group({
      'name': new FormControl("",Validators.compose([
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(4),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]+$')
      ])),
      'password': new FormControl("",Validators.compose([
        Validators.maxLength(8),
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*[a-z]{1,3})(?=.*[A-Z]{1})(?=.*[0-9]{4})[a-zA-Z0-9]+$')
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
      this.router.navigate(['/home']);
    }

    localStorage.setItem('name', f.name);
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
