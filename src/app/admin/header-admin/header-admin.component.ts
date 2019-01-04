import { Component, OnInit } from '@angular/core';
import { ReservaServicesService } from '../../services/reserva-services.service';
import { Router } from '@angular/router';


 import { AuthServiceService } from '../../services/auth-service.service';
 import { TokenServiceService } from '../../services/token-service.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {

  search = 'reserva';
  public loggedIn: boolean;


  constructor(private reserva_serive: ReservaServicesService,
              private router: Router,
              private Auth: AuthServiceService,
              private Token: TokenServiceService
            ) { }

  ngOnInit() {
    this.Auth.authStatus.subscribe(value => this.loggedIn = value);
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
  }

  buscarReserva( termino: string) {
   /* if (termino.length < 1) {
      return;
    }*/
    this.router.navigate(['/search', termino]);
  }
  buscarHospedaje( termino: string) {
    /* if (termino.length < 1) {
       return;
     }*/
     this.router.navigate(['/search', termino]);
   }
}
