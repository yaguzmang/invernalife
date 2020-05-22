import { Component, OnInit } from '@angular/core';
import { DatosCapturadosService } from '../services/datos-capturados-service.service';
import { Router } from '@angular/router';
import { Datos } from '../models/datos.model';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-datoscapturados',
  templateUrl: './datoscapturados.component.html',
  styleUrls: ['./datoscapturados.component.css']
})
export class DatoscapturadosComponent implements OnInit {
  public datosList: Datos[];
  user: Observable<firebase.User>;
  userID: firebase.User = null;

  constructor(private service: DatosCapturadosService, private router: Router, private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
    this.user.subscribe((user) => {
      if (user) {
        this.userID = user;
      } else {
        this.userID = null;
      }
    });
  }

  ngOnInit(): void {
    this.datosList = [];
    let s = this.service.getDatosCapturados(this.userID);
    s.snapshotChanges()
    .subscribe(data => {
      const datos = data[1].payload.toJSON();
      const nDatos = datos['numero_datos']['numero_datos'];

      for (let i = 0; i < nDatos; i++) {
        const dato = datos['dato' + i];
        const ig = dato['invernadero'];
        const m1 = dato['maceta1'];
        const m2 = dato['maceta2'];
        const fecha = dato['fecha_dato'];

        let newDato = new Datos(fecha['fecha'], ig['co2'], ig['humedad_ambiente'], ig['ph'], ig['temperatura'],
        m1['humedad_suelo'], m2['humedad_suelo']);

        this.datosList.push(newDato);
      }
    });
    console.log(this.datosList);
  }

}
