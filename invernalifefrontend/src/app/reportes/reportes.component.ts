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
  mediaCO2: String;
  mediaPH: String;
  desvEsTemp: String;
  desvEsHA: String;
  desvEsCO2: String;
  desvEsPH: String;

  // Variables necesarias para los graficos
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartDataTemp: ChartDataSets[] = [];
  public lineChartDataCO2: ChartDataSets[] = [];
  public lineChartDataPH: ChartDataSets[] = [];

  public lineChartColors: Color[] = [
    { // red
      backgroundColor: 'rgba(255, 0, 0, 0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartColorsTemp: Color[] = [
    { // green
      backgroundColor: 'rgba(122, 240, 77, 0.3)',
      borderColor: 'green',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartColorsCO2: Color[] = [
    { // blue
      backgroundColor: 'rgba(74, 130, 222, 0.3)',
      borderColor: 'blue',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartColorsPH: Color[] = [
    { // yellow
      backgroundColor: 'rgba(247, 198, 58, 0.3)',
      borderColor: 'yellow',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

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

          const newFecha = fecha['fecha'].split(' ')[0];
          const fechaAño = newFecha.split('-')[0];
          const fechaMes = newFecha.split('-')[1];
          const fechaDia = newFecha.split('-')[2];

          if (fechaAño === '2019' && fechaMes === '06' && fechaDia === '03') {
            let newDato = new Datos(fecha['fecha'], ig['co2'], ig['humedad_ambiente'], ig['ph'], ig['temperatura'],
            m1['humedad_suelo'], m2['humedad_suelo']);

            this.datosList.push(newDato);
          }
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
    let mediaCO2 = 0;
    let mediaPH = 0;
    this.datosList.forEach((dato) => {
      mediaTemp += +dato.temperatura;
      mediaHA += +dato.humedad_ambiente;
      mediaCO2 += +dato.co2;
      mediaPH += +dato.ph;
    });
    mediaTemp = mediaTemp / nDatos;
    mediaHA = mediaHA / nDatos;
    mediaCO2 = mediaCO2 / nDatos;
    mediaPH = mediaPH / nDatos;

    let desvEsTemp = 0;
    let desvEsHA = 0;
    let desvEsCO2 = 0;
    let desvEsPH = 0;

    this.datosList.forEach((dato) => {
      desvEsTemp += Math.pow(+dato.temperatura - mediaTemp, 2);
      desvEsHA += Math.pow(+dato.humedad_ambiente - mediaHA, 2);
      desvEsCO2 += Math.pow(+dato.co2 - mediaCO2, 2);
      desvEsPH += Math.pow(+dato.ph - mediaPH, 2);
    });

    desvEsTemp = Math.sqrt(desvEsTemp / (nDatos - 1));
    desvEsHA = Math.sqrt(desvEsHA / (nDatos - 1));
    desvEsCO2 = Math.sqrt(desvEsCO2 / (nDatos - 1));
    desvEsPH = Math.sqrt(desvEsPH / (nDatos - 1));

    this.mediaTemp = mediaTemp.toFixed(3);
    this.mediaHA = mediaHA.toFixed(3);
    this.mediaCO2 = mediaCO2.toFixed(3);
    this.mediaPH = mediaPH.toFixed(3);

    this.desvEsTemp = desvEsTemp.toFixed(3);
    this.desvEsHA = desvEsHA.toFixed(3);
    this.desvEsCO2 = desvEsCO2.toFixed(3);
    this.desvEsPH = desvEsPH.toFixed(3);
  }

  realizarGraficos() {
    const dataHA = [];
    const dataTemp = [];
    const dataCO2 = [];
    const dataPH = [];
    const labels = [];
    this.datosList.forEach((dato) => {
      dataHA.push(+dato.humedad_ambiente);
      dataTemp.push(+dato.temperatura);
      dataCO2.push(+dato.co2);
      dataPH.push(+dato.ph);
      labels.push(dato.fecha_hora.split(' ')[1]);
    });

    this.lineChartData = [{ data: dataHA, label: 'Humedad Ambiente'}];
    this.lineChartDataTemp = [{ data: dataTemp, label: 'Temperatura'}];
    this.lineChartDataCO2 = [{ data: dataCO2, label: 'CO2'}];
    this.lineChartDataPH = [{ data: dataPH, label: 'PH'}];
    this.lineChartLabels = labels;
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
