import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate: [AuthGuard]
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
    loadChildren: () => import('./detalle-pedido/detalle-pedido.module').then( m => m.DetallePedidoPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'product-add',
    loadChildren: () => import('./producto/product-add/product-add.module').then( m => m.ProductAddPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'product-list',
    loadChildren: () => import('./producto/product-list/product-list.module').then( m => m.ProductListPageModule), canActivate: [AuthGuard]
},
{
  path: 'product-detail/:id',
  loadChildren: () => import('./producto/product-detail/product-detail.module').then( m => m.ProductDetailPageModule), canActivate: [AuthGuard]
},
{
  path: 'product-edit/:id',
  loadChildren: () => import('./producto/product-edit/product-edit.module').then( m => m.ProductEditPageModule), canActivate: [AuthGuard]
},
{
  path: 'product-all',
  loadChildren: () => import('./producto/product-all/product-all.module').then( m => m.ProductAllPageModule), canActivate: [AuthGuard]
},
{
  path: 'cliente-agregar',
  loadChildren: () => import('./cliente/agregar/cliente.agregar.module').then( m => m.ClienteAgregarPageModule), canActivate: [AuthGuard]
},
{
  path: 'cliente-actualizar',
  loadChildren: () => import('./cliente/actualizar/cliente.actualizar.module').then( m => m.ClienteActualizarPageModule), canActivate: [AuthGuard]
},
{
  path: 'cliente-actualizar/:id',
  loadChildren: () => import('./cliente/actualizar/cliente.actualizar.module').then( m => m.ClienteActualizarPageModule), canActivate: [AuthGuard]
},
{
  path: 'cliente-eliminar',
  loadChildren: () => import('./cliente/eliminar/cliente.eliminar.module').then( m => m.ClienteEliminarPageModule), canActivate: [AuthGuard]
},
{
  path: 'cliente-eliminar/:id',
  loadChildren: () => import('./cliente/eliminar/cliente.eliminar.module').then( m => m.ClienteEliminarPageModule), canActivate: [AuthGuard]
},
{
  path: 'cliente-leer',
  loadChildren: () => import('./cliente/leer/cliente.leer.module').then( m => m.ClienteLeerPageModule), canActivate: [AuthGuard]
},
{
  path: 'cliente-leer/:id',
  loadChildren: () => import('./cliente/leer/cliente.leer.module').then( m => m.ClienteLeerPageModule), canActivate: [AuthGuard]
},
{
  path: 'cliente-listar',
  loadChildren: () => import('./cliente/listar/cliente.listar.module').then( m => m.ClienteListarPageModule), canActivate: [AuthGuard]
}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
