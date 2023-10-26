import { Component, OnInit } from '@angular/core';
import { ClProducto } from '../model/ClProducto';

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.page.html',
  styleUrls: ['./product-all.page.scss'],
})
export class ProductAllPage implements OnInit {
  msgError = ""
  buttonEliminarDisabled = false
  buttonLeerDisabled = false
  buttonActualizarDisabled = false
  buttonCrearDisabled = false
  producto: ClProducto = {
    idProducto: '',
    codigo: '08-G7',
    nombreprod: '',
    precio: 0,
    cantidad: 0,
    fechaNacimiento: '',
    rut: null,
    dv: null,
    enfermedad: null,
    fonocontacto: 0,
    categoria: '',
    editorial: null,
    raza: null,
    edad: null,
    altura: null,
    hrini: null,
    hrfin: null,
    direccion: null,
    fCreacion: '',
  };

  constructor() { }
  ngOnInit() {  }
  public id: string = '';


  leer() {}
  eliminar() { }
  grabar() { }
  actualizar() { }
  grabarActualizarAutomatico() { }
}
