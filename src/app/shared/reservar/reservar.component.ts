import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// Servicios
import { ReservaServicesService } from '../../services/reserva-services.service';
import { UsuariosServicesService } from '../../services/usuarios-services.service';

// Interfaces
import { Hospedaje } from '../../interfaces/hospedajes.interface';
import { Usuario } from '../../interfaces/usuario.interface';
import { Reserva } from '../../interfaces/reserva_sola.interface';

import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

declare var $: any;

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styles: [`
  .custom-day {
    text-align: center;
    padding: 0.185rem 0.25rem;
    display: inline-block;
    height: 2rem;
    width: 2rem;
  }
  .custom-day.focused {
    background-color: #e6e6e6;
  }
  .custom-day.range, .custom-day:hover {
    background-color: rgb(2, 117, 216);
    color: white;
  }
  .custom-day.faded {
    background-color: rgba(2, 117, 216, 0.5);
  }
`]
})

export class ReservarComponent {
  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;


  objectsArray: any = [];

  config = {
    displayKey: 'nombre', // if objects array passed which key to be displayed defaults to description
    search: true, // true/false for the search functionlity defaults to false,
    height: 'auto', // height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: 'Seleccione un Cliente', // text to be displayed when no item is selected defaults to Select,
    customComparator: () => {}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
     limitTo: 5, // options.length, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    moreText: 'más', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No hay resultados!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Buscar' // label thats displayed in search input
  };

  reserva: any = {
      id: null,
      fechainicio: null,
      fechasalida: null,
      user_id: null,
    //  fechareserva: null,
      hospedaje_id: null,
    //  status: null,
    //  created_at: null,
     // updated_at: null,
     // deleted_at: null
  };
  /*
  reserva: Object = {
    fechainicio: null,
    fechasalida: null,
    user_id: null,
    hospedaje_id: null,
  };*/
  resp1: Hospedaje[] = [];
  resp2: Usuario[] = [];
  str1: string;
  str2: string;
  res: any;
  mes1;
  dia1;
  mes2;
  dia2;
  constructor(public _serviceReserva: ReservaServicesService,
              private _serviceUsuario: UsuariosServicesService,
              calendar: NgbCalendar) {

                this.fromDate = calendar.getToday();
                this.toDate = calendar.getNext(calendar.getToday(), 'd', 5);

    this._serviceReserva.cargar_hospedajes()
                        .subscribe( (resp: any) => {
                                console.log(resp.data);
                                this.resp1 = resp.data;
                          });
   this._serviceUsuario.cargar_usuarios()
                          .subscribe( (resp: any) => {
                                  console.log(resp.data);
                                  this.resp2 = resp.data;
                            });


  }
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }


  reservar( forma: NgForm) {

    console.log(forma.value.id_usuario );
   //  console.log('Name:' + userForm.controls['name'].value);
      this.reserva.user_id = forma.value.id_usuario;

     /*this.str1 = $('#fechainicio').val();
     this.res = this.str1.split('-');
     this.reserva.fechainicio = this.res[2] + '-' + this.res[1] + '-' + this.res[0];

     this.str1 = $('#fechasalida').val();
     this.res = this.str1.split('-');
     this.reserva.fechasalida = this.res[2] + '-' + this.res[1] + '-' + this.res[0];
*/
if (String(this.fromDate.month) === '1' || String(this.fromDate.month) === '2'
      || String(this.fromDate.month) === '3' || String(this.fromDate.month) === '4'
      || String(this.fromDate.month) === '5' || String(this.fromDate.month) === '6'
      || String(this.fromDate.month) === '7' || String(this.fromDate.month) === '8'
      || String(this.fromDate.month) === '9') {
  this.mes1 = '0' + this.fromDate.month;
} else { this.mes1 = this.fromDate.month; }

if (String(this.toDate.month) === '1' || String(this.toDate.month) === '2'
      || String(this.toDate.month) === '3' || String(this.toDate.month) === '4'
      || String(this.toDate.month) === '5' || String(this.toDate.month) === '6'
      || String(this.toDate.month) === '7' || String(this.toDate.month) === '8'
      || String(this.toDate.month) === '9') {
  this.mes2 = '0' + this.toDate.month;
} else { this.mes2 = this.toDate.month; }

if (String(this.fromDate.day) === '1' || String(this.fromDate.day) === '2'
      || String(this.fromDate.day) === '3' || String(this.fromDate.day) === '4'
      || String(this.fromDate.day) === '5' || String(this.fromDate.day) === '6'
      || String(this.fromDate.day) === '7' || String(this.fromDate.day) === '8'
      || String(this.fromDate.day) === '9') {
  this.dia1 = '0' + this.fromDate.day;
} else { this.dia1 = this.fromDate.day; }
if (String(this.toDate.day) === '1' || String(this.toDate.day) === '2'
      || String(this.toDate.day) === '3' || String(this.toDate.day) === '4'
      || String(this.toDate.day) === '5' || String(this.toDate.day) === '6'
      || String(this.toDate.day) === '7' || String(this.toDate.day) === '8'
      || String(this.toDate.day) === '9') {
  this.dia2 = '0' + this.toDate.day;
} else { this.dia2 = this.toDate.day; }


this.reserva.fechainicio = this.fromDate.year + '-' + this.mes1 + '-' + this.dia1;
this.reserva.fechasalida = this.toDate.year + '-' + this.mes2 + '-' + this.dia2;
this.reserva.hospedaje_id = $('#hospedaje_id').val();

   // console.log(' Valor', this.reserva );

    this._serviceReserva.guardar_reserva( this.reserva );

  }


  changeValue($event: any) {
    console.log($event);
  }


}
