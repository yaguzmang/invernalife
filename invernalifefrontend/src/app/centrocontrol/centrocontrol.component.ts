import { Component, OnInit } from '@angular/core';
import { CentroControlServiceService } from '../services/centro-control-service.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-centrocontrol',
  templateUrl: './centrocontrol.component.html',
  styleUrls: ['./centrocontrol.component.css']
})
export class CentrocontrolComponent implements OnInit {

  user: Observable<firebase.User>;
  userID: firebase.User = null;

  btnRegador = '';
  btn1p = '';
  btn2p = '';
  btnLock = '';
  lockIcon = '';

  btnRegadorTxt = '';
  btn1pTxt = '';
  btn2pTxt = '';
  btnLockTxt = '';

  hlp = '';
  hvp = '';
  hrg = '';

  dataInstruction = {
    lock: 1,
    'maceta': {
      LUZ: 1,
      VENTILADOR: 1
    },
    'regadora': {
      REGADORA: 1
    }
  };

  actualizado = 0;

  macetas = [];
  opcionSeleccionada = '0';
  macetaSelect = '0';
  mostrar = false;
  space = '';

  constructor(private service: CentroControlServiceService, private router: Router, private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
    this.user.subscribe((user) => {
      if (user) {
        this.userID = user;
      } else {
        this.userID = null;
      }

      let s = this.service.getInstrucciones(this.userID);
      s.snapshotChanges()
      .subscribe(data => {
        const datos = data[0].payload.toJSON();
        const nMacetas = datos['numero_macetas'];
        for (let i = 1; i <= nMacetas; i++) {
          this.macetas[i - 1] = i;
        }
      });
    });
  }

  ngOnInit(): void {
      this.getInstrucciones(+this.macetaSelect);
  }

  capturar() {
    this.macetaSelect = this.opcionSeleccionada;
    if (this.macetaSelect === '0') {
      this.mostrar = false;
    } else {
      this.mostrar = true;
    }
    this.actualizado = 0;
    this.getInstrucciones(+this.macetaSelect);
  }

  getInstrucciones(macetaSelect: number) {
    if (macetaSelect !== 0) {
      let s = this.service.getInstrucciones(this.userID);
      s.snapshotChanges()
      .subscribe(data => {
        const control = data[0].payload.toJSON();
        const rg = control['regadora'];
        const maceta = control['maceta' + macetaSelect];

        this.hlp = maceta['horario_luz'];
        this.hvp = maceta['horario_ventilador'];
        this.hrg = rg['horario_regadora'];

        if (control['lock'] === 1) {
          this.btnLock = 'btn-dark';
          this.btnLockTxt = 'Unlock';
          this.lockIcon = 'fas fa-lock-open';
          this.dataInstruction.lock = 1;
        } else {
          this.btnLock = 'btn-success';
          this.btnLockTxt = 'lock';
          this.lockIcon = 'fas fa-lock';
          this.dataInstruction.lock = 0;
        }

        if (maceta['luz'] === 1) {
          this.btn1p = 'btn-dark';
          this.btn1pTxt = 'Apagar luz';
          this.dataInstruction['maceta'].LUZ = 1;
        } else {
          this.btn1p = 'btn-success';
          this.btn1pTxt = 'Encender luz';
          this.dataInstruction['maceta'].LUZ = 0;
        }

        if (maceta['ventilador'] === 1) {
          this.btn2p = 'btn-dark';
          this.btn2pTxt = 'Apagar ventilación';
          this.dataInstruction['maceta'].VENTILADOR = 1;
        } else {
          this.btn2p = 'btn-success';
          this.btn2pTxt = 'Encender ventilación';
          this.dataInstruction['maceta'].VENTILADOR = 0;
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

        if (this.dataInstruction.lock === 1 && this.actualizado !== 1) {
          this.actualizado = 1;
          this.setButtons();
        }
      });
    }
  }

  setBtn1p() {
    if (this.btn1p === 'btn-success') {
      this.dataInstruction['maceta'].LUZ = 1;
    } else {
      this.dataInstruction['maceta'].LUZ = 0;
    }
    this.actualizado = 0;
    this.setData();
  }

  setBtn2p() {
    if (this.btn2p === 'btn-success') {
      this.dataInstruction['maceta'].VENTILADOR = 1;
    } else {
      this.dataInstruction['maceta'].VENTILADOR = 0;
    }
    this.actualizado = 0;
    this.setData();
  }

  setBtnRegador() {
    if (this.btnRegador === 'btn-success') {
      this.dataInstruction['regadora'].REGADORA = 1;
    } else {
      this.dataInstruction['regadora'].REGADORA = 0;
    }
    this.actualizado = 0;
    this.setData();
  }

  setBtnLock() {
    if (this.btnLock === 'btn-success') {
      this.dataInstruction.lock = 1;
      this.actualizado = 0;
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
    const hlp_1 = this.hlp.split('-')[0];
    const hlp_2 = this.hlp.split('-')[1];
    const hvp_1 = this.hvp.split('-')[0];
    const hvp_2 = this.hvp.split('-')[1];
    const hrg_1 = this.hrg.split('-')[0];
    const hrg_2 = this.hrg.split('-')[1];

    // Verificación para la luz de la maceta seleccionada
    if (hours > parseInt(hlp_1.split(':')[0], 10) && hours < parseInt(hlp_2.split(':')[0], 10)) {
      this.dataInstruction['maceta'].LUZ = 1;
    } else if (hours === parseInt(hlp_1.split(':')[0], 10)) {
      if (minutes >= parseInt(hlp_1.split(':')[1], 10)) {
        this.dataInstruction['maceta'].LUZ = 1;
      } else {
        this.dataInstruction['maceta'].LUZ = 0;
      }
    } else if (hours === parseInt(hlp_2.split(':')[0], 10)) {
      if (minutes <= parseInt(hlp_2.split(':')[1], 10)) {
        this.dataInstruction['maceta'].LUZ = 1;
      } else {
        this.dataInstruction['maceta'].LUZ = 0;
      }
    } else {
      this.dataInstruction['maceta'].LUZ = 0;
    }

    // Verificación para la ventilación de la maceta seleccionada
    if (hours > parseInt(hvp_1.split(':')[0], 10) && hours < parseInt(hvp_2.split(':')[0], 10)) {
      this.dataInstruction['maceta'].VENTILADOR = 1;
    } else if (hours === parseInt(hvp_1.split(':')[0], 10)) {
      if (minutes >= parseInt(hvp_1.split(':')[1], 10)) {
        this.dataInstruction['maceta'].VENTILADOR = 1;
      } else {
        this.dataInstruction['maceta'].VENTILADOR = 0;
      }
    } else if (hours === parseInt(hvp_2.split(':')[0], 10)) {
      if (minutes <= parseInt(hvp_2.split(':')[1], 10)) {
        this.dataInstruction['maceta'].VENTILADOR = 1;
      } else {
        this.dataInstruction['maceta'].VENTILADOR = 0;
      }
    } else {
      this.dataInstruction['maceta'].VENTILADOR = 0;
    }

    // Verificación para el riego de las macetas
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
    this.service.setData(this.dataInstruction, +this.macetaSelect);
  }

}
