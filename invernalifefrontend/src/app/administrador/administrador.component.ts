import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdministradorServiceService } from '../services/administrador-service.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  user: Observable<firebase.User>;
  userID: firebase.User = null;

  notificaciones: any[] = [];

  dataHorarios = {
    'maceta': {
      'horario_luz': '',
      'horario_ventilador': ''
    },
    'regadora': {
      'horario_regadora': ''
    }
  };

  macetas = [];
  opcionSeleccionada = 0;
  macetaSelect = 0;
  mostrar = false;
  space = '';

  public numeroNotificaciones: number = this.notificaciones.length;

  constructor(private service: AdministradorServiceService, private router: Router, private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
    this.user.subscribe((user) => {
      if (user) {
        this.userID = user;
        this.getNotificaciones();
      } else {
        this.userID = null;
      }

      let s = this.service.getHorarios(this.userID);
      s.snapshotChanges()
      .subscribe(data => {
        const datos = data[0].payload.toJSON();
        const nMacetas = datos['numero_macetas'];
        for (let i = 1; i <= nMacetas; i++) {
          this.macetas[i - 1] = i;
        }
      });
    });
  }

  ngOnInit(): void {
    this.getHorarios(this.macetaSelect);
  }

  capturar() {
    this.macetaSelect = this.opcionSeleccionada;
    if (this.macetaSelect === 0) {
      this.mostrar = false;
    } else {
      this.mostrar = true;
    }
    this.getHorarios(this.macetaSelect);
  }

  getNotificaciones() {
    if (this.userID) {
      let s = this.service.getHorarios(this.userID);
      s.snapshotChanges()
      .subscribe(data => {
        const datos = data[1].payload.toJSON();
        const nDatos = datos['numero_datos']['numero_datos'];

        for (let i = 0; i < nDatos; i++) {
          const dato = datos['dato' + i];
          const ig = dato['invernadero'];
          const fecha = dato['fecha_dato'];

          let datoinfo = '';
          let error = false;
          if (+ig['co2']  === 0) {
            datoinfo = 'CO2';
            error = true;
          } else if (+ig['humedad_ambiente'] === 0) {
            datoinfo = 'Humedad de ambiente';
            error = true;
          } else if (+ig['ph'] === 0) {
            datoinfo = 'PH';
            error = true;
          } else if (+ig['temperatura'] === 0) {
            datoinfo = 'Temperatura';
            error = true;
          }

          if (error === true) {
            this.notificaciones.push({
              titulo: 'Advertencia',
              small: 'Importante',
              p: `El dato ${datoinfo}, sensado en la fecha y hora \n ${fecha['fecha']}`,
              p2: 'posee un valor de 0',
              small2: 'Se recomienda revisar el sensor'
            });
            error = false;
            this.numeroNotificaciones = this.notificaciones.length;
          }
        }
      });
    }
  }

  getHorarios(macetaSelect: number) {
    if (macetaSelect !== 0) {
      let s = this.service.getHorarios(this.userID);
      s.snapshotChanges()
      .subscribe(data => {
        const horarios = data[0].payload.toJSON();
        const maceta = horarios['maceta' + macetaSelect];
        const rg = horarios['regadora'];

        this.dataHorarios['maceta']['horario_luz'] = maceta['horario_luz'];
        this.dataHorarios['maceta']['horario_ventilador'] = maceta['horario_ventilador'];
        this.dataHorarios['regadora']['horario_regadora'] = rg['horario_regadora'];
      });
    }
  }

  actualizarHorarios(frm: NgForm) {
    console.log(frm.value);
    console.log(this.dataHorarios);

    let hlp_1: string = frm.value['hlp1_1'];
    let hlp_2: string = frm.value['hlp1_2'];

    if (hlp_1 !== '' && hlp_2 !== '') {
      this.dataHorarios['maceta']['horario_luz'] = hlp_1 + '-' + hlp_2;
    }

    let hvp_1: string = frm.value['hvp1_1'];
    let hvp_2: string = frm.value['hvp1_2'];

    if (hvp_1 !== '' && hvp_2 !== '') {
      this.dataHorarios['maceta']['horario_ventilador'] = hvp_1 + '-' + hvp_2;
    }

    let hrg_1: string = frm.value['hrg_1'];
    let hrg_2: string = frm.value['hrg_2'];

    if (hrg_1 !== '' && hrg_2 !== '') {
      this.dataHorarios['regadora']['horario_regadora'] = hrg_1 + '-' + hrg_2;
    }

    if (this.macetaSelect !== 0) {
      this.service.setData(this.dataHorarios, this.macetaSelect);
    }
  }

  addMaceta() {
    this.service.añadirMaceta(this.macetas.length);
  }
}
