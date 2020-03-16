class DatosPlantaUno():
    from firebase import firebase

    def EnviarDatosGeneralesPlantaUno(self,temperatura,humedad_ambiente, co2, ph):
     self.firebase = self.firebase.FirebaseApplication('https://invernalife.firebaseio.com/', None)
     data = { 'TEMPERATURA': temperatura,
              'HUMEDAD AMBIENTE': humedad_ambiente,
              'PH': ph,
              'CO2': co2,}
     result = self.firebase.post('/customer/planta1/generales',data)
     return(result)

    def EnviarHumedadSueloPlantaUno(self, humedad_suelo):
     firebase = self.firebase.FirebaseApplication('https://invernalife.firebaseio.com/', None)
     data =  { 'HUMEDAD SUELO': humedad_suelo}
     result = firebase.post('/customer/planta1/humedad_suelo_planta1',data)
     return(result)


class DatosPlantaDos():
    from firebase import firebase



    def EnviarDatosGeneralesPlantaDos(self, temperatura,humedad_ambiente, co2, ph):
     self.firebase = self.firebase.FirebaseApplication('https://invernalife.firebaseio.com/', None)
     data = { 'TEMPERATURA': temperatura,
              'HUMEDAD AMBIENTE': humedad_ambiente,
              'PH': ph,
              'CO2': co2,}
     result = self.firebase.post('/customer/planta2/generales',data)
     return(result)

    def EnviarHumedadSueloPlantaDos(self, humedad_suelo):
     firebase = self.firebase.FirebaseApplication('https://invernalife.firebaseio.com/', None)
     data =  { 'HUMEDAD SUELO': humedad_suelo}
     result = firebase.post('/customer/planta1/humedad_suelo_planta2',data)
     return(result)