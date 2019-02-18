import { BrowserModule } from '@angular/platform-browser';

import { LOCALE_ID, NgModule } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';

registerLocaleData(localeEsAr, 'es-Ar');

import { NgSelectModule } from '@ng-select/ng-select';

// Componentes para el Bootstrap y Home
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateMomentParserFormatter } from './config/ngb-date-custom-parser-formatter';
import { HomeComponent } from './shared/home/home.component';

// Componentes Shared
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

// Componentes Principales
import { HospedajeComponent } from './hospedaje/hospedaje.component';
import { ReservacionesComponent, NgbdSortableHeaderDirective } from './reservaciones/reservaciones.component';

// Componenentes del Administrador
import { ReservarComponent } from './shared/reservar/reservar.component';
import { SearchReservaComponent } from './admin/search-reserva/search-reserva.component';

// Rutas
import { APP_ROUTING } from './app-routing.routes';

// Modulo HttpClient
import { HttpClientModule } from '@angular/common/http';
import { TransPipe } from './pipes/trans.pipe';

// Formlarios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Servicios
import { ReservaServicesService } from './services/reserva-services.service';
import { PagosServicesService } from './services/pagos-services.service';
import { HospedajeServicesService } from './services/hospedaje-services.service';
import { UsuariosServicesService } from './services/usuarios-services.service';
import { DomseguroPipe } from './pipes/domseguro.pipe';
import { NoimagePipe } from './pipes/noimage.pipe';

import { LoginComponent } from './shared/login/login.component';
import { RequestResetComponent } from './shared/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './shared/password/response-reset/response-reset.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { SignupComponent } from './shared/signup/signup.component';

import { JarwisServiceService } from './services/jarwis-service.service';
import { TokenServiceService } from './services/token-service.service';
import { AuthServiceService } from './services/auth-service.service';
import { AfterLoginServiceService } from './services/after-login-service.service';
import { BeforeLoginServiceService } from './services/before-login-service.service';

import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';


import {MatNativeDateModule} from '@angular/material';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoMaterialModule} from './material-module';
import 'hammerjs';




@NgModule({
  declarations: [
    NgbdSortableHeaderDirective,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TransPipe,
    ReservarComponent,
    SearchReservaComponent,
    HospedajeComponent,
    DomseguroPipe,
    NoimagePipe,
    LoginComponent,
    RequestResetComponent,
    ResponseResetComponent,
    ProfileComponent,
    SignupComponent,
    HomeComponent,
    ReservacionesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    APP_ROUTING,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbModule,
    SnotifyModule,
    DemoMaterialModule,
    MatNativeDateModule
  ],
  providers: [
    ReservaServicesService,
    PagosServicesService,
    HospedajeServicesService,
    JarwisServiceService,
    TokenServiceService,
    AuthServiceService,
    AfterLoginServiceService,
    BeforeLoginServiceService,
    UsuariosServicesService,

    { provide: LOCALE_ID, useValue: 'es-Ar' },
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    {
      provide: NgbDateParserFormatter,
      useFactory: () => new NgbDateMomentParserFormatter('DD-MM-YYYY')
    },
    SnotifyService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
