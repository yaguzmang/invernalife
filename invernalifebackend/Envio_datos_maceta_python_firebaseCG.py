class DatosGenerales():
    import firebase_admin
    from firebase_admin import credentials
    from firebase_admin import db
    import random
    import time

    time = time.strftime("%d-%m-%Y %H:%M:%S", time.localtime())
    cred = credentials.Certificate('../invernalife-firebase-adminsdk-r6fz2-2c4537699b.json')
    firebase_admin.initialize_app(cred, {'databaseURL': 'https://invernalife.firebaseio.com/'})
    ref = db.reference('y6glVJDL7GY2ZkXJXPhW479sTGH3/datos/')
    
    #send the general date soil data to the database
        greenhouse_ref = self.ref.child(self.time)
        greenhouse_ref.set({
                'invernadero_general': {
                        'TEMPERATURA': temperature,
                        'HUMEDAD AMBIENTE': ambient_humidity,
                        'PH': ph,
                        'Co2': co2
                }
        })
        return(greenhouse_ref) 
    

    