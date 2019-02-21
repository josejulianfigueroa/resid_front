import { Component, OnInit } from '@angular/core';
import { JarwisServiceService } from '../../../services/jarwis-service.service';
  import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {
  public form = {
    email: null
  };

  public error = null;

  constructor(
    private Jarvis: JarwisServiceService,
   private Notify: SnotifyService
  ) { }

  ngOnInit() {
  }


  onSubmit() {
   this.Notify.info('Enviando...' , {timeout: 5000});
    this.Jarvis.sendPasswordResetLink(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.Notify.error(error.error.error)
    );
  }

  handleResponse(res) {
     this.Notify.success(res.data, { timeout: 0 });
    this.form.email = null;
  }
  handleError(error) {
    this.error = error.error.error;
  }
}
