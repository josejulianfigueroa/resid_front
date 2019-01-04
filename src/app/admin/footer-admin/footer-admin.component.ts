import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-admin',
  templateUrl: './footer-admin.component.html',
  styleUrls: ['./footer-admin.component.css']
})
export class FooterAdminComponent {

  annio: number = new Date().getFullYear();
  email: string = 'josejulianfigueroa@gmail.com';

  constructor() { }


}
