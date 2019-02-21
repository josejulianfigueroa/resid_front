import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

// Servicios
import { ReservaServicesService } from '../../services/reserva-services.service';
import { UsuariosServicesService } from '../../services/usuarios-services.service';

// Interfaces
import { Hospedaje } from '../../interfaces/hospedajes.interface';
import { Usuario } from '../../interfaces/usuario.interface';
import { Reserva } from '../../interfaces/reserva_sola.interface';

// Configuracion del Calendario y Carousel
import {NgbDate, NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

// Manejo del JQuery
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
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
`],
providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})
export class HomeComponent implements OnInit {

  images = null;

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
  fechas: any = {
    fecha1: null,
    fecha2: null,
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

  date_inicio: NgbDateStruct;
  date_fin: NgbDateStruct;


  showNavigationArrows = false;
  showNavigationIndicators = false;
  carga2 = false;

  @ViewChild('carousel') carousel: any;

  constructor(public _serviceReserva: ReservaServicesService,
              private _serviceUsuario: UsuariosServicesService,
              calendar: NgbCalendar,
              config: NgbCarouselConfig,
              private router: Router) {



 // Configuracion del Carrosel Inicio
 config.interval = 12000;
 config.wrap = true;
 config.keyboard = false;
 config.pauseOnHover = false;
 config.showNavigationArrows = true;
 config.showNavigationIndicators = true;
 // Configuracion del Carrosel Fin

 // Llamada a la Carga de Imagenes Inicio
 this.fechas.fecha1 = calendar.getToday();
 this.date_inicio = calendar.getToday();
 this.date_fin = calendar.getNext(calendar.getToday(), 'd', 90);


 this.cargaImagenes().then(

  mensaje => {
  this.images = [1, 2, 3, 4].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  // console.log('carga de Imagenes Finalizada', mensaje);
  }
 )
 .catch( error => console.error('Error en la carga de imagenes', error));

 setInterval( () => {
  this.carga2 = true;
 }, 4000 );
// Llamada a la Carga de Imagenes Fin

  }

  // Carga de Imagenes en Vista Home Inicio
  cargaImagenes(): Promise<boolean> {

    return new Promise( (resolve, reject) => {

    setInterval( () => {
        resolve( true );
    }, 1500 );

  });
  }
  // Carga de Imagenes en Vista Home Fin

 BuscarDispo( forma: NgForm) {

  if (String(forma.value.fecha1.month) === '1' || String(forma.value.fecha1.month) === '2'
  || String(forma.value.fecha1.month) === '3' || String(forma.value.fecha1.month) === '4'
  || String(forma.value.fecha1.month) === '5' || String(forma.value.fecha1.month) === '6'
  || String(forma.value.fecha1.month) === '7' || String(forma.value.fecha1.month) === '8'
  || String(forma.value.fecha1.month) === '9') {
this.mes1 = '0' + forma.value.fecha1.month;
} else { this.mes1 = forma.value.fecha1.month; }

if (String(forma.value.fecha2.month) === '1' || String(forma.value.fecha2.month) === '2'
  || String(forma.value.fecha2.month) === '3' || String(forma.value.fecha2.month) === '4'
  || String(forma.value.fecha2.month) === '5' || String(forma.value.fecha2.month) === '6'
  || String(forma.value.fecha2.month) === '7' || String(forma.value.fecha2.month) === '8'
  || String(forma.value.fecha2.month) === '9') {
this.mes2 = '0' + forma.value.fecha2.month;
} else { this.mes2 = forma.value.fecha2.month; }

if (String(forma.value.fecha1.day) === '1' || String(forma.value.fecha1.day) === '2'
  || String(forma.value.fecha1.day) === '3' || String(forma.value.fecha1.day) === '4'
  || String(forma.value.fecha1.day) === '5' || String(forma.value.fecha1.day) === '6'
  || String(forma.value.fecha1.day) === '7' || String(forma.value.fecha1.day) === '8'
  || String(forma.value.fecha1.day) === '9') {
this.dia1 = '0' + forma.value.fecha1.day;
} else { this.dia1 = forma.value.fecha1.day; }
if (String(forma.value.fecha2.day) === '1' || String(forma.value.fecha2.day) === '2'
  || String(forma.value.fecha2.day) === '3' || String(forma.value.fecha2.day) === '4'
  || String(forma.value.fecha2.day) === '5' || String(forma.value.fecha2.day) === '6'
  || String(forma.value.fecha2.day) === '7' || String(forma.value.fecha2.day) === '8'
  || String(forma.value.fecha2.day) === '9') {
this.dia2 = '0' + forma.value.fecha2.day;
} else { this.dia2 = forma.value.fecha2.day; }


const fechainicio = forma.value.fecha1.year + '-' + this.mes1 + '-' + this.dia1;
const fechasalida = forma.value.fecha2.year + '-' + this.mes2 + '-' + this.dia2;

const termino = 'fecha1=' + fechainicio + '&fecha2=' + fechasalida;

  this.router.navigate(['/hospedaje', termino ]);

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

this.reserva.hospedaje_id = $('#hospedaje_id').val();

   // console.log(' Valor', this.reserva );

    this._serviceReserva.guardar_reserva( this.reserva );

  }

  changeValue($event: any) {
    console.log($event);
  }


  ngOnInit() {

  }

}
