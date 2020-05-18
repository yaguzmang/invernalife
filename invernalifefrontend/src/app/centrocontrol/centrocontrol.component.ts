import { Component, OnInit } from '@angular/core';
import { CentroControlServiceService } from '../services/centro-control-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-centrocontrol',
  templateUrl: './centrocontrol.component.html',
  styleUrls: ['./centrocontrol.component.css']
})
export class CentrocontrolComponent implements OnInit {

  btnRegador = '';
  btn1p = '';
  btn2p = '';
  btnLock = '';

  btnRegadorTxt = '';
  btn1pTxt = '';
  btn2pTxt = '';
  btnLockTxt = '';

  hlp = '';
  hvp = '';
  hrg = '';

  dataInstruction = {
    lock: 1,
    'planta': {
      LUZ: 1,
      VENTILADOR: 1
    },
    'regadora': {
      REGADORA: 1
    }
  };

  plantas = [];
  opcionSeleccionada = 0;
  plantaSelect = 0;
  mostrar = false;
  space = '';

  constructor(private service: CentroControlServiceService, private router: Router) { 
    let s = this.service.getInstrucciones();
    s.snapshotChanges()
    .subscribe(data => {
      const datos = data[0].payload.toJSON();
      const nPlantas = datos['numero_plantas'];
      for (let i = 1; i <= nPlantas; i++) {
        this.plantas[i - 1] = i;
      }
    });
  }

  ngOnInit(): void {
  }

  capturar() {
    this.plantaSelect = this.opcionSeleccionada;
    if (this.plantaSelect === 0) {
      this.mostrar = false;
    } else {
      this.mostrar = true;
    }
    if (this.plantaSelect !== 0) {
      this.getInstrucciones(this.plantaSelect);
    }
  }

  getInstrucciones(plantaSelect: number) {
    let s = this.service.getInstrucciones();
    s.snapshotChanges()
    .subscribe(data => {
      const control = data[0].payload.toJSON();
      const rg = control['regadora'];
      const planta = control['planta' + plantaSelect];

      this.hlp = planta['horario_luz'];
      this.hvp = planta['horario_ventilador'];
      this.hrg = rg['horario_regadora'];

      if (control['lock'] === 1) {
        this.btnLock = 'btn-dark';
        this.btnLockTxt = 'Unlock';
        this.dataInstruction.lock = 1;
      } else {
        this.btnLock = 'btn-success';
        this.btnLockTxt = 'lock';
        this.dataInstruction.lock = 0;
      }

      if (planta['luz'] === 1) {
        this.btn1p = 'btn-dark';
        this.btn1pTxt = 'Apagar luz';
        this.dataInstruction['planta'].LUZ = 1;
      } else {
        this.btn1p = 'btn-success';
        this.btn1pTxt = 'Encender luz';
        this.dataInstruction['planta'].LUZ = 0;
      }

      if (planta['ventilador'] === 1) {
        this.btn2p = 'btn-dark';
        this.btn2pTxt = 'Apagar ventilación';
        this.dataInstruction['planta'].VENTILADOR = 1;
      } else {
        this.btn2p = 'btn-success';
        this.btn2pTxt = 'Encender ventilación';
        this.dataInstruction['planta'].VENTILADOR = 0;
      }

      if (rg['regadora'] === 1) {
        this.btnRegador = 'btn-dark';
        this.btnRegadorTxt = 'Apagar regadora';
        this.dataInstruction['regadora'].REGADORA = 1;
      } else {
        this.btnRegador = 'btn-success';
        this.btnRegadorTxt = 'Encender regadora';
        this.dataInstruction['regadora'].REGADORA = 0;
      }

      if (this.dataInstruction.lock === 1) {
        this.setButtons();
      }
    });
  }

  setBtn1p() {
    if (this.btn1p === 'btn-success') {
      this.dataInstruction['planta'].LUZ = 1;
    } else {
      this.dataInstruction['planta'].LUZ = 0;
    }
    this.setData();
  }

  setBtn2p() {
    if (this.btn2p === 'btn-success') {
      this.dataInstruction['planta'].VENTILADOR = 1;
    } else {
      this.dataInstruction['planta'].VENTILADOR = 0;
    }
    this.setData();
  }

