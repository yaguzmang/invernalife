import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class ReportesServiceService {

  datosRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {}

  getDatosCapturados(userID) {
    if (userID) {
      this.datosRef = this.db.list(`${userID.uid}/`);
    }
    return this.datosRef;
  }
}
