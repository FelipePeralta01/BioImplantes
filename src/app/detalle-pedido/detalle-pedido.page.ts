import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.page.html',
  styleUrls: ['./detalle-pedido.page.scss'],
})
export class DetallePedidoPage implements OnInit {

  constructor( public navCtrl: NavController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  home() {
    this.navCtrl.navigateRoot('home')
  }

  logout(){
    this.navCtrl.navigateRoot('login');
  }

  public alertButtons = [
    {
      text: 'No',
    },
    {
      text: 'Si',
      handler: () => {
        this.toHome()
      }
    },
    
  ];

  toHome() {
    this.navCtrl.navigateRoot('home')
  }
}

