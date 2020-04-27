import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class AdministradorServiceService {
  horariosRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { }

  getHorarios() {
    this.horariosRef = this.db.list('customer control');
    return this.horariosRef;
  }

  setData(values: any) {
    this.horariosRef.update('c1ntr1l/planta 1', {
      'HORARIO-LUZ': values['planta 1']['HORARIO-LUZ'],
      'HORARIO-VENTILADOR': values['planta 1']['HORARIO-VENTILADOR']
    });
    this.horariosRef.update('c1ntr1l/planta 2', {
      'HORARIO-LUZ': values['planta 2']['HORARIO-LUZ'],
      'HORARIO-VENTILADOR': values['planta 2']['HORARIO-VENTILADOR']
    });
    this.horariosRef.update('c1ntr1l/regadora', {
      'HORARIO-REGADORA': values['regadora']['HORARIO-REGADORA']
    });
  }
}
