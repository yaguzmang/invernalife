import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import 'firebase/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CentroControlServiceService {
  instruccionesRef: AngularFireList<any>;
  user: Observable<firebase.User>;
  userID: firebase.User = null;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
    this.user.subscribe((user) => {
      if (user) {
        this.userID = user;
      } else {
        this.userID = null;
      }
    });
  }

  getInstrucciones() {
    if (this.userID) {
      this.instruccionesRef = this.db.list(`${this.userID.uid}/`);
    }
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
