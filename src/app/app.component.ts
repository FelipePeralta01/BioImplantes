import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [

    { title: 'Producto/Listar', url: 'product-list', icon: 'mail' },
    { title: 'Producto/Add', url: 'product-add', icon: 'mail' },
    { title: 'Producto/Editar', url: 'product-edit', icon: 'mail' },
    { title: 'Producto/Detail/1', url: 'product-detail/1', icon: 'mail' },
    { title: 'Producto/Detail/10', url: 'product-detail/10', icon: 'mail' },
    { title: 'Producto/Detail/', url: 'product-detail/', icon: 'mail' },
    { title: 'Producto/Crud', url: 'product-all', icon: 'mail' },

  ];
  constructor() {}
}
