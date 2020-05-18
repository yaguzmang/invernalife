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
ref = db.reference('123456/datos/')
refControl = db.reference('123456/control/')

def  contarDatos():
    diccionario=ref.get()
    nDatos=diccionario["numero_datos"]["numero_datos"]
    return nDatos

def  aumentarDatos():
    invernadero_ref = ref.child('numero_datos')
    invernadero_ref.update({
        'numero_datos': contarDatos()+1
    })

def  contarMacetas():
    diccionario=refControl.get()
    nMacetas=diccionario["numero_macetas"]
    return nMacetas



def EnviarDatosmaceta():

    invernadero_ref = ref.child("dato"+str(contarDatos()))
    invernadero_ref.set({
        'fecha_dato':{
                'fecha': tiempo
         },
        
        'invernadero':{
                'co2': random.randint(20, 30),
                'humedad_ambiente': random.randint(20, 30),
                'ph': random.randint(0, 12),
                'temperatura': random.randint(20, 30)
                
                
        },
        'maceta1': {
            'humedad_suelo': random.randint(20, 30)
        },
        'maceta2': {
            'humedad_suelo': random.randint(20, 30)
        }
    })
    aumentarDatos()

#EnviarDatosmaceta()

def verificarHorario(h_inicio, h_fin):
    now = datetime.datetime.now()
    time3 = str(now.strftime("%H:%M"))
    h_inicio = datetime.datetime.strptime(h_inicio, '%H:%M').time()
    h_fin = datetime.datetime.strptime(h_fin, '%H:%M').time()
    time2 = datetime.datetime.strptime(time3, '%H:%M').time()
    return (h_inicio<= time2 and time2 <= h_fin)

def ObtenerOnOff():
    threading.Timer(5.0, ObtenerOnOff).start()
    diccionario=refControl.get()

    for i in range(1,contarMacetas()+1):
        lock=diccionario["lock"]
        maceta = "maceta"+str(i)
        print(i)
        print('********'+maceta)
        luzTime = diccionario[maceta]["horario_luz"]
        ventiladorTime = diccionario[maceta]["horario_ventilador"]
        regadoraTime = diccionario["regadora"]["horario_regadora"]
        if(lock == 1):
            print
            if(verificarHorario(luzTime.split('-')[0],luzTime.split('-')[1])):
                print('LUZ-->ENCENDIDA')
            else:
                print('LUZ-->APAGADA')
                
            if(verificarHorario(ventiladorTime.split('-')[0],ventiladorTime.split('-')[1])):
                print('VENTILADOR-->ENCENDIDO') 
            else:
                print('VENTILADOR-->APAGADO')

            if(verificarHorario(regadoraTime.split('-')[0],regadoraTime.split('-')[1])):
                print('REGADORA-->ENCENDIDA')
            else:
                print('REGADORA-->APAGADA')


            
        else:
            if(diccionario[maceta]["luz"]==1):
                print('LUZ-->ENCENDIDA')
            else:
                print('LUZ-->APAGADA')

            if(diccionario[maceta]["ventilador"]==1):
                print('VENTILADOR-->ENCENDIDA')
            else:
                print('VENTILADOR-->APAGADA')

            if(diccionario["regadora"]["regadora"]==1):
                print('REGADORA-->ENCENDIDA')
            else:
                print('REGADORA-->APAGADA')
    
            
#ObtenerOnOff()

