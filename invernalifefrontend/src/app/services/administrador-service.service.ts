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
    this.horariosRef = this.db.list('123456/');
    return this.horariosRef;
  }

  setData(values: any, macetaSelect) {
    this.horariosRef.update('control/maceta' + macetaSelect, {
      'horario_luz': values['maceta']['horario_luz'],
      'horario_ventilador': values['maceta']['horario_ventilador']
    });
    this.horariosRef.update('control/regadora', {
      'horario_regadora': values['regadora']['horario_regadora']
    });
  }
}
