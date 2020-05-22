import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authError: any;

  constructor(private auth: AuthServiceService) { }

  ngOnInit() {
    this.auth.eventAuthError$.subscribe(data => {
      this.authError = data;
    });
  }

  /**
   * This method initiates the session of a user using the AuthService component
   * @param frm the information that is gotten from the form
   */
  login(frm) {
    this.auth.login(frm.value.email, frm.value.password);
  }

}
