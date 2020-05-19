import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class CentroControlServiceService {
  instruccionesRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { }

  getInstrucciones() {
    this.instruccionesRef = this.db.list('123456/');
    return this.instruccionesRef;
  }

  setData(values: any, macetaSelect: number) {
    this.instruccionesRef.update('control', {
      lock: values.lock
    });
    this.instruccionesRef.update('control/maceta' + macetaSelect, {
      luz: values['maceta'].LUZ,
      ventilador: values['maceta'].VENTILADOR
    });
    this.instruccionesRef.update('control/regadora', {
      regadora: values['regadora'].REGADORA
    });
  }
}
