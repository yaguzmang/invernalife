import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  hlp1 = '23:45:34';

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
  
  constructor() { }

  numeroNotificaciones: Number = 0;

  ngOnInit(): void {
  }

  actualizarHorarios(frm: NgForm) {
    console.log(frm.value);
  }

}
