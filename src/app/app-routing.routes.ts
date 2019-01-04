// tslint:disable-next-line:eofline
import { NgModule, Component } from '@angular/core';

// Necesario para las Rutas
import { Routes, RouterModule } from '@angular/router';

// Componenetes Varios
 import { AdminComponent } from './admin/admin/admin.component';
 import { ReservarComponent } from './shared/reservar/reservar.component';
 import { HospedajesComponent } from './admin/hospedajes/hospedajes.component';
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
      { path: 'home', component: AdminComponent },
      { path: 'reservar', component: ReservarComponent },
      { path: 'hospedajes', component: HospedajesComponent },
      { path: 'reservaciones', component: AdminComponent },
      { path: 'pagos', component: AdminComponent },
      { path: 'usuarios', component: AdminComponent },
      { path: 'search/:termino', component: SearchReservaComponent },

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

    //  { path: '**', pathMatch: 'full', redirectTo: 'home' }
    ];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true} );
