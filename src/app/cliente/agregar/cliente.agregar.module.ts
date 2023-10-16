import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ClienteAgregarPageRoutingModule } from './cliente.agregar.routing';
import { ClienteAgregarPage } from './cliente.agregar.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ClienteAgregarPageRoutingModule,

  ],
  declarations: [ClienteAgregarPage]
})
export class ClienteAgregarPageModule {}
