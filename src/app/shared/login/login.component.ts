import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Servicios
import { JarwisServiceService } from '../../services/jarwis-service.service';
import { TokenServiceService } from '../../services/token-service.service';
import { AuthServiceService } from '../../services/auth-service.service';

// Notificacion
import {  SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
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
  ) {

   }

  onSubmit() {

    this.Jarwis.login(this.form).subscribe(
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

  ngOnInit() {
  }

}
