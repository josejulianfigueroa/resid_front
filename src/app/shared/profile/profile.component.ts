import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// Servicios
import { AuthServiceService } from '../../services/auth-service.service';
import { UsuariosServicesService } from '../../services/usuarios-services.service';

// Formulario
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Notificacion
import {  SnotifyService } from 'ng-snotify';

// Interfaces
import { Sesion } from 'src/app/interfaces/sesion.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  url;
  mostrar = false;
  image;
  selectedFile: File = null;

  public loggedIn: boolean;

  public sesiona: Sesion = {
    token : '',
    expires_in : '',
    nombre : '',
    rol : '',
    id : 0,
    apellido: '',
    direccion: '',
    telefono: '',
    imagen: '',
    email: ''
  };

  forma: FormGroup;

  public form = {
    nombre: null,
    apellido: null,
    direccion: null,
    telefono: null
  };

  public error = null;

  constructor(private Auth: AuthServiceService,
              private Notify: SnotifyService,
              public _usuarioService: UsuariosServicesService) { }

 onSubmit() {
             this.Notify.info('Enviando datos...' , {timeout: 2000});
           this.form.nombre =  this.forma.controls['nombre'].value;
           this.form.apellido =  this.forma.controls['apellido'].value;
           this.form.direccion =  this.forma.controls['direccion'].value;
           this.form.telefono =  this.forma.controls['telefono'].value;

           this._usuarioService.editar_usuario(this.form,  this.sesiona.id).subscribe(
             data => this.handleResponse(data),
             error => this.handleError(error)
           );
  }

  handleResponse(data) {
    this.Notify.info('Listo!, Tus Datos de contácto han sido guardados', 'Actualizado', {
      timeout: 7500,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      icon: 'assets/logo/favicon.png'
    });

  localStorage.setItem('nombre', this.form.nombre);
  localStorage.setItem('apellido', this.form.apellido);
  localStorage.setItem('direccion', this.form.direccion);
  localStorage.setItem('telefono', this.form.telefono);

}
  handleError(error) {
    this.error = error.error.error;
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

    cambiarImagen( forma: NgForm) {

      const uploadData = new FormData();

      if (this.selectedFile === null) {} else {
       uploadData.append('imagen', this.selectedFile, this.selectedFile.name);
      }

     this._usuarioService.actualizar_imagen_usuario( this.sesiona.id, uploadData);

   }



  ngOnInit() {

    // Capturando la Sesion del Usuario
    this.Auth.authStatus.subscribe(value => this.loggedIn = value);

    if (this.loggedIn === true) {
      this.sesiona.nombre = localStorage.getItem('nombre');
      this.sesiona.rol = localStorage.getItem('rol');
      this.sesiona.id = Number(localStorage.getItem('id'));
      this.sesiona.expires_in = localStorage.getItem('expires_in');
      this.sesiona.email = localStorage.getItem('email');
      this.sesiona.apellido = localStorage.getItem('apellido');
      this.sesiona.direccion = localStorage.getItem('direccion');
      this.sesiona.telefono = localStorage.getItem('telefono');
      this.sesiona.imagen = localStorage.getItem('imagen');

      if (this.sesiona.imagen === 'undefined' || this.sesiona.imagen === 'null') {
        this.sesiona.imagen = null;
      }

      if (this.sesiona.imagen === null) {
      this._usuarioService.Obs_imagen_usuario
          .subscribe(value => this.sesiona.imagen = value);
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

    this.forma = new FormGroup({
      correo: new FormControl( this.sesiona.email),
      nombre: new FormControl( this.sesiona.nombre , [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*') ]),
      apellido: new FormControl( this.sesiona.apellido , [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*') ]),
      direccion: new FormControl( this.sesiona.direccion),
      telefono : new FormControl(this.sesiona.telefono, [Validators.required, Validators.minLength(7),
                                , Validators.maxLength(11), Validators.pattern('^[0-9]{0,9}')]),
       });

  }

}
