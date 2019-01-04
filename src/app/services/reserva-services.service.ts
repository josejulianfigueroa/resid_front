import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Reservacion } from '../interfaces/reservacion.interface';
import { Reserva } from '../interfaces/reserva_sola.interface';

import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class ReservaServicesService {

 url = 'http://127.0.0.1:8000/api/';
 status = 'Por Confirmar';
 loading = true;
 alerta2 = false;
 reservaciones: Reservacion[] = [];
 reservacionesFiltrado: Reservacion[] = [];
 termino;
 mensajeError = '';
 error = false;
 error2 = false;

httpOptions = {
  headers: new HttpHeaders({
   'Content-Type':  'application/json',
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjdmZDJmNGYwZDAwZTgzYjFmN2Q5ZWE0Y2U4YjdiMTcwZmE3NmQxZGYxMGQ2OGUzNGY2MWZmYzZkMmI3NDAwNWU3NzM2NWM2NzI5Njc3ODg2In0.eyJhdWQiOiI0IiwianRpIjoiN2ZkMmY0ZjBkMDBlODNiMWY3ZDllYTRjZThiN2IxNzBmYTc2ZDFkZjEwZDY4ZTM0ZjYxZmZjNmQyYjc0MDA1ZTc3MzY1YzY3Mjk2Nzc4ODYiLCJpYXQiOjE1Mzk5ODEwNTUsIm5iZiI6MTUzOTk4MTA1NSwiZXhwIjoxNTM5OTgyODU1LCJzdWIiOiI0Iiwic2NvcGVzIjpbXX0.Ns6nRo0odaqGNj8dsC7uWT0PJhD0l1pzxcyM1KhjJhEstlOE3MoiyDXee7hqyajo3KE7wi3RiPzjfouYgDdM114Jov3gPgJ9aQixakVqC5GbnETBd3sOji7EeWFrcSSoY3zOjB_pker_zrFwQkHYig5TcVX_CsScIsiSnN57LfsYgR0iwV4HJPfqtfq8nMJyS29pIPnazJTFDgmjOEq5Xov7gf-XK_t78zKE0WJ03JxyxojfoG-LxSuqinGPYCP9SDTBaX2Q-_qwFEud7EejdYJf9Opsp0-bMJAcwmLG-556Kt4zTjOhtkh1tHF6kqHM1OPXklUsjzDFcSTc4GsZ3tG-MdfkT6Cpw0u-9ruu2c8AxQRqp-6pcQNb96AJffwNHbFjF9nspuIsbM24pc00wJ05EPsZwjl8aOXWQeIF5dQBCwB3hTQG1W7xvXobCWVluIuiPPcA3xQHiSyxNiK6-LIMw03rr49TNSzUeGsFW-sf4H13C6ShWuKYTJpR8IfmXcTaeh1BOzuJ5q07tdpc4x4h_36diKks5xj5UiPpT6OF0-Nng8y_nMeDyrudBhHo6pCt1DFql6sI25qhTWGpG9ynGq_KT5eZVKKLfpsJ6YZq9EfeAE1VVKEeLfFERJlUwqNYqGgWHrVMC0cWnNghEExeBP3SaY6jYf4QqkLa69M'
  })
};

  constructor(private http: HttpClient) {
        this.cargar_hospedajes();
        this.cargar_reservaciones()
        .subscribe( (resp: any) => {
          setTimeout( () => {
            this.reservaciones = resp.data;
            this.loading = false;
          }, 2000);

         }, ( errorServicio) => {
          this.error = true;
          this.loading = false;
          console.log(errorServicio.message);
          this.mensajeError = errorServicio.message;
        });
   }

   // Inicio Metodos para la Base de Datos
   eliminar_reservaciones(id: number) {
        const url = `${ this.url }reservaciones/${id}`;

        return this.http.delete( url )
                        .pipe(map(res => res));
   }

   cargar_hospedajes() {

        const url = `${ this.url }hospedajes`;

        return this.http.get( url );
  }

   cargar_reservaciones() {
/*
      const headers = new HttpHeaders ({
        'Authorization': 'Bearer BQBILzfnOzW82FK9Xh7lbrOqvRJn8HkY3qDaiUo9zht_LatzQk-ePuXCQp3rZcFYKEZMia8DPqI_kLQUMYE'
      });*/

   // return this.http.get(`${ this.url }`);
      const url = `${ this.url }users/reservaciones`;
      return this.http.post(url, this.status);

   }
   guardar_reserva(reserva: Reserva ) {
    const url = `${ this.url }reservaciones`;

    return this.http.post(url, reserva , this.httpOptions )
              .subscribe( (resp: any) => {
               // console.log(resp);
              this.alerta2 = true;
              this.reservaciones.push(resp.data);

              }, ( errorServicio) => {
               // console.log(errorServicio);
                this.error2 = true;
                // this.mensajeError = errorServicio.message;
                this.mensajeError = errorServicio.error.error;
              });
  }

  // Fin Metodos para la Base de Datos






  // Inicio Metodos para los Componentes
   private filtrarReservas( termino: string ) {
    this.reservacionesFiltrado = [];
    this.termino = termino.toLocaleLowerCase();

   this.reservaciones.forEach( rese => {

    const nombrelower = rese.es_de_usuario.nombre.toLocaleLowerCase();
      if (rese.es_de_usuario.nombre.indexOf( this.termino ) >= 0 || nombrelower.indexOf( this.termino ) >= 0) {
        this.reservacionesFiltrado.push( rese );
      }
    });
  }

  buscarReserva ( termino: string ) {
    if (this.reservaciones.length === 0) {
        this.cargar_reservaciones()
            .subscribe( (resp: any) => {
              this.reservaciones = resp.data;
             });
        this.filtrarReservas( termino );
      } else {
        this.filtrarReservas( termino );
      }
  }

  eliminar_reserva(id: number, k: number) {

        this.eliminar_reservaciones( id )
            .subscribe( respuesta => {
                        console.log(respuesta);
                          if ( respuesta ) {
                            delete this.reservaciones[k];
                            delete this.reservacionesFiltrado[k];
                              // console.error(respuesta);
                          }
                      });
}




  // Fin Metodos para los Componentes
}
