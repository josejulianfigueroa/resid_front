import { Component, OnInit } from '@angular/core';
import { Hospedaje } from '../../interfaces/hospedajes.interface';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { HospedajeServicesService } from '../../services/hospedaje-services.service';

declare var $: any;

@Component({
  selector: 'app-hospedajes',
  templateUrl: './hospedajes.component.html',
  styleUrls: ['./hospedajes.component.css']
})
export class HospedajesComponent  {

  tipo_hospedaje = [ 'Apartamento' , 'Casa', 'Habitacion' ];

hospedaje: Hospedaje = {
  id: null,
  descripcion: null,
  tipo:  null,
  precio: null,
  image:  null,
  created_at: null,
  updated_at: null,
  deleted_at: null,
};
hospedaje_guardar: Hospedaje = {
  id: null,
  descripcion: null,
  tipo:  null,
  precio: null,
  image:  null,
  created_at: null,
  updated_at: null,
  deleted_at: null,
};
url;
mostrar = false;

  mostrar2: false;
  nombre: string ;
  id: number;
  k: number;


  selectedFile: File = null;
  constructor(public _serviceHospedaje: HospedajeServicesService) {

      this._serviceHospedaje.cargar_hospedajes();
    /*  .subscribe( (resp: any) => {
              console.log(resp.data);
              this.hospedajes = resp.data;
        });*/
      }
      cargarMas() {
       this._serviceHospedaje.loading = true;
        this._serviceHospedaje.cargar_mas_hospedajes();

      }


      guardar_hospedaje( forma: NgForm) {
        console.log(this.selectedFile);
        // if (this.selectedFile !== null) {
         const uploadData2 = new FormData();
         if (this.selectedFile === null) {} else {
          uploadData2.append('image', this.selectedFile, this.selectedFile.name);
         }
  
        uploadData2.append('descripcion', this.hospedaje_guardar.descripcion);
        uploadData2.append('tipo', this.hospedaje_guardar.tipo);
        uploadData2.append('precio', String(this.hospedaje_guardar.precio));
         console.log(this.hospedaje_guardar.descripcion);
         this._serviceHospedaje.guardar_hospedaje( uploadData2 );
 }


      actualizar_hospedaje( forma: NgForm) {

       console.log(this.selectedFile);
      // if (this.selectedFile !== null) {
       const uploadData = new FormData();
       if (this.selectedFile === null) {} else {
        uploadData.append('image', this.selectedFile, this.selectedFile.name);
       }

      uploadData.append('descripcion', this.hospedaje.descripcion);
      uploadData.append('tipo', this.hospedaje.tipo);
      uploadData.append('precio', String(this.hospedaje.precio));
      // console.log(uploadData);
       this._serviceHospedaje.actualizar_hospedaje( this.hospedaje.id, uploadData, this.k);
     // }
    }



      changeValue($event: any) {
        this.mostrar = true;
        this.selectedFile = $event.target.files[0];


if ($event.target.files && $event.target.files[0]) {
  const reader = new FileReader();
  reader.onload = ( event2: any) => {
    this.url = event2.target.result;
  };
  reader.readAsDataURL($event.target.files[0]);
}
      }


// Modal Eliminar Reservacion
abrirModalEliminar( id: number, k: number, nombre: string  ) {

  // this.videoSel = video;
  this.nombre = nombre;
  this.id = id;
  this.k = k;
   $('#ModalEliminar_Hospedaje').modal();

 }

 cerrarModalEliminar( valor: string  ) {
  //  this.videoSel = null;
  if (valor === 'SI') {
   this._serviceHospedaje.eliminar_hospedaje(this.id, this.k);
  }
   $('#ModalEliminar_Hospedaje').modal('hide');
 }


  // Modal Editar Hospedaje
  abrirModalHospedaje( hospedaje: Hospedaje , k: number ) {

    this.hospedaje = hospedaje;
    this.k = k;

     $('#Modal_Hospedaje').modal();

   }

   cerrarModalHospedaje( valor: string  ) {
    //  this.videoSel = null;
    if (valor === 'SI') {
    // this._serviceReserva.eliminar_reserva(this.id, this.k);
    // this.alerta = true;
    }
     $('#Modal_Hospedaje').modal('hide');
   }



   // Modal Guardar Hospedaje
  abrirModalHospedajeGuardar() {

     $('#Modal_Hospedaje_Guardar').modal();

   }

   cerrarModalHospedajeGuardar( valor: string  ) {
    //  this.videoSel = null;
    if (valor === 'SI') {
    // this._serviceReserva.eliminar_reserva(this.id, this.k);
    // this.alerta = true;
    }
     $('#Modal_Hospedaje_Guardar').modal('hide');
   }

}
