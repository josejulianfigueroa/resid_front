import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservaServicesService } from '../../services/reserva-services.service';
import { PagosServicesService } from '../../services/pagos-services.service';

declare var $: any;


@Component({
  selector: 'app-search-reserva',
  templateUrl: './search-reserva.component.html',
  styleUrls: ['./search-reserva.component.css']
})
export class SearchReservaComponent implements OnInit {


  nombre: string ;
  id: number;
  k: number;
  alerta = false;

  constructor(private route: ActivatedRoute,
              public _servicePagos: PagosServicesService,
              public _serviceReserva: ReservaServicesService) { }

  ngOnInit() {

    this.route.params
    .subscribe ( params => {
      this._serviceReserva.buscarReserva( params['termino'] );
    });
  }


  // Modal Eliminar Reservacion
abrirModalEliminar( id: number, k: number, nombre: string  ) {

  // this.videoSel = video;
  this.nombre = nombre;
  this.id = id;
  this.k = k;
   $('#ModalEliminar2').modal();

 }

 cerrarModalEliminar( valor: string  ) {
  //  this.videoSel = null;
  if (valor === 'SI') {
   this._serviceReserva.eliminar_reserva(this.id, this.k);
  this.alerta = true;
  }
   $('#ModalEliminar2').modal('hide');
 }


  // Modal Pagos
  abrirModalPagos( id: number  ) {

    // this.videoSel = video;
    this.id = id;
    this._servicePagos.loading = true;
    this._servicePagos.cargar_pagos( this.id );
     $('#ModalPagos2').modal();

   }

   cerrarModalPagos( valor: string  ) {
    //  this.videoSel = null;
    if (valor === 'SI') {
    // this._serviceReserva.eliminar_reserva(this.id, this.k);
    this.alerta = true;
    }
     $('#ModalPagos2').modal('hide');
   }

}
