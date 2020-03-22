class DatosGenerales():
    import firebase_admin
    from firebase_admin import credentials
    from firebase_admin import db
    import random
    import time

    tiempo = time.strftime("%d-%m-%Y %H:%M:%S", time.localtime())
    cred = credentials.Certificate('../invernalife-firebase-adminsdk-r6fz2-2c4537699b.json')
    firebase_admin.initialize_app(cred, {'databaseURL': 'https://invernalife.firebaseio.com/'})
    ref = db.reference()
    
    def EnviarDatosGenerales(self, temperatura,humedad_ambiente, co2, ph):
     invernadero_ref = self.ref.child(self.tiempo)
     invernadero_ref.set({
        'invernadero_general': {
                'TEMPERATURA': temperatura,
                'HUMEDAD AMBIENTE': humedad_ambiente,
                'PH': ph,
                'Co2': co2
        }
      })
      return(invernadero_ref) 
    

    