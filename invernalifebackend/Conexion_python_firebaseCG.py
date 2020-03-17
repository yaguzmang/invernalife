class DatosGenerales():
    from firebase import firebase
    import time
    tiempo = time.strftime("%d-%m-%Y %H:%M:%S", time.localtime())
    
    def EnviarDatosGenerales(self, temperatura,humedad_ambiente, co2, ph):
     self.firebase = self.firebase.FirebaseApplication('https://invernalife.firebaseio.com/', None)
     data = { 'TEMPERATURA': temperatura,
              'HUMEDAD AMBIENTE': humedad_ambiente,
              'PH': ph,
              'CO2': co2,}
     result = self.firebase.post('/customer/'+tiempo+'/invernadero_general/',data)
     return(result)
