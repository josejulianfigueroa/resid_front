import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [`
  .ng-invalid.ng-touched:not(form) {
    border: 1px solid red;
  }
  `]
})
export class RegistroComponent  {

  usuario: Object = {
    nombre: null,
    apellido: null,
    correo: null,
    pais: '',
    sexo: 'Hombre',
    acepta: true,
    direccion: null,
    telefono: null,
    password: null,
    cedula: null
  };


  paises = [{
    codigo: 'CRI',
    nombre: 'Costa Rica'
  },
  {
    codigo: 'ESP',
    nombre: 'Espana'
  }];


  sexos = ['Hombre', 'Mujer', 'Sin definir'];
  constructor() { }



  guardar( forma: NgForm) {
    console.log('Formulario posteado');
    console.log(' ngForm ', forma);
    console.log(' Valor ', forma.value );
    console.log(' Usuario ', this.usuario );
  }

}
