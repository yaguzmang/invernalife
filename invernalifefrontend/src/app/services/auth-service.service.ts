import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  newBranch: AngularFireList<any>;
  private eventAuthError = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();

  newUser: any;

  constructor(private afAuth: AngularFireAuth, private rtdb: AngularFireDatabase, private db: AngularFirestore, private router: Router) { }

  getUserState() {
    return this.afAuth.authState;
  }

  /**
   * This method initiates the session of a user using the authentication service of firebase
   * @param email The email that was entered in the form
   * @param password The password that was entered in the form
   */
  login( email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredential => {
        if (userCredential) {
          this.router.navigate(['/administrador']);
        }
      });
  }

  /**
   * This method create a user using the authentication service of firebase with the mode email and password
   * @param user all the user information from the form
   */
  createUser(user) {
    console.log(user);
    this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then( userCredential => {
        this.newUser = user;
        console.log(userCredential);
        userCredential.user.updateProfile( {
          displayName: user.firstName + ' ' + user.lastName
        });

        this.insertControlAndData(userCredential);

        this.insertUserData(userCredential)
          .then(() => {
            this.router.navigate(['/administrador']);
          });
      })
      .catch( error => {
        this.eventAuthError.next(error);
      });
  }

  /**
   * This method insert the information of the user in the database of firebase
   * @param userCredential the information of the user
   */
  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      firstname: this.newUser.firstName,
      lastname: this.newUser.lastName,
      role: 'network user'
    });
  }

  insertControlAndData(userCredential: firebase.auth.UserCredential) {
    this.newBranch = this.rtdb.list(`${userCredential.user.uid}/`);
    this.newBranch.set('control', {
      lock: 0,
      numero_macetas: 2,
      maceta1: {
        horario_luz: '16:30-20:20',
        horario_ventilador: '16:30-20:20',
        luz: 0,
        ventilador: 0
      },
      maceta2: {
        horario_luz: '16:30-20:20',
        horario_ventilador: '16:30-20:20',
        luz: 0,
        ventilador: 0
      },
      regadora: {
        horario_regadora: '16:30-20:20',
        regadora: 0
      }
    });

    this.newBranch.set('datos', {
      numero_datos: {
        numero_datos: 0
      }
    });
  }

  /**
   * This method close the current session
   */
  logout() {
    return this.afAuth.signOut();
  }
}
