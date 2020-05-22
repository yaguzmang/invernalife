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

  constructor(private auth: AuthServiceService, private router: Router) {
      this.auth.getUserState()
        .subscribe( user => {
          this.user = user;
      });
  }

  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.router.navigate(['registration']);
  }

  logout() {
    this.auth.logout()
    .then(() => {
      this.router.navigate(['']);
    });
  }

  gotoAdministrador() {
    this.router.navigate(['administrador']);
  }

  gotoCentroControl() {
    this.router.navigate(['centrocontrol']);
  }

  gotoDatosCapturados() {
    this.router.navigate(['datoscapturados']);
  }

  gotoReportes() {
    this.router.navigate(['reportes']);
  }
}
