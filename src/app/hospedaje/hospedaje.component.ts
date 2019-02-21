import { Component, OnInit,  ViewChild  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

// Servicios
import { ReservaServicesService } from '../services/reserva-services.service';
import { HospedajeServicesService } from '../services/hospedaje-services.service';
import { AuthServiceService } from '../services/auth-service.service';

// Interfaces
import { Sesion } from 'src/app/interfaces/sesion.interface';
import { Hospedaje } from '../interfaces/hospedajes.interface';
import { Usuario } from '../interfaces/usuario.interface';
import { Reserva } from '../interfaces/reserva_sola.interface';

// Manejando el Calendario
import {NgbDate, NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

// JQuery
declare var $: any;

// Notificacion
import {  SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-hospedaje',
  templateUrl: './hospedaje.component.html',
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
export class HospedajeComponent implements OnInit {

public sesiona: Sesion = {
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
public loggedIn: boolean;

tipo_hospedaje = [ 'Apartamento' , 'Casa', 'Habitacion' ];

hospedaje: any = {
  id: null,
  descripcion: null,
  tipo:  null,
  precio: null,
  image:  null,
  created_at: null,
  updated_at: null,
  deleted_at: null,
};
hospedaje_guardar: any = {
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
url0;
mostrar0 = false;
url1;
mostrar1 = false;
url2;
mostrar3 = false;

image;
image0;
image1;
image2;

  mostrar2: false;
  nombre: string ;
  id: number;
  k: number;

parametros: any = {fecha1: null,
                   fecha2: null
                   };
  selectedFile: File = null;
  selectedFile0: File = null;
  selectedFile1: File = null;
  selectedFile2: File = null;

  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;
  DateFin: NgbDate;


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
      hospedaje_id: null,
  };

  resp1: Hospedaje[] = [];
  resp2: Usuario[] = [];
  str1: string;
  str2: string;
  res: any;
  mes1;
  dia1;
  mes2;
  dia2;
  fechas: any = {
    fecha1: null,
    fecha2: null,
};

date_inicio: NgbDateStruct;
date_fin: NgbDateStruct;

showNavigationArrows = false;
showNavigationIndicators = false;

@ViewChild('carousel2') carousel: any;

  constructor(public _serviceHospedaje: HospedajeServicesService,
              public activatedRoute: ActivatedRoute,
              public _serviceReserva: ReservaServicesService,
              private Auth: AuthServiceService,
              calendar: NgbCalendar,
              private Notify: SnotifyService,
              private router: Router,
              config: NgbCarouselConfig) {


 // Configuracion del Carrosel Inicio
 config.interval = 12000;
 config.wrap = true;
 config.keyboard = false;
 config.pauseOnHover = false;
 config.showNavigationArrows = true;
 config.showNavigationIndicators = true;
 // Configuracion del Carrosel Fin


// Inicializando variables
this._serviceReserva.alerta2 = false;
// Obteniendo los parametros de consulta de hospedajes
activatedRoute.params
              .subscribe( params => {
                  const termino = params['termino'];

                  const arre_completo = termino.split('&');

                  const arre_ini = arre_completo[0].split('=');
                  const arre_fin = arre_completo[1].split('=');

                  this.parametros.fecha1 = String(arre_ini[1]);
                  this.parametros.fecha2 = String(arre_fin[1]);

                  this._serviceHospedaje.cargar_hospedajes_fechas( termino );

                });

// Iniciando variables del Calendario
   const arre_ini1 = this.parametros.fecha1.split('-');
   let dia_ini1 =   String(arre_ini1[2]); // dia

 if (String(dia_ini1) === '01') { dia_ini1 = '1'; }
 if (String(dia_ini1) === '02') { dia_ini1 = '2'; }
 if (String(dia_ini1) === '03') { dia_ini1 = '3'; }
 if (String(dia_ini1) === '04') { dia_ini1 = '4'; }
 if (String(dia_ini1) === '05') { dia_ini1 = '5'; }
 if (String(dia_ini1) === '06') { dia_ini1 = '6'; }
 if (String(dia_ini1) === '07') { dia_ini1 = '7'; }
 if (String(dia_ini1) === '08') { dia_ini1 = '8'; }
 if (String(dia_ini1) === '09') { dia_ini1 = '9'; }

 let mes_ini1 =   String(arre_ini1[1]); // mes

 if (String(mes_ini1) === '01') { mes_ini1 = '1'; }
 if (String(mes_ini1) === '02') { mes_ini1 = '2'; }
 if (String(mes_ini1) === '03') { mes_ini1 = '3'; }
 if (String(mes_ini1) === '04') { mes_ini1 = '4'; }
 if (String(mes_ini1) === '05') { mes_ini1 = '5'; }
 if (String(mes_ini1) === '06') { mes_ini1 = '6'; }
 if (String(mes_ini1) === '07') { mes_ini1 = '7'; }
 if (String(mes_ini1) === '08') { mes_ini1 = '8'; }
 if (String(mes_ini1) === '09') { mes_ini1 = '9'; }

 const arre_ini2 = this.parametros.fecha2.split('-');
 let dia_ini2 =   String(arre_ini2[2]); // dia

if (String(dia_ini2) === '01') { dia_ini2 = '1'; }
if (String(dia_ini2) === '02') { dia_ini2 = '2'; }
if (String(dia_ini2) === '03') { dia_ini2 = '3'; }
if (String(dia_ini2) === '04') { dia_ini2 = '4'; }
if (String(dia_ini2) === '05') { dia_ini2 = '5'; }
if (String(dia_ini2) === '06') { dia_ini2 = '6'; }
if (String(dia_ini2) === '07') { dia_ini2 = '7'; }
if (String(dia_ini2) === '08') { dia_ini2 = '8'; }
if (String(dia_ini2) === '09') { dia_ini2 = '9'; }

let mes_ini2 =   String(arre_ini2[1]); // mes

if (String(mes_ini2) === '01') { mes_ini2 = '1'; }
if (String(mes_ini2) === '02') { mes_ini2 = '2'; }
if (String(mes_ini2) === '03') { mes_ini2 = '3'; }
if (String(mes_ini2) === '04') { mes_ini2 = '4'; }
if (String(mes_ini2) === '05') { mes_ini2 = '5'; }
if (String(mes_ini2) === '06') { mes_ini2 = '6'; }
if (String(mes_ini2) === '07') { mes_ini2 = '7'; }
if (String(mes_ini2) === '08') { mes_ini2 = '8'; }
if (String(mes_ini2) === '09') { mes_ini2 = '9'; }

const date1: NgbDateStruct = { year: Number(arre_ini1[0]), month: Number(mes_ini1), day: Number(dia_ini1) };
const date2: NgbDateStruct = { year: Number(arre_ini2[0]), month: Number(mes_ini2), day: Number(dia_ini2) };

this.fechas.fecha1 = date1;
this.fechas.fecha2 = date2;

this.date_inicio = calendar.getToday();
this.date_fin = calendar.getNext(calendar.getToday(), 'd', 90);

      }

// Reservar Hospedaje en las fechas ingresadas
reservar(forma: NgForm, id: number) {
  if (this.loggedIn === false) {
  this.router.navigateByUrl('/login');
  }

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

this.reserva.fechainicio = fechainicio;
this.reserva.fechasalida = fechasalida;
this.reserva.hospedaje_id = id;
this.reserva.user_id = this.sesiona.id;

this._serviceReserva.error2 = false;
this._serviceReserva.alerta2 = false;

if (this.loggedIn === true) {
  this._serviceReserva.guardar_reserva( this.reserva );

  }
}

// Consultar Disponibilidad de Hospedaje en las fechas ingresadas
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

this._serviceHospedaje.cargar_hospedajes_fechas( termino );

}

// ---------------------------------------------------------------------------
      cargarMas() {
       this._serviceHospedaje.loading = true;
       this._serviceHospedaje.cargar_mas_hospedajes();

      }

      guardar_hospedaje( forma: NgForm) {

         const uploadData2 = new FormData();
         if (this.selectedFile === null) {} else {
          uploadData2.append('image', this.selectedFile, this.selectedFile.name);
         }
         if (this.selectedFile0 === null) {} else {
          uploadData2.append('image0', this.selectedFile0, this.selectedFile0.name);
         }
         if (this.selectedFile1 === null) {} else {
          uploadData2.append('image1', this.selectedFile1, this.selectedFile1.name);
         }
         if (this.selectedFile2 === null) {} else {
          uploadData2.append('image2', this.selectedFile2, this.selectedFile2.name);
         }
        uploadData2.append('descripcion', this.hospedaje_guardar.descripcion);
        uploadData2.append('tipo', this.hospedaje_guardar.tipo);
        uploadData2.append('precio', String(this.hospedaje_guardar.precio));

         this._serviceHospedaje.guardar_hospedaje( uploadData2 );
 }


      actualizar_hospedaje( forma: NgForm) {

       const uploadData = new FormData();

       if (this.selectedFile === null) {} else {
        uploadData.append('image', this.selectedFile, this.selectedFile.name);
       }
       if (this.selectedFile0 === null) {} else {
        uploadData.append('image0', this.selectedFile0, this.selectedFile0.name);
       }
       if (this.selectedFile1 === null) {} else {
        uploadData.append('image1', this.selectedFile1, this.selectedFile1.name);
       }
       if (this.selectedFile2 === null) {} else {
        uploadData.append('image2', this.selectedFile2, this.selectedFile2.name);
       }
      uploadData.append('descripcion', this.hospedaje.descripcion);
      uploadData.append('tipo', this.hospedaje.tipo);
      uploadData.append('precio', String(this.hospedaje.precio));
      this._serviceHospedaje.actualizar_hospedaje( this.hospedaje.id, uploadData, this.k);
     // }
    }

    // Cambiar Imagen de Hospedaje
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
      changeValue0($event: any) {
        this.mostrar0 = true;
        this.selectedFile0 = $event.target.files[0];

        if ($event.target.files && $event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = ( event2: any) => {
            this.url0 = event2.target.result;
        };
            reader.readAsDataURL($event.target.files[0]);
        }
      }
      changeValue1($event: any) {
        this.mostrar1 = true;
        this.selectedFile1 = $event.target.files[0];

        if ($event.target.files && $event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = ( event2: any) => {
            this.url1 = event2.target.result;
        };
            reader.readAsDataURL($event.target.files[0]);
        }
      }
      changeValue2($event: any) {
        this.mostrar3 = true;
        this.selectedFile2 = $event.target.files[0];

        if ($event.target.files && $event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = ( event2: any) => {
            this.url2 = event2.target.result;
        };
            reader.readAsDataURL($event.target.files[0]);
        }
      }




// Modales sobre Hospedaje

// Modal Abrir Galeria Hospedaje
abrirModalGaleria(  image: string, image0: string, image1: string, image2: string ) {

  this.image = image;
  this.image0 = image0;
  this.image1 = image1;
  this.image2 = image2;
   $('#ModalGaleria_Hospedaje').modal();
 }
// Modal Cerrar Galeria Hospedaje
 cerrarModalGaleria( valor: string  ) {
   $('#ModalGaleria_Hospedaje').modal('hide');
 }


// Modal Abrir Eliminar Hospedaje
abrirModalEliminar( id: number, k: number, nombre: string  ) {
  this.nombre = nombre;
  this.id = id;
  this.k = k;
   $('#ModalEliminar_Hospedaje').modal();
 }
// Modal Cerrar Eliminar Hospedaje
 cerrarModalEliminar( valor: string  ) {
  if (valor === 'SI') {
   this._serviceHospedaje.eliminar_hospedaje(this.id, this.k);
  }
   $('#ModalEliminar_Hospedaje').modal('hide');
 }


  // Modal Abrir Editar Hospedaje
  abrirModalHospedaje( hospedaje: Hospedaje , k: number ) {
    this.hospedaje = hospedaje;
    this.k = k;
     $('#Modal_Hospedaje').modal();
   }
  // Modal Cerrar Editar Hospedaje
   cerrarModalHospedaje( valor: string  ) {
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
   // Modal Cerrar Hospedaje
   cerrarModalHospedajeGuardar( valor: string  ) {
    if (valor === 'SI') {
    // this._serviceReserva.eliminar_reserva(this.id, this.k);
    // this.alerta = true;
    }
     $('#Modal_Hospedaje_Guardar').modal('hide');
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

  }

}
