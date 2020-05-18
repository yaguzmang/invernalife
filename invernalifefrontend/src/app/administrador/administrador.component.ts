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
    'planta': {
      'horario_luz': '',
      'horario_ventilador': ''
    },
    'regadora': {
      'horario_regadora': ''
    }
  };

  constructor(private service: AdministradorServiceService, private router: Router) { 
    let s = this.service.getHorarios();
    s.snapshotChanges()
    .subscribe(data => {
      const datos = data[0].payload.toJSON();
      const nPlantas = datos['numero_plantas'];
      for (let i = 1; i <= nPlantas; i++) {
        this.plantas[i - 1] = i;
      }
    });
  }

  public numeroNotificaciones: number = 0;

  plantas = [];
  opcionSeleccionada = 0;
  plantaSelect = 0;
  mostrar = false;
  space = '';

  ngOnInit(): void {
    // this.getHorarios();
  }

  capturar() {
    this.plantaSelect = this.opcionSeleccionada;
    if (this.plantaSelect === 0) {
      this.mostrar = false;
    } else {
      this.mostrar = true;
    }
    if (this.plantaSelect !== 0) {
      // this.getHorarios(this.plantaSelect);
    }
  }

  getHorarios(plantaSelect: number) {
    let s = this.service.getHorarios();
    s.snapshotChanges()
    .subscribe(data => {
      const horarios = data[0].payload.toJSON();
      const planta = horarios['planta' + plantaSelect];
      const rg = horarios['regadora'];

      this.dataHorarios['planta']['HORARIO-LUZ'] = planta['HORARIO-LUZ'];
      this.dataHorarios['planta']['HORARIO-VENTILADOR'] = planta['HORARIO-VENTILADOR'];
      this.dataHorarios['regadora']['HORARIO-REGADORA'] = rg['HORARIO-REGADORA'];
    });
  }

  actualizarHorarios(frm: NgForm) {
    console.log(frm.value);
    console.log(this.dataHorarios);

    let hlp_1: string = frm.value['hlp1_1'];
    let hlp_2: string = frm.value['hlp1_2'];

    if (hlp_1 !== '' && hlp_2 !== '') {
      if (hlp_1.length < 6) {
        hlp_1 += ':00';
      }
      if (hlp_2.length < 6) {
        hlp_2 += ':00';
      }
      this.dataHorarios['planta']['horario_luz'] = hlp_1 + '-' + hlp_2;
    }

    let hvp_1: string = frm.value['hvp1_1'];
    let hvp_2: string = frm.value['hvp1_2'];

    if (hvp_1 !== '' && hvp_2 !== '') {
      if (hvp_1.length < 6) {
        hvp_1 += ':00';
      }
      if (hvp_2.length < 6) {
        hvp_2 += ':00';
      }
      this.dataHorarios['planta']['horario_ventilador'] = hvp_1 + '-' + hvp_2;
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
      this.dataHorarios['regadora']['horario_regadora'] = hrg_1 + '-' + hrg_2;
    }

    this.service.setData(this.dataHorarios, this.plantaSelect);
  }

}
