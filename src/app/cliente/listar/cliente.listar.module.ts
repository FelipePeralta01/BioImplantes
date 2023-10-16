import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { ListarPageRoutingModule } from './cliente.listar.routing';
import { ListarClientePage } from './cliente.listar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ListarPageRoutingModule
  ],
  declarations: [ListarClientePage]
})
export class ClienteListarPageModule {}
