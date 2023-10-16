import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'detalle-pedido',
    loadChildren: () => import('./detalle-pedido/detalle-pedido.module').then( m => m.DetallePedidoPageModule)
  },
  {
    path: 'product-add',
    loadChildren: () => import('./producto/product-add/product-add.module').then( m => m.ProductAddPageModule)
  },
  {
    path: 'product-list',
    loadChildren: () => import('./producto/product-list/product-list.module').then( m => m.ProductListPageModule)
},
{
  path: 'product-detail/:id',
  loadChildren: () => import('./producto/product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
},
{
  path: 'product-edit/:id',
  loadChildren: () => import('./producto/product-edit/product-edit.module').then( m => m.ProductEditPageModule)
},
{
  path: 'product-all',
  loadChildren: () => import('./producto/product-all/product-all.module').then( m => m.ProductAllPageModule)
},
{
  path: 'cliente-agregar',
  loadChildren: () => import('./cliente/agregar/cliente.agregar.module').then( m => m.ClienteAgregarPageModule)
},
{
  path: 'cliente-actualizar',
  loadChildren: () => import('./cliente/actualizar/cliente.actualizar.module').then( m => m.ClienteActualizarPageModule)
},
{
  path: 'cliente-actualizar/:id',
  loadChildren: () => import('./cliente/actualizar/cliente.actualizar.module').then( m => m.ClienteActualizarPageModule)
},
{
  path: 'cliente-eliminar',
  loadChildren: () => import('./cliente/eliminar/cliente.eliminar.module').then( m => m.ClienteEliminarPageModule)
},
{
  path: 'cliente-eliminar/:id',
  loadChildren: () => import('./cliente/eliminar/cliente.eliminar.module').then( m => m.ClienteEliminarPageModule)
},
{
  path: 'cliente-leer',
  loadChildren: () => import('./cliente/leer/cliente.leer.module').then( m => m.ClienteLeerPageModule)
},
{
  path: 'cliente-leer/:id',
  loadChildren: () => import('./cliente/leer/cliente.leer.module').then( m => m.ClienteLeerPageModule)
},
{
  path: 'cliente-listar',
  loadChildren: () => import('./cliente/listar/cliente.listar.module').then( m => m.ClienteListarPageModule)
}
  
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
