import { Component, OnInit } from '@angular/core';
import { ReservaServicesService } from '../../services/reserva-services.service';
import { PagosServicesService } from '../../services/pagos-services.service';
// import { Reservacion } from '../../interfaces/reservacion.interface';

import { Hospedaje } from '../../interfaces/hospedajes.interface';

import { Pagos } from '../../interfaces/pagos.interface';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

declare var $: any;


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: [`
  .ng-invalid.ng-touched:not(form) {
    border: 1px solid red;
  }
  `]
})
export class AdminComponent {

  // pago: Pagos[] = [];
    pago: Pagos = {
    monto:  null,
    fecha: null,
    reservacion_id: null,
    updated_at: null,
    created_at: null,
    id: null,
    deleted_at: null
  };

  mostrar: false;
  mostrar2: false;
  nombre: string ;
  id: number;
  k: number;
  alerta = false;

   // reservaciones: Reservacion[] = [];
   // loading = true;
    reserva: Object = {
    fechainicio: null,
    fechasalida: null,
    user_id: null,
    hospedaje_id: null,
  };
  resp1: Hospedaje[] = [];

  constructor(public _serviceReserva: ReservaServicesService,
              public _servicePagos: PagosServicesService,
    private router: Router) {

      this._serviceReserva.cargar_reservaciones();

      this._serviceReserva.cargar_hospedajes()
      .subscribe( (resp: any) => {
              console.log(resp.data);
              this.resp1 = resp.data;
        });

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

  // Modal Eliminar Reservacion
abrirModalEliminar( id: number, k: number, nombre: string  ) {

  // this.videoSel = video;
  this.nombre = nombre;
  this.id = id;
  this.k = k;
   $('#ModalEliminar1').modal();

 }

 cerrarModalEliminar( valor: string  ) {
  //  this.videoSel = null;
  if (valor === 'SI') {
   this._serviceReserva.eliminar_reserva(this.id, this.k);
  this.alerta = true;
  }
   $('#ModalEliminar1').modal('hide');
 }


  // Modal Pagos
  abrirModalPagos( id: number  ) {

    // this.videoSel = video;
    this.id = id;
    this.pago.reservacion_id = id;
    this._servicePagos.loading = true;
    this._servicePagos.cargar_pagos( this.id );
     $('#ModalPagos1').modal();

   }

   cerrarModalPagos( valor: string  ) {
    //  this.videoSel = null;
    if (valor === 'SI') {
    // this._serviceReserva.eliminar_reserva(this.id, this.k);
    // this.alerta = true;
    }
     $('#ModalPagos1').modal('hide');
   }
/*
  cargar_reservaciones() {
  return new Promise((resolve, reject) => {
            this._serviceReserva.cargar_reservaciones()
                      .subscribe( (resp: any) => {
                                 setTimeout( () => {
                                             this.reservaciones = resp.data;
                                            // console.log(this.reservaciones);
                                             this.loading = false;
                                           }, 2000);
                                   });
         resolve();
 });
  }

  eliminar_reserva(id: number, k: number) {

      this._serviceReserva.eliminar_reservaciones( id )
              .subscribe( respuesta => {
                          console.log(respuesta);
                            if ( respuesta ) {
                              delete this.reservaciones[k];
                                // console.error(respuesta);
                            }
                        });
  }

    this._chatService.agregarMensaje( this.mensaje )
            .then( () => this.mensaje = '')
            .catch( (err) => console.log('Error al Enviar', err));


  */

}
