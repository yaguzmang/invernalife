import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'invernalifefrontend';
  user: firebase.User;

  loginTxt = '';
  registration = '';
  administrador = '';
  centroControl = '';
  datosCapturados = '';
  reportes = '';

  constructor(private auth: AuthServiceService, private router: Router) {
      this.auth.getUserState()
        .subscribe( user => {
          this.user = user;
      });
  }

  login() {
    this.registration = '';
    this.loginTxt = 'active';
    this.router.navigate(['login']);
  }

  register() {
    this.registration = 'active';
    this.loginTxt = '';
    this.router.navigate(['registration']);
  }

  logout() {
    this.auth.logout()
    .then(() => {
      this.router.navigate(['']);
    });
  }

  gotoAdministrador() {
    this.administrador = 'active';
    this.centroControl = '';
    this.datosCapturados = '';
    this.reportes = '';
    this.router.navigate(['administrador']);
  }

  gotoCentroControl() {
    this.administrador = '';
    this.centroControl = 'active';
    this.datosCapturados = '';
    this.reportes = '';
    this.router.navigate(['centrocontrol']);
  }

  gotoDatosCapturados() {
    this.administrador = '';
    this.centroControl = '';
    this.datosCapturados = 'active';
    this.reportes = '';
    this.router.navigate(['datoscapturados']);
  }

  gotoReportes() {
    this.administrador = '';
    this.centroControl = '';
    this.datosCapturados = '';
    this.reportes = 'active';
    this.router.navigate(['reportes']);
  }
}
