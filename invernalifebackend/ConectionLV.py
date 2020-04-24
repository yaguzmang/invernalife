import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import random
import time

tiempo = time.strftime("%H:%M:%S", time.localtime())
cred = credentials.Certificate('C:/Users/Santiago/Desktop/invernalife-firebase-adminsdk-r6fz2-2c4537699b.json')
firebase_admin.initialize_app(cred, {'databaseURL': 'https://invernalife.firebaseio.com/'})
ref = db.reference('customer')

invernadero_ref = ref.child(tiempo)
invernadero_ref.set({
    'invernadero_general': {
            'TEMPERATURA': random.randint(20, 30),
            'HUMEDAD AMBIENTE': random.randint(20, 30),
            'PH': random.randint(0, 12),
            'Co2': random.randint(20, 30) 
    },
    'planta1_humedad_suelo': {
        'HUMEDAD SUELO': random.randint(20, 30)
    },
      'planta2_humedad_suelo': {
        'HUMEDAD SUELO': random.randint(20, 30)
    }
})

ref2 = db.reference('customer control')

invernadero_ref2 = ref2.child('c1ntr1l')
invernadero_ref2.update({
    'planta 1': {
            'LUZ': random.randint(0, 1),
            'VENTILADOR': random.randint(0, 1),
            'HORARIO-VENTILADOR': tiempo + 'am - '+tiempo+'pm',
            'HORARIO-LUZ': tiempo + 'am - '+tiempo+'pm'

    },
    'planta 2': {
            'LUZ': random.randint(0, 1),
            'VENTILADOR': random.randint(0, 1),
            'HORARIO-VENTILADOR': tiempo + 'am - '+tiempo+'pm',
            'HORARIO-LUZ':tiempo + 'am -'+tiempo+'pm'
    },
      'regadora': {
            'REGADORA': random.randint(0, 1),
            'HORARIO-REGADORA': tiempo + 'am - '+tiempo+'pm'
    }
})
