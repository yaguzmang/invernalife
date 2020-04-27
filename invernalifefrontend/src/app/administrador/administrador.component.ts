import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdministradorServiceService } from '../services/administrador-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  

  dataHorarios = {
    'planta 1': {
      'HORARIO-LUZ': '',
      'HORARIO-VENTILADOR': ''
    },
    'planta 2': {
      'HORARIO-LUZ': '',
      'HORARIO-VENTILADOR': ''
    },
    'regadora': {
      'HORARIO-REGADORA': ''
    }
  };
  
  constructor(private service: AdministradorServiceService, private router: Router) { }

  numeroNotificaciones: Number = 0;

  ngOnInit(): void {
    this.getHorarios();
  }

  getHorarios() {
    let s = this.service.getHorarios();
    s.snapshotChanges()
    .subscribe(data => {
      data.forEach(item => {
        let a = item.payload.toJSON();
        let p1 = a['planta 1'];
        let p2 = a['planta 2'];
        let rg = a['regadora'];

        this.dataHorarios['planta 1']['HORARIO-LUZ'] = p1['HORARIO-LUZ'];
        this.dataHorarios['planta 1']['HORARIO-VENTILADOR'] = p1['HORARIO-VENTILADOR'];
        this.dataHorarios['planta 2']['HORARIO-LUZ'] = p2['HORARIO-LUZ'];
        this.dataHorarios['planta 2']['HORARIO-VENTILADOR'] = p2['HORARIO-VENTILADOR'];
        this.dataHorarios['regadora']['HORARIO-REGADORA'] = rg['HORARIO-REGADORA'];

      });
    });
  }

  actualizarHorarios(frm: NgForm) {
    console.log(frm.value);
    console.log(this.dataHorarios);

    let hlp1_1: string = frm.value['hlp1_1'];
    let hlp1_2: string = frm.value['hlp1_2'];

    if (hlp1_1 !== '' && hlp1_2 !== '') {
      if (hlp1_1.length < 6) {
        hlp1_1 += ':00';
      }
      if (hlp1_2.length < 6) {
        hlp1_2 += ':00';
      }
      this.dataHorarios['planta 1']['HORARIO-LUZ'] = hlp1_1 + '-' + hlp1_2;
    }

    let hvp1_1: string = frm.value['hvp1_1'];
    let hvp1_2: string = frm.value['hvp1_2'];

    if (hvp1_1 !== '' && hvp1_2 !== '') {
      if (hvp1_1.length < 6) {
        hvp1_1 += ':00';
      }
      if (hvp1_2.length < 6) {
        hvp1_2 += ':00';
      }
      this.dataHorarios['planta 1']['HORARIO-VENTILADOR'] = hvp1_1 + '-' + hvp1_2;
    }

    let hlp2_1: string = frm.value['hlp2_1'];
    let hlp2_2: string = frm.value['hlp2_2'];

    if (hlp2_1 !== '' && hlp2_2 !== '') {
      if (hlp2_1.length < 6) {
        hlp2_1 += ':00';
      }
      if (hlp2_2.length < 6) {
        hlp2_2 += ':00';
      }
      this.dataHorarios['planta 2']['HORARIO-LUZ'] = hlp2_1 + '-' + hlp2_2;
    }

    let hvp2_1: string = frm.value['hvp2_1'];
    let hvp2_2: string = frm.value['hvp2_2'];

    if (hvp2_1 !== '' && hvp2_2 !== '') {
      if (hvp2_1.length < 6) {
        hvp2_1 += ':00';
      }
      if (hvp2_2.length < 6) {
        hvp2_2 += ':00';
      }
      this.dataHorarios['planta 2']['HORARIO-VENTILADOR'] = hvp2_1 + '-' + hvp2_2;
    }

    let hrg_1: string = frm.value['hrg_1'];
    let hrg_2: string = frm.value['hrg_2'];

    if (hrg_1 !== '' && hrg_2 !== '') {
      if (hrg_1.length < 6) {
        hrg_1 += ':00';
      }
      if (hrg_2.length < 6) {
        hrg_2 += ':00';
      }
      this.dataHorarios['regadora']['HORARIO-REGADORA'] = hrg_1 + '-' + hrg_2;
    }

    this.service.setData(this.dataHorarios);
  }

}
