import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Formulario
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Servicios
import { JarwisServiceService } from '../../services/jarwis-service.service';
import { TokenServiceService } from '../../services/token-service.service';
import { AuthServiceService } from '../../services/auth-service.service';

// Notificacion
import {  SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  forma: FormGroup;

  public form = {
    nombre: null,
    email: null,
    password: null
  };
  
  public error = null;

  constructor(
    private Jarwis: JarwisServiceService,
    private Token: TokenServiceService,
    private router: Router,
    private Auth: AuthServiceService,
    private Notify: SnotifyService
  ) { }


  onSubmit() {
    if ( this.forma.invalid ) {
      return;
    }

   // if ( !this.forma.value.condiciones ) {
     // swal('Importante', 'Debe de aceptar las condiciones', 'warning');
   //   return;
    // }
    this.form.nombre = this.forma.controls['nombre'].value;
    this.form.email =  this.forma.controls['correo'].value;
    this.form.password =  this.forma.controls['password'].value;


    this.Jarwis.signup(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {

    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);

    localStorage.setItem('nombre', data.nombre);
    localStorage.setItem('rol', data.rol);
    localStorage.setItem('id', data.id);
    localStorage.setItem('expires_in', data.expires_in);

    this.Notify.info('Listo!, Ahora puedes continuar', 'Ya Iniciaste', {
      timeout: 7500,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      icon: 'assets/logo/favicon.png'
    });

    this.router.navigateByUrl('/home');
  }

  handleError(error) {
    this.error = error.error.error;
  }


  sonIguales( campo1: string, campo2: string ) {

    return ( group: FormGroup ) => {

      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return null;
      }

      return {
        sonIguales: true
      };

    };

  }


  ngOnInit() {

    this.forma = new FormGroup({
      nombre: new FormControl( null , [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*') ]),
      correo: new FormControl( null , [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl( null , [Validators.required, Validators.minLength(4), Validators.maxLength(6)]),
      password2: new FormControl( )
      // ,condiciones: new FormControl( false )
    }, { validators: this.sonIguales( 'password', 'password2' )  } );

    this.forma.setValue({
      nombre: '',
      correo: '',
      password: '',
      password2: ''
      // ,condiciones: true
    });

  }

}
