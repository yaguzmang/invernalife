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

  constructor(private db: AngularFireDatabase) {}

  getDatosCapturados(userID) {
    if (userID) {
      this.datosRef = this.db.list(`${userID.uid}/`);
    }
    return this.datosRef;
  }
}
