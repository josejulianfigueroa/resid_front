import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

// Interfaces
import { Reservacion } from '../interfaces/reservacion.interface';
import { Usuario } from '../interfaces/usuario.interface';


@Injectable({
  providedIn: 'root'
})
export class UsuariosServicesService {

  url = 'http://127.0.0.1:8000/api/';
  status = 'Por Confirmar';
  loading = true;

  reservaciones: Reservacion[] = [];
  reservacionesFiltrado: Reservacion[] = [];

  usuario: Usuario[] = [];
  termino;
  mensajeError = '';
  error = false;

   httpOptions2 = {
   headers: new HttpHeaders({
     'Content-Type':  'application/json',
     'Authorization': 'my-auth-token'
   })
 };

   constructor(private http: HttpClient) {
         this.cargar_usuarios();

    }

    // Inicio Metodos para la Base de Datos
    eliminar_reservaciones(id: number) {
         const url = `${ this.url }reservaciones/${id}`;

        return this.http.delete( url )
                         .pipe(map(res => res));
    }

   cargar_usuarios() {

         const url = `${ this.url }users?per_page=100000`;

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
