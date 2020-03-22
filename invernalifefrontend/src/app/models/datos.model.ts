export class Datos {
    fecha_hora: String;
    co2: number;
    humedad_ambiente: number;
    ph: number;
    temperatura: number;
    humedad_suelo1: number;
    humedad_suelo2: number;

    constructor(fecha_hora: String, co2: number, humedad_ambiente: number, ph: number, temperatura: number, 
        humedad_suelo1: number, humedad_suelo2: number) {
        this.fecha_hora = fecha_hora;
        this.co2 = co2;
        this.humedad_ambiente = humedad_ambiente;
        this.ph = ph;
        this.temperatura = temperatura;
        this.humedad_suelo1 = humedad_suelo1;
        this.humedad_suelo2 = humedad_suelo2;
    }
}