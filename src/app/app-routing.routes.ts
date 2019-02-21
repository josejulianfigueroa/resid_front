// tslint:disable-next-line:eofline
import { NgModule, Component } from '@angular/core';

// Necesario para las Rutas
import { Routes, RouterModule } from '@angular/router';

// Componenetes Shared
import { HomeComponent } from './shared/home/home.component';

// Componentes Principales
import { HospedajeComponent } from './hospedaje/hospedaje.component';
import {ReservacionesComponent } from './reservaciones/reservaciones.component';

 import { ReservarComponent } from './shared/reservar/reservar.component';
 import { SearchReservaComponent } from './admin/search-reserva/search-reserva.component';

// Componenetes Login

import { LoginComponent } from './shared/login/login.component';
import { SignupComponent } from './shared/signup/signup.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { RequestResetComponent } from './shared/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './shared/password/response-reset/response-reset.component';
import { BeforeLoginServiceService } from './services/before-login-service.service';
import { AfterLoginServiceService } from './services/after-login-service.service';

const APP_ROUTES: Routes = [

      { path: 'home',
        component: HomeComponent
      },
      { path: 'reservar',
        component: ReservarComponent,
        canActivate: [AfterLoginServiceService]
      },
      {
        path: 'hospedaje/:termino',
        component: HospedajeComponent
      },
      {
        path: 'reservaciones',
        component: ReservacionesComponent,
        canActivate: [AfterLoginServiceService]
      },
      {
        path: 'search/:termino', component: SearchReservaComponent,
        canActivate: [BeforeLoginServiceService]
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [BeforeLoginServiceService]
      },
      {
        path: 'signup',
        component: SignupComponent,
        canActivate: [BeforeLoginServiceService]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AfterLoginServiceService]
      },
      {
        path: 'request-password-reset',
        component: RequestResetComponent,
        canActivate: [BeforeLoginServiceService]
      },
      {
        path: 'response-password-reset',
        component: ResponseResetComponent,
        canActivate: [BeforeLoginServiceService]
      },

      { path: '**', pathMatch: 'full', redirectTo: 'home' }
    ];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true} );
