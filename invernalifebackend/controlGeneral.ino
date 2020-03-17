#include <TimerOne.h>
#include <DHT.h>


#define DHTPIN 2
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

#define PH 16 
#define CO2 5
#define DHTPIN 2
const byte numChars = 32;
char receivedChars[numChars];  

boolean newData = false;

void setup() {
    dht.begin();
    pinMode(HM, INPUT);
    Serial.begin(9600);
    Timer1.initialize(5000000);         // Dispara cada 5 s
    Timer1.attachInterrupt(ENVIAR_DATA); // Activa la interrupcion y la asocia a ENVIAR_DATA
    Serial.begin(9600);
}

void loop() {
  recvWithEndMarker();
  showNewData();
}

void ENVIAR_DATA() {  
    String lectura = "T=" + String (dht.readTemperature()) + "HM=" String (dht.readHumidity()) + "CO2="String (analogRead(CO2)) + "PH="String (analogRead(PH)) ;
    Serial.println(lectura); // Envia los datos por puerto serial a la Raspberry 
   }

void recvWithEndMarker() { // Lee comandos desde las Raspberry 
    static byte ndx = 0;
    char endMarker = '\n';
    char rc;

    while (Serial.available() > 0 && newData == false) {
        rc = Serial.read();

        if (rc != endMarker) {
            receivedChars[ndx] = rc;
            ndx++;
            if (ndx >= numChars) {
                ndx = numChars - 1;
            }
        }
        else {
            receivedChars[ndx] = '\0'; // terminate the string
            ndx = 0;
            newData = true;
        }
    }
}

void showNewData() {
    if (newData == true) {
        Serial.println(receivedChars);
        newData = false;
    }
}