import { Component, OnInit } from '@angular/core';

// Importamos Librerías
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ClProducto } from '../model/ClProducto';
//import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProductoService } from '../producto.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {
  // Creamos la Variable para el Html
  productos: ClProducto[] = [];
  // Injectamos Librerias
  constructor(public restApi: ProductoService
    , public loadingController: LoadingController
    , public router: Router) { }

  // LLamamos al método que rescata los productos  
  ngOnInit() {
    this.getProducts();
  }

  // Método  que rescta los productos
  async getProducts() {
    console.log("Entrando :getProducts");
    const loading = await this.loadingController.create({
      message: 'Harrys Loading...'
    });
    await loading.present();
    console.log("Entrando :");
  
    await this.restApi.getProducts()
      .subscribe({
        next: (res) => {
          console.log("Res:", res);
  
          // Filtrar productos por el código "08/G07"
          this.productos = res.filter(producto => producto.codigo === '08-G07');
          
          console.log("thisProductos:", this.productos);
          loading.dismiss();
        },
        complete: () => { },
        error: (err) => {
          console.log("Err:", err);
          loading.dismiss();
        }
      });
  }
  

}


  
  // drop(event: CdkDragDrop<string[]>) {
  //   console.log("Moviendo Item Array Drop ***************:");
  //   moveItemInArray(this.productos, event.previousIndex, event.currentIndex);
  // }

