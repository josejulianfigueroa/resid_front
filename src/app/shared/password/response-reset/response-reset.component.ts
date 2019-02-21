import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JarwisServiceService } from '../../../services/jarwis-service.service';
import {  SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  public error = null;

  public form = {
    email : '',
    password : '',
    password_confirmation: '',
    resetToken : '' };

  constructor(
    private route: ActivatedRoute,
    private Jarwis: JarwisServiceService,
    private router: Router,
    private Notify: SnotifyService
  ) {
    route.queryParams.subscribe(params => {
      this.form.resetToken = params['token'];
      this.form.email = params['email'];
    });

  }

  onSubmit() {
    this.Notify.info('Enviando...' , {timeout: 5000});
   this.Jarwis.changePassword(this.form).subscribe(
     data => this.handleResponse(data),
     error => this.handleError(error)
   );
  }
  handleResponse(data) {

this.form.email = null;
this.form.password = null;
    const _router = this.router;

    this.Notify.success('Password actualizado', 'Hecho!', {
      timeout: 4500,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      icon: 'assets/logo/favicon.png'
    });
    _router.navigateByUrl('/login');


    /*
    this.Notify.confirm('Hecho!, Ahora Inicia Sesión', {
      buttons: [
        {text: 'Ok',
        action: toster => {
           _router.navigateByUrl('/login'),
           this.Notify.remove(toster.id);
          }
      },
      ]
    });*/
  }

  handleError(error) {
    this.error = error.error.errors;
  }
  ngOnInit() {
  }

}
