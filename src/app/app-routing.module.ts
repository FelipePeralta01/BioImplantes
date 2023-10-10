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
},  {
    path: 'actualizar',
    loadChildren: () => import('./cliente/actualizar/actualizar.module').then( m => m.ActualizarPageModule)
  },
  {
    path: 'agregar',
    loadChildren: () => import('./cliente/agregar/agregar.module').then( m => m.AgregarPageModule)
  },
  {
    path: 'eliminar',
    loadChildren: () => import('./cliente/eliminar/eliminar.module').then( m => m.EliminarPageModule)
  },
  {
    path: 'leer',
    loadChildren: () => import('./cliente/leer/leer.module').then( m => m.LeerPageModule)
  },
  {
    path: 'listar',
    loadChildren: () => import('./cliente/listar/listar.module').then( m => m.ListarPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
