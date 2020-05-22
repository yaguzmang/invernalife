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

  public numeroNotificaciones: number = 0;

  constructor(private service: AdministradorServiceService, private router: Router) {
    let s = this.service.getHorarios();
    s.snapshotChanges()
    .subscribe(data => {
      const datos = data[0].payload.toJSON();
      const nMacetas = datos['numero_macetas'];
      for (let i = 1; i <= nMacetas; i++) {
        this.macetas[i - 1] = i;
      }
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

  getHorarios(macetaSelect: number) {
    if (macetaSelect !== 0) {
      let s = this.service.getHorarios();
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

}
