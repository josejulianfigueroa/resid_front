import { Component, OnInit } from '@angular/core';
import { JarwisServiceService } from '../../services/jarwis-service.service';
import { TokenServiceService } from '../../services/token-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form = {
    nombre: null,
    email: null,
    password: null,
    // password_confirmation: null
  };
  public error = [];

  constructor(
    private Jarwis: JarwisServiceService,
    private Token: TokenServiceService,
    private router: Router
  ) { }

  onSubmit() {
    this.Jarwis.signup(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }
  handleResponse(data) {
    this.Token.handle(data.access_token);
    this.router.navigateByUrl('/profile');
  }

  handleError(error) {
    this.error = error.error.errors;
  }

  ngOnInit() {
  }

}
