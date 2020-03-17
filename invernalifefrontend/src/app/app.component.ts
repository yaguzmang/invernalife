import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'invernalifefrontend';

  constructor(private router: Router) {}

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
