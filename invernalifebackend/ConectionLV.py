import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import random
import time
import json
import threading
import datetime

tiempo = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

cred = credentials.Certificate('C:/Users/Santiago/Desktop/invernalife-firebase-adminsdk-r6fz2-2c4537699b.json')
firebase_admin.initialize_app(cred, {'databaseURL': 'https://invernalife.firebaseio.com/'})
ref = db.reference('customer')
ref2 = db.reference('customer control')


def EnviarDatosPlanta():
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


def EnviarOnOff():

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

def verificarHorario(h_inicio, h_fin):
    now = datetime.datetime.now()
    time3 = str(now.strftime("%H:%M:%S"))
    h_inicio = datetime.datetime.strptime(h_inicio, '%H:%M:%S').time()
    h_fin = datetime.datetime.strptime(h_fin, '%H:%M:%S').time()
    time2 = datetime.datetime.strptime(time3, '%H:%M:%S').time()
    return (h_inicio<= time2 and time2 <= h_fin)

        



def ObtenerOnOff():
    threading.Timer(5.0, ObtenerOnOff).start()
    diccionario=ref2.get()

    lock=diccionario["c1ntr1l"]["lock"]
    planta = "planta 1"
    print(planta.upper())
    luzTime = diccionario["c1ntr1l"][planta]["HORARIO-LUZ"]
    if(lock == 1 and verificarHorario(luzTime.split('-')[0],luzTime.split('-')[1])):
        print('LUZ-->ENCENDIDA')
    else:
        print('LUZ-->APAGADA')

    ventiladorTime = diccionario["c1ntr1l"][planta]["HORARIO-VENTILADOR"]
    if(lock == 1 and verificarHorario(ventiladorTime.split('-')[0],ventiladorTime.split('-')[1])):
        print('VENTILADOR-->ENCENDIDO')
    else:
        print('VENTILADOR-->APAGADO')

    planta = "planta 2"
    print('********')
    print(planta.upper())
        
    luzTime = diccionario["c1ntr1l"][planta]["HORARIO-LUZ"]
    if(lock == 1 and verificarHorario(luzTime.split('-')[0],luzTime.split('-')[1])):
        print('LUZ-->ENCENDIDA')
    else:
        print('LUZ-->APAGADA')
        
    ventilador2Time = diccionario["c1ntr1l"][planta]["HORARIO-VENTILADOR"]
    if(lock == 1 and verificarHorario(ventilador2Time.split('-')[0],ventilador2Time.split('-')[1])):
        
        print('VENTILADOR-->ENCENDIDO')

    else:
        print('VENTILADOR-->APAGADO')

    print('********')
    regadoraTime = diccionario["c1ntr1l"]["regadora"]["HORARIO-REGADORA"]
    if(lock == 1 and verificarHorario(regadoraTime.split('-')[0],regadoraTime.split('-')[1])):
        print('REGADORA-->ENCENDIDA')
    else:
        print('REGADORA-->APAGADA')
    print('---------')    

ObtenerOnOff()

