import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  authError: any;

  constructor(private auth: AuthServiceService) { }

  ngOnInit() {
    this.auth.eventAuthError$.subscribe( data => {
      this.authError = data;
    });
  }

  /**
   * This method create a user using the AuthService component
   * @param frm the information that is gotten from the form
   */
  createUser(frm: NgForm) {
    let mayus = false;
    let minus = false;
    let numeric = false;
    let special = false;

    if (frm.form.value['password'] === frm.form.value['passwordtwo']) {
      const pswString: string = frm.form.value['password'];

      for (let i = 0; i < pswString.length; i++) {
        const char = pswString.charCodeAt(i);
        if (char >= 65 && char <= 90) { // this conditional validates if the string contains at least one uppercase
          mayus = true;
        } else if (char >= 97 && char <= 122) { // this conditional validates if the string contains at least one lowercase
          minus = true;
        } else if (char >= 48 && char <= 57) { // this conditional validates if the string contains at least one number
          numeric = true;
        } else if (char === 64 || char === 42 || char === 95 || char === 46) { // one special character
          special = true;
        }
      }

      if (!mayus) {
        this.authError = 'Error: La contraseña debe contener al menos una mayúscula';
      } else if (!minus) {
        this.authError = 'Error: La contraseña debe contener al menos una minuscula';
      } else if (!numeric) {
        this.authError = 'Error: La contraseña debe contener al menos un número';
      } else if (!special) {
        this.authError = 'Error: La contraseña debe contener al menos uno de los siguientes caracteres especiales: "*", "@", "_", "."';
      } else {
        this.authError = '';
        this.auth.createUser(frm.value);
      }
    } else {
      this.authError = 'Error: Las contraseñas no son iguales';
    }
  }


}