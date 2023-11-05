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
    idProducto: 0,
    codigo: '08-G07',
    nombreprod: '',
    precio: 0,
    cantidad: 0,
    fechaNacimiento: '',
    rut: 0,
    dv: '',
    enfermedad: '',
    fonocontacto: 0,
    categoria: '',
    editorial: '',
    raza: '',
    edad: 0,
    altura: 0,
    hrini: '',
    hrfin: '',
    direccion: '',
    fCreacion: ''
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
