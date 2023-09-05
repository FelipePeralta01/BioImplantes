import { Component, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Animation, AnimationController, IonCard } from '@ionic/angular';
import { ElementRef } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonCard, { read: ElementRef }) card: ElementRef<HTMLIonCardElement>;

  user = localStorage.getItem('name')

  private animation: Animation;

  constructor(public navCtrl: NavController,
    private animationCtrl: AnimationController) 
  {}

  logout(){
    this.navCtrl.navigateRoot('login');
  }

  ngOnInit(){
  }

  ngAfterViewInit() {
    this.animation = this.animationCtrl
      .create()
      .addElement(this.card.nativeElement)
      .duration(1500)
      .iterations(Infinity)
      .direction('alternate')
      .fromTo('background', 'blue', 'var(--background)');
  }

  play() {
    this.animation.play();
  }

  pause() {
    this.animation.pause();
  }

  stop() {
    this.animation.stop();
  }

  detailsOpt() {
    this.navCtrl.navigateRoot('detalle-pedido')
  }
  home() {
    this.navCtrl.navigateRoot('home')
  }
}
