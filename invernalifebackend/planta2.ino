#include <TimerOne.h>
#define HM 16 //HUMEDAD SUELO
const byte numChars = 32;
char receivedChars[numChars];  

boolean newData = false;

void setup() {
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
    String lectura = "HM=" + String (analogRead(HM));
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