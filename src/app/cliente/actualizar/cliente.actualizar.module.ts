
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteActualizarPageRoutingModule } from './cliente.actualizar.routing';

import { ClienteActualizarPage } from './cliente.actualizar.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ClienteActualizarPageRoutingModule
  ],
  declarations: [ClienteActualizarPage]
})
export class ClienteActualizarPageModule {}
