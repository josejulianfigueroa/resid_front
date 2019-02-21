import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Hospedaje } from '../interfaces/hospedajes.interface';
import { map } from 'rxjs/operators';

// Configuracion
import { URL_SERVICIOS } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class HospedajeServicesService {

  url = URL_SERVICIOS;
  loading = true;
  loading2 = false;
  alerta = null;
  error = null;
  next_page = '0';
  arre;

  hospedajes: Hospedaje[] = [];
  hospedajesFiltrado: Hospedaje[] = [];

  termino;
  mensajeError = '';

  // 'Content-Type':  'multipart/form-data; boundary=something',
 httpOptions = {
   headers: new HttpHeaders({
    'Content-Type':  'application/json',
     'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjdmZDJmNGYwZDAwZTgzYjFmN2Q5ZWE0Y2U4YjdiMTcwZmE3NmQxZGYxMGQ2OGUzNGY2MWZmYzZkMmI3NDAwNWU3NzM2NWM2NzI5Njc3ODg2In0.eyJhdWQiOiI0IiwianRpIjoiN2ZkMmY0ZjBkMDBlODNiMWY3ZDllYTRjZThiN2IxNzBmYTc2ZDFkZjEwZDY4ZTM0ZjYxZmZjNmQyYjc0MDA1ZTc3MzY1YzY3Mjk2Nzc4ODYiLCJpYXQiOjE1Mzk5ODEwNTUsIm5iZiI6MTUzOTk4MTA1NSwiZXhwIjoxNTM5OTgyODU1LCJzdWIiOiI0Iiwic2NvcGVzIjpbXX0.Ns6nRo0odaqGNj8dsC7uWT0PJhD0l1pzxcyM1KhjJhEstlOE3MoiyDXee7hqyajo3KE7wi3RiPzjfouYgDdM114Jov3gPgJ9aQixakVqC5GbnETBd3sOji7EeWFrcSSoY3zOjB_pker_zrFwQkHYig5TcVX_CsScIsiSnN57LfsYgR0iwV4HJPfqtfq8nMJyS29pIPnazJTFDgmjOEq5Xov7gf-XK_t78zKE0WJ03JxyxojfoG-LxSuqinGPYCP9SDTBaX2Q-_qwFEud7EejdYJf9Opsp0-bMJAcwmLG-556Kt4zTjOhtkh1tHF6kqHM1OPXklUsjzDFcSTc4GsZ3tG-MdfkT6Cpw0u-9ruu2c8AxQRqp-6pcQNb96AJffwNHbFjF9nspuIsbM24pc00wJ05EPsZwjl8aOXWQeIF5dQBCwB3hTQG1W7xvXobCWVluIuiPPcA3xQHiSyxNiK6-LIMw03rr49TNSzUeGsFW-sf4H13C6ShWuKYTJpR8IfmXcTaeh1BOzuJ5q07tdpc4x4h_36diKks5xj5UiPpT6OF0-Nng8y_nMeDyrudBhHo6pCt1DFql6sI25qhTWGpG9ynGq_KT5eZVKKLfpsJ6YZq9EfeAE1VVKEeLfFERJlUwqNYqGgWHrVMC0cWnNghEExeBP3SaY6jYf4QqkLa69M'
   })
 };

  constructor(private http: HttpClient) {

   /* this.cargar_hospedajes()
    .subscribe( (resp: any) => {
      setTimeout( () => {
        this.hospedajes = resp.data;
        this.loading = false;

        if (resp.next_page_url === null) {
          this.next_page = null;
        } else {
        this.arre = resp.next_page_url.split('?');
        this.next_page = this.arre[1];
      }
      }, 2000);

     }, ( errorServicio) => {
      this.error = 'carga';
      this.loading = false;
      console.log(errorServicio.message);
      this.mensajeError = errorServicio.message;
    });
*/

  }
   // Inicio Metodos para la Base de Datos
   eliminar_hospedajes(id: number) {
    const url = `${ this.url }hospedajes/${id}`;
    return this.http.delete( url )
                    .pipe(map(res => res));
  }
  cargar_hospedajes() {
     const url = `${ this.url }hospedajes?per_page=1000`;
     return this.http.get( url );
       }

  cargar_hospedajes_fechas( parametros: string) {

        const url = `${ this.url }hospedaje_fecha?per_page=3&${ parametros }`;

        return this.http.get( url ).subscribe( (resp: any) => {
          setTimeout( () => {
            this.hospedajes = resp.data;
            this.loading = false;

            if (resp.next_page_url === null) {
              this.next_page = null;
            } else {

              if (resp.next_page_url !== undefined ) {
                this.arre = resp.next_page_url.split('?');
                this.next_page = this.arre[1];
              }
          }
          }, 2000);
         }, ( errorServicio) => {
          this.error = 'carga';
          this.loading = false;
          console.log(errorServicio.message);
          this.mensajeError = errorServicio.message;
        });
          }

  cargar_mas_hospedajes() {

    const url = `${ this.url }hospedajes?${ this.next_page }`;

    return this.http.get( url ).subscribe( (resp: any) => {
      setTimeout( () => {
        this.loading = false;

        if (resp.next_page_url === null) {
          this.next_page = null;
        } else {
          this.arre = resp.next_page_url.split('?');
          this.next_page = this.arre[1];
        }
       resp.data.forEach( rese => {

        this.hospedajes.push( rese );

          });
          /*
           this.hospedajes.push.apply( this.hospedajes, resp.data );*/
      }, 1000);

     }, ( errorServicio) => {
      this.error = 'carga';
      this.loading = false;
      this.mensajeError = errorServicio.message;
    });
          }

       guardar_hospedaje( uploadData: any ) {
        const url = `${ this.url }hospedajes`;

        return this.http.post(url, uploadData)
                  .subscribe( (resp: any) => {
                   this.alerta = 'guardar';

                   this.hospedajes.push(resp.data);

                  }, ( errorServicio) => {
                    this.error = 'guardar';
                    this.mensajeError = errorServicio.error.error;
                  });
      }

      // Fin Metodos para la Base de Datos


      // Inicio Metodos para los Componentes
       private filtrarHospedajes( termino: string ) {
        this.hospedajesFiltrado = [];
        this.termino = termino.toLocaleLowerCase();

       this.hospedajes.forEach( rese => {

        const nombrelower = rese.descripcion.toLocaleLowerCase();
          if (rese.descripcion.indexOf( this.termino ) >= 0 || nombrelower.indexOf( this.termino ) >= 0) {
            this.hospedajesFiltrado.push( rese );
          }
        });
      }

      buscarhospedaje ( termino: string ) {
        if (this.hospedajes.length === 0) {
            this.cargar_hospedajes()
                .subscribe( (resp: any) => {
                  this.hospedajes = resp.data;
                 });
            this.filtrarHospedajes( termino );
          } else {
            this.filtrarHospedajes( termino );
          }
      }

      eliminar_hospedaje(id: number, k: number) {

            this.eliminar_hospedajes( id )
                .subscribe( respuesta => {
                              if ( respuesta ) {
                                this.alerta = 'eliminar';
                                delete this.hospedajes[k];
                                delete this.hospedajesFiltrado[k];
                              }
                          }, ( errorServicio) => {
                            this.error = 'eliminar' ;
                            this.loading = false;
                            this.mensajeError = errorServicio.error.error;
                          });
    }

    actualizar_hospedaje(id: any, uploadData: any , k: number) {
      const url = `${ this.url }hospedajes/${ id }`;

      return this.http.post(url, uploadData)
                .subscribe( (resp: any) => {
                  this.alerta = 'actualizar';
                  delete this.hospedajes[k];
                   delete this.hospedajesFiltrado[k];
                   this.hospedajes.push(resp.data);

                }, ( errorServicio) => {
                 // console.log(errorServicio);
                  this.error = 'actualizar';
                  // this.mensajeError = errorServicio.message;
                  this.mensajeError = errorServicio.error.error;
                });
    }
}
