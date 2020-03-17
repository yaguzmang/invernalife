class DatosPlanta():
    from firebase import firebase

    def EnviarHumedadSuelo(self, humedad_suelo):
     firebase = self.firebase.FirebaseApplication('https://invernalife.firebaseio.com/', None)
     data =  { 'HUMEDAD SUELO': humedad_suelo}
     result = firebase.post('/customer/planta1/humedad_suelo_planta1',data)
     return(result)