  setBtnRegador() {
    if (this.btnRegador === 'btn-success') {
      this.dataInstruction['regadora'].REGADORA = 1;
    } else {
      this.dataInstruction['regadora'].REGADORA = 0;
    }
    this.setData();
  }

  setBtnLock() {
    if (this.btnLock === 'btn-success') {
      this.dataInstruction.lock = 1;
    } else {
      this.dataInstruction.lock = 0;
    }
    this.setData();
  }

  // Este método actualiza los valores de los componentes del inverdero con respecto al horario
  setButtons() {
    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    console.log(this.hlp);
    console.log('entra');
    // Partir los horarios para su posterior comparación
    const hlp_1 = this.hlp.split('-')[0];
    const hlp_2 = this.hlp.split('-')[1];
    const hvp_1 = this.hvp.split('-')[0];
    const hvp_2 = this.hvp.split('-')[1];
    const hrg_1 = this.hrg.split('-')[0];
    const hrg_2 = this.hrg.split('-')[1];

    // Verificación para la luz de la planta seleccionada
    if (hours > parseInt(hlp_1.split(':')[0], 10) && hours < parseInt(hlp_2.split(':')[0], 10)) {
      this.dataInstruction['planta'].LUZ = 1;
    } else if (hours === parseInt(hlp_1.split(':')[0], 10)) {
      if (minutes >= parseInt(hlp_1.split(':')[1], 10)) {
        this.dataInstruction['planta'].LUZ = 1;
      } else {
        this.dataInstruction['planta'].LUZ = 0;
      }
    } else if (hours === parseInt(hlp_2.split(':')[0], 10)) {
      if (minutes <= parseInt(hlp_2.split(':')[1], 10)) {
        this.dataInstruction['planta'].LUZ = 1;
      } else {
        this.dataInstruction['planta'].LUZ = 0;
      }
    } else {
      this.dataInstruction['planta'].LUZ = 0;
    }

    // Verificación para la ventilación de la planta seleccionada
    if (hours > parseInt(hvp_1.split(':')[0], 10) && hours < parseInt(hvp_2.split(':')[0], 10)) {
      this.dataInstruction['planta'].VENTILADOR = 1;
    } else if (hours === parseInt(hvp_1.split(':')[0], 10)) {
      if (minutes >= parseInt(hvp_1.split(':')[1], 10)) {
        this.dataInstruction['planta'].VENTILADOR = 1;
      } else {
        this.dataInstruction['planta'].VENTILADOR = 0;
      }
    } else if (hours === parseInt(hvp_2.split(':')[0], 10)) {
      if (minutes <= parseInt(hvp_2.split(':')[1], 10)) {
        this.dataInstruction['planta'].VENTILADOR = 1;
      } else {
        this.dataInstruction['planta'].VENTILADOR = 0;
      }
    } else {
      this.dataInstruction['planta'].VENTILADOR = 0;
    }

    // Verificación para el riego de las plantas
    if (hours > parseInt(hrg_1.split(':')[0], 10) && hours < parseInt(hrg_2.split(':')[0], 10)) {
      this.dataInstruction['regadora'].REGADORA = 1;
    } else if (hours === parseInt(hrg_1.split(':')[0], 10)) {
      if (minutes >= parseInt(hrg_1.split(':')[1], 10)) {
        this.dataInstruction['regadora'].REGADORA = 1;
      } else {
        this.dataInstruction['regadora'].REGADORA = 0;
      }
    } else if (hours === parseInt(hrg_2.split(':')[0], 10)) {
      if (minutes <= parseInt(hrg_2.split(':')[1], 10)) {
        this.dataInstruction['regadora'].REGADORA = 1;
      } else {
        this.dataInstruction['regadora'].REGADORA = 0;
      }
    } else {
      this.dataInstruction['regadora'].REGADORA = 0;
    }

    this.setData();
  }

  // Este método actualiza los valores de los componentes del invernadero en la DB.
  setData() {
    this.service.setData(this.dataInstruction, this.plantaSelect);
  }

}
