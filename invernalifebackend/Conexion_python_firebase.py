class DatosPlanta():
    from firebase import firebase
    import time
    tiempo = time.strftime("%d-%m-%Y %H:%M:%S", time.localtime())


    def EnviarHumedadSuelo(self, humedad_suelo):
     firebase = self.firebase.FirebaseApplication('https://invernalife.firebaseio.com/', None)
     data =  { 'HUMEDAD SUELO': humedad_suelo}
     result = firebase.post('/customer/'+tiempo+'/planta_humedad_suelo',data)
     return(result)
