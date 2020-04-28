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
  btn1p1 = '';
  btn2p1 = '';
  btn1p2 = '';
  btn2p2 = '';
  btnLock = '';

  btnRegadorTxt = '';
  btn1p1Txt = '';
  btn2p1Txt = '';
  btn1p2Txt = '';
  btn2p2Txt = '';
  btnLockTxt = '';

  hlp1 = '';
  hvp1 = '';
  hlp2 = '';
  hvp2 = '';
  hrg = '';

  dataInstruction = {
    lock: 1,
    'planta 1': {
      LUZ: 1,
      VENTILADOR: 1
    },
    'planta 2': {
      LUZ: 1,
      VENTILADOR: 1
    },
    'regadora': {
      REGADORA: 1
    }
  };

  constructor(private service: CentroControlServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getInstrucciones();
  }

  getInstrucciones() {
    let s = this.service.getInstrucciones();
    s.snapshotChanges()
    .subscribe(data => {
      data.forEach(item => {
        let a = item.payload.toJSON();
        let p1 = a['planta 1'];
        let p2 = a['planta 2'];
        let rg = a['regadora'];

        this.hlp1 = p1['HORARIO-LUZ'];
        this.hvp1 = p1['HORARIO-VENTILADOR'];
        this.hlp2 = p2['HORARIO-LUZ'];
        this.hvp2 = p2['HORARIO-VENTILADOR'];
        this.hrg = rg['HORARIO-REGADORA'];

        if (a['lock'] === 1) {
          this.btnLock = 'btn-dark';
          this.btnLockTxt = 'Unlock';
          this.dataInstruction.lock = 1;
        } else {
          this.btnLock = 'btn-success';
          this.btnLockTxt = 'lock';
          this.dataInstruction.lock = 0;
        }

        if (p1['LUZ'] === 1) {
          this.btn1p1 = 'btn-dark';
          this.btn1p1Txt = 'Apagar luz';
          this.dataInstruction['planta 1'].LUZ = 1;
        } else {
          this.btn1p1 = 'btn-success';
          this.btn1p1Txt = 'Encender luz';
          this.dataInstruction['planta 1'].LUZ = 0;
        }

        if (p1['VENTILADOR'] === 1) {
          this.btn2p1 = 'btn-dark';
          this.btn2p1Txt = 'Apagar ventilación';
          this.dataInstruction['planta 1'].VENTILADOR = 1;
        } else {
          this.btn2p1 = 'btn-success';
          this.btn2p1Txt = 'Encender ventilación';
          this.dataInstruction['planta 1'].VENTILADOR = 0;
        }

        if (p2['LUZ'] === 1) {
          this.btn1p2 = 'btn-dark';
          this.btn1p2Txt = 'Apagar luz';
          this.dataInstruction['planta 2'].LUZ = 1;
        } else {
          this.btn1p2 = 'btn-success';
          this.btn1p2Txt = 'Encender luz';
          this.dataInstruction['planta 2'].LUZ = 0;
        }

        if (p2['VENTILADOR'] === 1) {
          this.btn2p2 = 'btn-dark';
          this.btn2p2Txt = 'Apagar ventilación';
          this.dataInstruction['planta 2'].VENTILADOR = 1;
        } else {
          this.btn2p2 = 'btn-success';
          this.btn2p2Txt = 'Encender ventilación';
          this.dataInstruction['planta 2'].VENTILADOR = 0;
        }

        if (rg['REGADORA'] === 1) {
          this.btnRegador = 'btn-dark';
          this.btnRegadorTxt = 'Apagar regadora';
          this.dataInstruction['regadora'].REGADORA = 1;
        } else {
          this.btnRegador = 'btn-success';
          this.btnRegadorTxt = 'Encender regadora';
          this.dataInstruction['regadora'].REGADORA = 0;
        }
        console.log(a);
      });
      if (this.dataInstruction.lock === 1) {
        this.setButtons();
      }
    });
  }

  setBtn1p1() {
    if (this.btn1p1 === 'btn-success') {
      this.dataInstruction['planta 1'].LUZ = 1;
    } else {
      this.dataInstruction['planta 1'].LUZ = 0;
    }
    this.setData();
  }

  setBtn2p1() {
    if (this.btn2p1 === 'btn-success') {
      this.dataInstruction['planta 1'].VENTILADOR = 1;
    } else {
      this.dataInstruction['planta 1'].VENTILADOR = 0;
    }
    this.setData();
  }

  setBtn1p2() {
    if (this.btn1p2 === 'btn-success') {
      this.dataInstruction['planta 2'].LUZ = 1;
    } else {
      this.dataInstruction['planta 2'].LUZ = 0;
    }
    this.setData();
  }

  setBtn2p2() {
    if (this.btn2p2 === 'btn-success') {
      this.dataInstruction['planta 2'].VENTILADOR = 1;
    } else {
      this.dataInstruction['planta 2'].VENTILADOR = 0;
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

    // Partir los horarios para su posterior comparación
    const hlp1_1 = this.hlp1.split('-')[0];
    const hlp1_2 = this.hlp1.split('-')[1];
    const hlp2_1 = this.hlp2.split('-')[0];
    const hlp2_2 = this.hlp2.split('-')[1];
    const hvp1_1 = this.hvp1.split('-')[0];
    const hvp1_2 = this.hvp1.split('-')[1];
    const hvp2_1 = this.hvp2.split('-')[0];
    const hvp2_2 = this.hvp2.split('-')[1];
    const hrg_1 = this.hrg.split('-')[0];
    const hrg_2 = this.hrg.split('-')[1];

    // Verificación para la luz de la planta 1
    if (hours > parseInt(hlp1_1.split(':')[0], 10) && hours < parseInt(hlp1_2.split(':')[0], 10)) {
      this.dataInstruction['planta 1'].LUZ = 1;
    } else if (hours === parseInt(hlp1_1.split(':')[0], 10)) {
      if (minutes >= parseInt(hlp1_1.split(':')[1], 10)) {
        this.dataInstruction['planta 1'].LUZ = 1;
      } else {
        this.dataInstruction['planta 1'].LUZ = 0;
      }
    } else if (hours === parseInt(hlp1_2.split(':')[0], 10)) {
      if (minutes <= parseInt(hlp1_2.split(':')[1], 10)) {
        this.dataInstruction['planta 1'].LUZ = 1;
      } else {
        this.dataInstruction['planta 1'].LUZ = 0;
      }
    } else {
      this.dataInstruction['planta 1'].LUZ = 0;
    }

    // Verificación para la luz de la planta 2
    if (hours > parseInt(hlp2_1.split(':')[0], 10) && hours < parseInt(hlp2_2.split(':')[0], 10)) {
      this.dataInstruction['planta 2'].LUZ = 1;
    } else if (hours === parseInt(hlp2_1.split(':')[0], 10)) {
      if (minutes >= parseInt(hlp2_1.split(':')[1], 10)) {
        this.dataInstruction['planta 2'].LUZ = 1;
      } else {
        this.dataInstruction['planta 2'].LUZ = 0;
      }
    } else if (hours === parseInt(hlp2_2.split(':')[0], 10)) {
      if (minutes <= parseInt(hlp2_2.split(':')[1], 10)) {
        this.dataInstruction['planta 2'].LUZ = 1;
      } else {
        this.dataInstruction['planta 2'].LUZ = 0;
      }
    } else {
      this.dataInstruction['planta 2'].LUZ = 0;
    }

    // Verificación para la ventilación de la planta 1
    if (hours > parseInt(hvp1_1.split(':')[0], 10) && hours < parseInt(hvp1_2.split(':')[0], 10)) {
      this.dataInstruction['planta 1'].VENTILADOR = 1;
    } else if (hours === parseInt(hvp1_1.split(':')[0], 10)) {
      if (minutes >= parseInt(hvp1_1.split(':')[1], 10)) {
        this.dataInstruction['planta 1'].VENTILADOR = 1;
      } else {
        this.dataInstruction['planta 1'].VENTILADOR = 0;
      }
    } else if (hours === parseInt(hvp1_2.split(':')[0], 10)) {
      if (minutes <= parseInt(hvp1_2.split(':')[1], 10)) {
        this.dataInstruction['planta 1'].VENTILADOR = 1;
      } else {
        this.dataInstruction['planta 1'].VENTILADOR = 0;
      }
    } else {
      this.dataInstruction['planta 1'].VENTILADOR = 0;
    }

    // Verificación para la ventilación de la planta 2
    if (hours > parseInt(hvp2_1.split(':')[0], 10) && hours < parseInt(hvp2_2.split(':')[0], 10)) {
      this.dataInstruction['planta 2'].VENTILADOR = 1;
    } else if (hours === parseInt(hvp2_1.split(':')[0], 10)) {
      if (minutes >= parseInt(hvp2_1.split(':')[1], 10)) {
        this.dataInstruction['planta 2'].VENTILADOR = 1;
      } else {
        this.dataInstruction['planta 2'].VENTILADOR = 0;
      }
    } else if (hours === parseInt(hvp2_2.split(':')[0], 10)) {
      if (minutes <= parseInt(hvp2_2.split(':')[1], 10)) {
        this.dataInstruction['planta 2'].VENTILADOR = 1;
      } else {
        this.dataInstruction['planta 2'].VENTILADOR = 0;
      }
    } else {
      this.dataInstruction['planta 2'].VENTILADOR = 0;
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
    this.service.setData(this.dataInstruction);
  }

}
