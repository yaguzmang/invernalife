class DatosPlanta():
    import firebase_admin
    from firebase_admin import credentials
    from firebase_admin import db
    import random
    import time

    time = time.strftime("%d-%m-%Y %H:%M:%S", time.localtime())
    cred = credentials.Certificate('../invernalife-firebase-adminsdk-r6fz2-2c4537699b.json')
    firebase_admin.initialize_app(cred, {'databaseURL': 'https://invernalife.firebaseio.com/'})
    ref = db.reference('y6glVJDL7GY2ZkXJXPhW479sTGH3/datos/')


#send the moisture soil data to the database
    def sendMoistureSoil(self, moisture_soil):
     greenhouse_ref = self.ref.child(self.time)
     greenhouse_ref.set({
        'planta_humedad_suelo': { 'HUMEDAD SUELO': moisture_soil}
      })   
     return(greenhouse_ref) 
