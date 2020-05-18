import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class DatosCapturadosService {
  datosRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { }

  getDatosCapturados() {
    this.datosRef = this.db.list('123456/');
    return this.datosRef;
  }
}
