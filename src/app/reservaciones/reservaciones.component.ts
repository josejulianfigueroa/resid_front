import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

// Para la Busqueda
import { PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

// Parar el Sort
import { Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';

// Servicios
import { ReservaServicesService } from '../services/reserva-services.service';
import { HospedajeServicesService } from '../services/hospedaje-services.service';
import { PagosServicesService } from '../services/pagos-services.service';
import { AuthServiceService } from '../services/auth-service.service';
// import { Reservacion } from '../../interfaces/reservacion.interface';

// Interfaces
import { Sesion } from 'src/app/interfaces/sesion.interface';
import { Hospedaje } from '../interfaces/hospedajes.interface';
import { Pagos } from '../interfaces/pagos.interface';

// Trabajando con JQuery
declare var $: any;

// Sort
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };
export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeaderDirective {

  @Input() sortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}
// Sort

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.component.html',
  styles: [`
  .ng-invalid.ng-touched:not(form) {
    border: 1px solid red;
  }
  `],
  providers: [DecimalPipe]
})

export class ReservacionesComponent implements OnInit {

  loggedIn: boolean;
  mostrar: false;
  mostrar2: false;
  nombre: string ;
  id: number;
  k: number;
  alerta = false;

  sesiona: Sesion = {
    token : '',
    expires_in : '',
    nombre : '',
    rol : 'false',
    id : 0,
    apellido: '',
    direccion: '',
    telefono: '',
    imagen: '',
    email: ''
  };

  pago: Pagos = {
    monto:  null,
    fecha: null,
    reservacion_id: null,
    updated_at: null,
    created_at: null,
    id: null,
    deleted_at: null
  };

 reserva: Object = {
    fechainicio: null,
    fechasalida: null,
    user_id: null,
    hospedaje_id: null,
  };

  resp1: Hospedaje[] = [];

    // Sort
  @ViewChildren(NgbdSortableHeaderDirective) headers: QueryList<NgbdSortableHeaderDirective>;
  // Sort

  // Paginacion
  page = 1;
  pageSize = 4;
  // Paginacion

  constructor(public _serviceReserva: ReservaServicesService,
              public _servicePagos: PagosServicesService,
              public _serviceHospedaje: HospedajeServicesService,
              private Auth: AuthServiceService,
              private router: Router) {


   // Valores de Alerta del Servicio a false
   this._serviceReserva.error = false;
   this._servicePagos.alerta = false;
   this._servicePagos.error = false;
   this._serviceReserva.alerta_eliminar = false;

   // Lista de Hospedajes
   this._serviceHospedaje.cargar_hospedajes()
       .subscribe( (resp: any) => {
              this.resp1 = resp.data;
        });

  }
// Objeto Vacio
isEmpty(obj) {
    for ( let key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
          }
    }
    return true;
}
// Objeto Vacio

// Total de Pagos
getTotal() {
  let total = 0;

  for (let valor of this._servicePagos.pagos ) {
  if ( this.isEmpty(valor)) {
} else {
  total = total + Number(valor.monto);
}

}
/*
  for (let i = 0; i < this._servicePagos.pagos.length ; i++) {
    total = total + Number(this._servicePagos.pagos[i].monto);
  }
  */
  return total;
}

// Total de Pagos

// Paginacion
get countries(): any {
  return this._serviceReserva.reservaciones
    .map((country, i) => ({id: i + 1, ...country}))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
}
// Paginacion



  // Sort
  onSort({column, direction}: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '') {
      this._serviceReserva.reservaciones = this._serviceReserva.reservaciones;
    } else {
      this._serviceReserva.reservaciones = [...this._serviceReserva.reservaciones].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
  // Sort

  buscarReserva( termino: string) {
    this._serviceReserva.buscarReserva( termino );
  }

  reservar( forma: NgForm) {
    console.log('Formulario posteado');
    console.log(' ngForm ', forma);
    console.log(' Valor ', forma.value );

  }

  guardar_pago( forma: NgForm) {
    // console.log('Formulario posteado');
    // console.log(' Valor ', forma.value );
    // console.log(' Usuario1 ', this.pago ); // Valor Directo
     // console.log(' Usuario ', forma.value ); // En forma de objeto
     this._servicePagos.guardar_pago( this.pago );

  }

  // Modales sobre Reservaciones
  // Modal Abrir Eliminar Reservacion
abrirModalEliminar( id: number, k: number, nombre: string  ) {
  this.nombre = nombre;
  this.id = id;
  this.k = k;
   $('#ModalEliminar1').modal();
 }
  // Modal Cerrar Eliminar Reservacion
 cerrarModalEliminar( valor: string  ) {
  if (valor === 'SI') {
   this._serviceReserva.alerta_eliminar = false;
   this._serviceReserva.eliminar_reserva(this.id, this.k);
  }
   $('#ModalEliminar1').modal('hide');
 }

  // Modales sobre Pagos
  // Modal Abrir Pagos
  abrirModalPagos( id: number  ) {
    this.id = id;
    this.pago.reservacion_id = id;
    this._servicePagos.loading = true;
    this._servicePagos.cargar_pagos( this.id );

     $('#ModalPagos1').modal();
   }
  // Modal Cerrar Pagos
   cerrarModalPagos( valor: string  ) {
    if (valor === 'SI') {
    }

    if (this.sesiona.rol === 'true') {
      this._serviceReserva.cargar_reservaciones('vacio', 0 );
      } else {
      this._serviceReserva.cargar_reservaciones('vacio', this.sesiona.id);
        }

     $('#ModalPagos1').modal('hide');
   }


 ngOnInit() {
  // Capturando la Sesion del Usuario
  this.Auth.authStatus.subscribe(value => this.loggedIn = value);

 if (this.loggedIn === true) {
   this.sesiona.nombre = localStorage.getItem('nombre');
   this.sesiona.rol = localStorage.getItem('rol');
   this.sesiona.id = Number(localStorage.getItem('id'));
   this.sesiona.expires_in = localStorage.getItem('expires_in');
   this.sesiona.apellido = localStorage.getItem('apellido');
   this.sesiona.direccion = localStorage.getItem('direccion');
   this.sesiona.telefono = localStorage.getItem('telefono');
   this.sesiona.imagen = localStorage.getItem('imagen');
   this.sesiona.email = localStorage.getItem('email');

   if (this.sesiona.imagen === 'undefined' || this.sesiona.imagen === 'null') {
    this.sesiona.imagen = null;
  }
  if (this.sesiona.direccion === 'undefined' || this.sesiona.direccion === 'null') {
    this.sesiona.direccion = '';
  }
  if (this.sesiona.apellido === 'undefined' || this.sesiona.apellido === 'null') {
    this.sesiona.apellido = '';
  }
  if (this.sesiona.telefono === 'undefined' || this.sesiona.telefono === 'null') {
    this.sesiona.telefono = '';
  }

 }

  if (this.sesiona.rol === 'true') {
  this._serviceReserva.cargar_reservaciones('vacio', 0 );
  } else {
  this._serviceReserva.cargar_reservaciones('vacio', this.sesiona.id);
    }

}
}

