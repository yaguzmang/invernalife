import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministradorComponent } from './administrador/administrador.component';
import { CentrocontrolComponent } from './centrocontrol/centrocontrol.component';
import { DatoscapturadosComponent } from './datoscapturados/datoscapturados.component';
import { ReportesComponent } from './reportes/reportes.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';


const routes: Routes = [
  {path: 'administrador', component: AdministradorComponent},
  {path: 'centrocontrol', component: CentrocontrolComponent},
  {path: 'datoscapturados', component: DatoscapturadosComponent},
  {path: 'reportes', component: ReportesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
