import { Component, OnInit } from '@angular/core';
import { DatosCapturadosService } from '../services/datos-capturados-service.service';
import { Router } from '@angular/router';
import { AngularFireList } from '@angular/fire/database';
import { Datos } from '../models/datos.model';
import { stringify } from 'querystring';

@Component({
  selector: 'app-datoscapturados',
  templateUrl: './datoscapturados.component.html',
  styleUrls: ['./datoscapturados.component.css']
})
export class DatoscapturadosComponent implements OnInit {
  public datosList: Datos[];

  constructor(private service: DatosCapturadosService, private router: Router) {

  }

  ngOnInit(): void {
    this.datosList = [];
    let s = this.service.getDatosCapturados();
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
