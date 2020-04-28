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
    this.instruccionesRef = this.db.list('customer control');
    return this.instruccionesRef;
  }

  setData(values: any) {
    this.instruccionesRef.update('c1ntr1l', {
      lock: values.lock
    });
    this.instruccionesRef.update('c1ntr1l/planta 1', {
      LUZ: values['planta 1'].LUZ,
      VENTILADOR: values['planta 1'].VENTILADOR
    });
    this.instruccionesRef.update('c1ntr1l/planta 2', {
      LUZ: values['planta 2'].LUZ,
      VENTILADOR: values['planta 2'].VENTILADOR
    });
    this.instruccionesRef.update('c1ntr1l/regadora', {
      REGADORA: values['regadora'].REGADORA
    });
  }
}
