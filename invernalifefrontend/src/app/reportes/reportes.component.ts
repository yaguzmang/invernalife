import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportesServiceService } from '../services/reportes-service.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Datos } from '../models/datos.model';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  public datosList: Datos[];
  user: Observable<firebase.User>;
  userID: firebase.User = null;

  opcionSeleccionada = '0';
  reporteSelect = '0';
  mostrarEstadisticas = false;
  mostrarGraficos = false;

  mediaTemp: String;
  mediaHA: String;
  desvEsTemp: String;
  desvEsHA: String;

  // Variables necesarias para los graficos
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartColors: Color[] = [];
  public lineChartDataTemp: ChartDataSets[] = [];

  public lineChartOptions: (ChartOptions) = {
    responsive: true
  };
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private service: ReportesServiceService, private router: Router, private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
    this.user.subscribe((user) => {
      if (user) {
        this.userID = user;
        this.getData();
      } else {
        this.userID = null;
      }
    });
   }

  ngOnInit(): void {
    this.getData();
  }

  capturar() {
    this.reporteSelect = this.opcionSeleccionada;
    console.log(this.reporteSelect);
    if (this.reporteSelect === '0') {
      this.mostrarEstadisticas = false;
      this.mostrarGraficos = false;
    } else if (this.reporteSelect === '1') {
      this.mostrarEstadisticas = true;
      this.mostrarGraficos = false;
    } else {
      this.mostrarEstadisticas = false;
      this.mostrarGraficos = true;
    }
    this.getData();
  }

  getData() {
    if (this.userID) {
      this.datosList = [];
      let s = this.service.getDatosCapturados(this.userID);
      s.snapshotChanges()
      .subscribe(data => {
        const datos = data[1].payload.toJSON();
        const nDatos = datos['numero_datos']['numero_datos'];

        for (let i = 0; i < nDatos; i++) {
          const dato = datos['dato' + i];
          const ig = dato['invernadero'];
          const m1 = dato['maceta1'];
          const m2 = dato['maceta2'];
          const fecha = dato['fecha_dato'];

          let newDato = new Datos(fecha['fecha'], ig['co2'], ig['humedad_ambiente'], ig['ph'], ig['temperatura'],
          m1['humedad_suelo'], m2['humedad_suelo']);

          this.datosList.push(newDato);
        }
        this.calcularEstadisticos();
        this.realizarGraficos();
      });
      console.log(this.datosList);
    }
  }

  calcularEstadisticos() {
    const nDatos = this.datosList.length;
    let mediaTemp = 0;
    let mediaHA = 0;
    this.datosList.forEach((dato) => {
      mediaTemp += +dato.temperatura;
      mediaHA += +dato.humedad_ambiente;
    });
    mediaTemp = mediaTemp / nDatos;
    mediaHA = mediaHA / nDatos;

    let desvEsTemp = 0;
    let desvEsHA = 0;

    this.datosList.forEach((dato) => {
      desvEsTemp += Math.pow(+dato.temperatura - mediaTemp, 2);
      desvEsHA += Math.pow(+dato.humedad_ambiente - mediaHA, 2);
    });

    desvEsTemp = Math.sqrt(desvEsTemp / (nDatos - 1));
    desvEsHA = Math.sqrt(desvEsHA / (nDatos - 1));

    this.mediaTemp = mediaTemp.toFixed(3);
    this.mediaHA = mediaHA.toFixed(3);
    this.desvEsTemp = desvEsTemp.toFixed(3);
    this.desvEsHA = desvEsHA.toFixed(3);
  }

  realizarGraficos() {
    const dataHA = [];
    const dataTemp = [];
    const labels = [];
    this.datosList.forEach((dato) => {
      dataHA.push(+dato.humedad_ambiente);
      dataTemp.push(+dato.temperatura);
      labels.push(dato.fecha_hora);
    });

    this.lineChartData = [{ data: dataHA, label: 'Humedad Ambiente'}];
    this.lineChartDataTemp = [{ data: dataTemp, label: 'Temperatura'}];
    this.lineChartLabels = labels;
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
