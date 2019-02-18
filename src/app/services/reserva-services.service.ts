import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { Reservacion } from '../interfaces/reservacion.interface';
import { Reserva } from '../interfaces/reserva_sola.interface';

import { map } from 'rxjs/operators';

// Notificacion
import {  SnotifyService } from 'ng-snotify';

// Configuracion
import { URL_SERVICIOS } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ReservaServicesService {

 url = URL_SERVICIOS;
 status = 'Por Confirmar';
 loading = true;
 alerta2 = false;
 alerta_eliminar = false;
 reservaciones: Reservacion[] = [];
 reservacionesFiltrado: Reservacion[] = [];
 termino = '';
 mensajeError = '';
 error = false;
 error2 = false;
 collectionSize;

httpOptions = {
  headers: new HttpHeaders({
   'Content-Type':  'application/json',
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjdmZDJmNGYwZDAwZTgzYjFmN2Q5ZWE0Y2U4YjdiMTcwZmE3NmQxZGYxMGQ2OGUzNGY2MWZmYzZkMmI3NDAwNWU3NzM2NWM2NzI5Njc3ODg2In0.eyJhdWQiOiI0IiwianRpIjoiN2ZkMmY0ZjBkMDBlODNiMWY3ZDllYTRjZThiN2IxNzBmYTc2ZDFkZjEwZDY4ZTM0ZjYxZmZjNmQyYjc0MDA1ZTc3MzY1YzY3Mjk2Nzc4ODYiLCJpYXQiOjE1Mzk5ODEwNTUsIm5iZiI6MTUzOTk4MTA1NSwiZXhwIjoxNTM5OTgyODU1LCJzdWIiOiI0Iiwic2NvcGVzIjpbXX0.Ns6nRo0odaqGNj8dsC7uWT0PJhD0l1pzxcyM1KhjJhEstlOE3MoiyDXee7hqyajo3KE7wi3RiPzjfouYgDdM114Jov3gPgJ9aQixakVqC5GbnETBd3sOji7EeWFrcSSoY3zOjB_pker_zrFwQkHYig5TcVX_CsScIsiSnN57LfsYgR0iwV4HJPfqtfq8nMJyS29pIPnazJTFDgmjOEq5Xov7gf-XK_t78zKE0WJ03JxyxojfoG-LxSuqinGPYCP9SDTBaX2Q-_qwFEud7EejdYJf9Opsp0-bMJAcwmLG-556Kt4zTjOhtkh1tHF6kqHM1OPXklUsjzDFcSTc4GsZ3tG-MdfkT6Cpw0u-9ruu2c8AxQRqp-6pcQNb96AJffwNHbFjF9nspuIsbM24pc00wJ05EPsZwjl8aOXWQeIF5dQBCwB3hTQG1W7xvXobCWVluIuiPPcA3xQHiSyxNiK6-LIMw03rr49TNSzUeGsFW-sf4H13C6ShWuKYTJpR8IfmXcTaeh1BOzuJ5q07tdpc4x4h_36diKks5xj5UiPpT6OF0-Nng8y_nMeDyrudBhHo6pCt1DFql6sI25qhTWGpG9ynGq_KT5eZVKKLfpsJ6YZq9EfeAE1VVKEeLfFERJlUwqNYqGgWHrVMC0cWnNghEExeBP3SaY6jYf4QqkLa69M'
  })
};

  constructor(private http: HttpClient,
              private Notify: SnotifyService,
              private router: Router) {
   }

   // Carga de Reservaciones Principal
   cargar_reservaciones(status: string , user_id: number) {
      const url = `${ this.url }users/reservaciones?per_page=100&user_id=${user_id}&status=${status}`;

      return this.http.post(url, this.status)
       .subscribe( (resp: any) => {
        setTimeout( () => {
          this.reservaciones = resp.data;
          this.reservaciones = this.reservaciones.filter(x => x.es_de_usuario !== null);
           // Paginacion
          this.collectionSize = this.reservaciones.length;
          // Paginacion
          this.loading = false;
        }, 1000);

       }, ( errorServicio) => {
        this.error = true;
        this.loading = false;
        this.mensajeError = errorServicio.message;
      });
   }

   // Guardar Reservaciones
   guardar_reserva(reserva: Reserva ) {
    const url = `${ this.url }reservaciones`;

    return this.http.post(url, reserva , this.httpOptions )
              .subscribe( (resp: any) => {
              this.alerta2 = true;
              this.error2 = false;
              this.reservaciones.push(resp.data);
              this.router.navigateByUrl('/reservaciones');
              this.Notify.info('Ya Reservaste un Alojamiento, Te esperamos!', 'Hecho', {
                timeout: 7500,
                showProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                icon: 'assets/logo/favicon.png'
              });

              }, ( errorServicio) => {
                this.error2 = true;
                this.mensajeError = errorServicio.error.error;
              });
  }

// Filtrar Reservaciones por nombre del cliente
   private filtrarReservas( termino: string ) {
    this.reservacionesFiltrado = [];
    this.termino = termino.toLocaleLowerCase();

   this.reservaciones.forEach( rese => {

    const nombrelower = rese.es_de_usuario.nombre.toLocaleLowerCase();
      if (rese.es_de_usuario.nombre.indexOf( this.termino ) >= 0 || nombrelower.indexOf( this.termino ) >= 0) {
        this.reservacionesFiltrado.push( rese );
      }
    });
    this.reservaciones = this.reservacionesFiltrado;
      // Paginacion
    this.collectionSize = this.reservacionesFiltrado.length;
      // Paginacion
  }

  // Cargar Reservaciones Modo Busqueda
  cargar_reservaciones2(status: string , user_id: number) {
    const url = `${ this.url }users/reservaciones?per_page=100&user_id=${user_id}&status=${status}`;

    return this.http.post(url, this.status);

 }
// Busqueda de Reservaciones
  buscarReserva( termino: string ) {

    this.cargar_reservaciones2( 'vacio' , 0)
    .subscribe( (resp: any) => {

        this.reservaciones = resp.data;
        this.reservaciones = this.reservaciones.filter(x => x.es_de_usuario !== null);
         // Paginacion
        this.collectionSize = this.reservaciones.length;
        // Paginacion
        this.loading = false;

        if (termino.length > 0) {
          this.filtrarReservas( termino );
        }
     }, ( errorServicio) => {
      this.error = true;
      this.loading = false;
      this.mensajeError = errorServicio.message;
    });

  }

  // Eliminar Reservaciones
  eliminar_reservaciones(id: number) {
    const url = `${ this.url }reservaciones/${id}`;
    return this.http.delete( url )
                    .pipe(map(res => res));
}
  eliminar_reserva(id: number, k: number) {

        this.eliminar_reservaciones( id )
            .subscribe( respuesta => {
              console.log(respuesta);
                          if ( respuesta ) {
                            delete this.reservaciones[k];
                            delete this.reservacionesFiltrado[k];
                            this.alerta_eliminar = true;

                            // Paginacion
                             this.collectionSize = this.reservaciones.length;
                             // Paginacion

                          }
                      });
}

}
