import { Component, OnInit } from '@angular/core';
import { DatosCapturadosService } from '../services/datos-capturados-service.service';
import { Router } from '@angular/router';
import {  AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-datoscapturados',
  templateUrl: './datoscapturados.component.html',
  styleUrls: ['./datoscapturados.component.css']
})
export class DatoscapturadosComponent implements OnInit {
  public datosList: AngularFireList<any>;


  constructor(private service: DatosCapturadosService, private router: Router) {

  }

  ngOnInit(): void {
    let s = this.service.getDatosCapturados();
    s.snapshotChanges()
    .subscribe(data => {
      data.forEach(item => {
        let a = item.payload.toJSON();
        let b = a['invernadero_general'];
        console.log(a);
      });
    });
  }

}
