import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class AdministradorServiceService {
  horariosRef: AngularFireList<any>;
  

  constructor(private db: AngularFireDatabase) {
    
   }

  getHorarios(userID) {
    if (userID) {
      this.horariosRef = this.db.list(`${userID.uid}/`);
    }
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

  añadirMaceta(numeroMacetas) {
    const newMaceta = 'maceta' + (numeroMacetas + 1) ;
    this.horariosRef.update('control/' + newMaceta, {
      horario_luz: '10:00-16:00',
      horario_ventilador: '10:00-16:00',
      luz: 0,
      ventilador: 0
    });
    this.horariosRef.update('control/', {
      numero_macetas: numeroMacetas + 1
    });
  }
}
