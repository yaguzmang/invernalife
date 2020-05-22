import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class AdministradorServiceService {
  horariosRef: AngularFireList<any>;
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

  getHorarios() {
    if (this.userID) {
      this.horariosRef = this.db.list(`${this.userID.uid}/`);
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
}
