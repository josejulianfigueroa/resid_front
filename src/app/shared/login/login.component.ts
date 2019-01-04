import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JarwisServiceService } from '../../services/jarwis-service.service';
import { TokenServiceService } from '../../services/token-service.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
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
    this.Notify.success('Example body content');
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
    this.router.navigateByUrl('/reservaciones');
  }

  handleError(error) {
    this.error = error.error.error;
  }
  ngOnInit() {
  }

}
