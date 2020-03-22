import { Component, OnInit } from '@angular/core';
import { DatosCapturadosService } from '../services/datos-capturados-service.service';
import { Router } from '@angular/router';
import { AngularFireList } from '@angular/fire/database';
import { Datos } from '../models/datos.model';

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
      data.forEach(item => {
        let a = item.payload.toJSON();
        let ig = a['invernadero_general'];
        let p1 = a['planta1_humedad_suelo'];
        let p2 = a['planta2_humedad_suelo'];
        let newDato = new Datos(item.key, ig['Co2'], ig['HUMEDAD AMBIENTE'],
        ig['PH'], ig['TEMPERATURA'], p1['HUMEDAD SUELO'], p2['HUMEDAD SUELO']);
        this.datosList.push(newDato);
      });
      console.log(this.datosList);
    });
  }

}
