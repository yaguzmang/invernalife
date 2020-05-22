import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class DatosCapturadosService {
  datosRef: AngularFireList<any>;
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

  getDatosCapturados() {
    if (this.userID) {
      this.datosRef = this.db.list(`${this.userID.uid}/`);
    }
    return this.datosRef;
  }
}
