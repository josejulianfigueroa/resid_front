import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Servicios
import { ReservaServicesService } from '../../services/reserva-services.service';
import { AuthServiceService } from '../../services/auth-service.service';
import { TokenServiceService } from '../../services/token-service.service';

 // Calendario
import {NgbDate, NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

// Interfaces
import { Sesion } from 'src/app/interfaces/sesion.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  search = 'reserva';
  public loggedIn: boolean;
  date_inicio: NgbDateStruct;
  date_fin: NgbDateStruct;
  termino;

  public sesiona: Sesion = {
    token : '',
    expires_in : '',
    nombre : '',
    rol : '',
    id : 0
  };

  constructor(private reserva_serive: ReservaServicesService,
              private router: Router,
              private Auth: AuthServiceService,
              calendar: NgbCalendar,
              private Token: TokenServiceService
            ) {

  // Fechas por Defecto para Busqueda de Hospedajes Inicio
    this.date_inicio = calendar.getToday();
    this.date_fin = calendar.getNext(calendar.getToday(), 'd', 15);

    const fechainicio = this.date_inicio.year + '-' + this.date_inicio.month + '-' + this.date_inicio.day;
    const fechasalida = this.date_fin.year + '-' + this.date_fin.month + '-' + this.date_fin.day;

    this.termino = 'fecha1=' + fechainicio + '&fecha2=' + fechasalida;
  // Fechas por Defecto para Busqueda de Hospedajes Fin
             }

  ngOnInit() {

    // Capturando la Sesion del Usuario
    this.Auth.authStatus.subscribe(value => this.loggedIn = value);

    if (this.loggedIn === true) {
      this.sesiona.nombre = localStorage.getItem('nombre');
      this.sesiona.rol = localStorage.getItem('rol');
      this.sesiona.id = Number(localStorage.getItem('id'));
      this.sesiona.expires_in = localStorage.getItem('expires_in');
    }
  }

  logout(event: MouseEvent) {

    event.preventDefault();
    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this.router.navigateByUrl('/home');

  }

}

