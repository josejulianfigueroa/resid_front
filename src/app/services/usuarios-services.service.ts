import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Notificacion
import {  SnotifyService } from 'ng-snotify';

// Interfaces
import { Reservacion } from '../interfaces/reservacion.interface';
import { Usuario } from '../interfaces/usuario.interface';
import { BehaviorSubject } from 'rxjs';

// Configuracion
import { URL_SERVICIOS } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class UsuariosServicesService {

  private imagen_usuario = new BehaviorSubject<string>(null);
  Obs_imagen_usuario = this.imagen_usuario.asObservable();

  url = URL_SERVICIOS;
  status = 'Por Confirmar';
  loading = true;

  reservaciones: Reservacion[] = [];
  reservacionesFiltrado: Reservacion[] = [];

  usuario: Usuario[] = [];
  termino;
  mensajeError = '';
  error = false;
  error_imagen = false;
  mensaje_imagen_error = '';


   httpOptions2 = {
   headers: new HttpHeaders({
     'Content-Type':  'application/json',
     'Authorization': 'my-auth-token'
   })
 };

   constructor(private http: HttpClient,
              private Notify: SnotifyService) {
    }
   cargar_usuarios() {
        const url = `${ this.url }users?per_page=100000`;
        return this.http.get( url );
   }

   editar_usuario(data: any, id: number) {
    return this.http.put(`${this.url}users/${id}`, data);
  }

  actualizar_imagen_usuario(id: any, uploadData: any) {
    const url = `${ this.url }users/${ id }`;

    return this.http.post(url, uploadData)
        .subscribe( (resp: any) => {

        localStorage.setItem('imagen', resp.data.imagen);

        this.imagen_usuario.next(resp.data.imagen);

        this.Notify.info('Listo!, Tu foto ha sido actualizada', 'Actualizado', {
        timeout: 7500,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        icon: 'assets/logo/favicon.png'
      });

  }, ( errorServicio) => {
    this.mensaje_imagen_error = errorServicio.error.error;
  });

  }

 }
