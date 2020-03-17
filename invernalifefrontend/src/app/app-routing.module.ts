import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministradorComponent } from './administrador/administrador.component';
import { CentrocontrolComponent } from './centrocontrol/centrocontrol.component';
import { DatoscapturadosComponent } from './datoscapturados/datoscapturados.component';
import { ReportesComponent } from './reportes/reportes.component';


const routes: Routes = [
  {path: 'administrador', component: AdministradorComponent},
  {path: 'centrocontrol', component: CentrocontrolComponent},
  {path: 'datoscapturados', component: DatoscapturadosComponent},
  {path: 'reportes', component: ReportesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
