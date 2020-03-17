class DatosGenerales():
    from firebase import firebase
    def EnviarDatosGenerales(self, temperatura,humedad_ambiente, co2, ph):
     self.firebase = self.firebase.FirebaseApplication('https://invernalife.firebaseio.com/', None)
     data = { 'TEMPERATURA': temperatura,
              'HUMEDAD AMBIENTE': humedad_ambiente,
              'PH': ph,
              'CO2': co2,}
     result = self.firebase.post('/customer/planta2/generales',data)
     return(result)
