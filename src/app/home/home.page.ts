import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { Animation, AnimationController, IonCard } from '@ionic/angular';
import { ElementRef } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
  @ViewChild(IonCard, { read: ElementRef },) card: ElementRef<HTMLIonCardElement>;

  user = localStorage.getItem('name')
  private animation: Animation;

  constructor(
    private router: Router,
    private animationCtrl: AnimationController) 
  {}

  imageSource: any;
  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source:CameraSource.Prompt,
      saveToGallery: false
  });
  this.imageSource=image.dataUrl;
  localStorage.setItem('picture', this.imageSource)
};

  getPhoto(){
    return this.imageSource;
  }

  logout(){
    this.router.navigate(['/login']);
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
    this.router.navigate(['/detalle-pedido'])
  }

  home() {
    this.router.navigate(['/home'])
  }

  // Se obtienen las coordenadas a insertar en el mapa
  async getCurrentPosition() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log('Current', coordinates);
  
      // Luego, llamar a la función para crear el mapa pasando las coordenadas
      this.createMap(coordinates.coords.latitude, coordinates.coords.longitude);
    } catch (error) {
      console.error('Error getting current position', error);
    }
  }

  @ViewChild('map')mapRef: ElementRef;
  map: GoogleMap;

  ionViewDidEnter() {
    // Llamar a getCurrentPosition al entrar en la vista
    this.getCurrentPosition();
  }

  async createMap(latitude: number, longitude: number) {
    this.map = await GoogleMap.create({
      id: 'my-map',
      apiKey: environment.mapsKey,
      element: this.mapRef.nativeElement,
      // Usar las coordenadas obtenidas para centrar el mapa
      config: {
        center: {
          lat: latitude,
          lng: longitude,
        },
        zoom: 15,
      },
    });

    //se añade marcador de ubicacion
    const markerId = await this.map.addMarker({
      coordinate: {
        lat: latitude,
        lng: longitude
      }
    });
  }

  
  
}
