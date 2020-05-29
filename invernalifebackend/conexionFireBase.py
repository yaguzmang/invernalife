import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import random
import time
import json
import threading
import datetime

tiempo = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

cred = credentials.Certificate('../invernalife-firebase-adminsdk-r6fz2-2c4537699b.json')
firebase_admin.initialize_app(cred, {'databaseURL': 'https://invernalife.firebaseio.com/'})
ref = db.reference('y6glVJDL7GY2ZkXJXPhW479sTGH3/datos/')
refControl = db.reference('y6glVJDL7GY2ZkXJXPhW479sTGH3/control/')

#method to count the number of data in the database
def  countData():
    dictionary=ref.get()
    nData=dictionary["numero_datos"]["numero_datos"]
    return nData
#increase the variable that controls the number of data entered in the database
def  increaseData():
    greenhouse_ref = ref.child('numero_datos')
    greenhouse_ref.update({
        'numero_datos': countData()+1
    })
#counts the number of existing pots in the database
def  countPlantpots():
    dictionary=refControl.get()
    nPlantpots=dictionary["numero_macetas"]
    return nPlantpots


#send the collected data to the database
def SendPlantpotData():

    greenhouse_ref = ref.child("dato"+str(countData()))
    greenhouse_ref.set({
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
    increaseData()

#SendPlantpotData()

#Verify that the time that the database arrives is between the local time to make the decision to turn on or off any actuator
def checkSchedule(h_inicio, h_fin):
    now = datetime.datetime.now()
    time3 = str(now.strftime("%H:%M"))
    h_inicio = datetime.datetime.strptime(h_inicio, '%H:%M').time()
    h_fin = datetime.datetime.strptime(h_fin, '%H:%M').time()
    time2 = datetime.datetime.strptime(time3, '%H:%M').time()
    return (h_inicio<= time2 and time2 <= h_fin)
    
#get if there was a switch on or off whether manual or automatic
def getOnOff():
    threading.Timer(5.0, getOnOff).start()
    dictionary=refControl.get()

    for i in range(1,countPlantpots()+1):
        lock=dictionary["lock"]
        plantpots = "maceta"+str(i)
        
        print('**************** '+plantpots.upper()+' ****************')
        luzTime = dictionary[plantpots]["horario_luz"]
        ventiladorTime = dictionary[plantpots]["horario_ventilador"]
        regadoraTime = dictionary["regadora"]["horario_regadora"]
        if(lock == 1):
            print
            if(checkSchedule(luzTime.split('-')[0],luzTime.split('-')[1])):
                print('LIGHT -> ON')
            else:
                print('LIGHT -> OFF')
                
            if(checkSchedule(ventiladorTime.split('-')[0],ventiladorTime.split('-')[1])):
                print('FAN -> ON') 
            else:
                print('FAN -> OFF')

            if(checkSchedule(regadoraTime.split('-')[0],regadoraTime.split('-')[1])):
                print('SHOWER -> ON')
            else:
                print('SHOWER -> OFF')


            
        else:
            if(dictionary[plantpots]["luz"]==1):
                print('LIGHT -> ON')
            else:
                print('LIGHT -> OFF')

            if(dictionary[plantpots]["ventilador"]==1):
                print('VENTILADOR-->ENCENDIDA')
            else:
                print('VENTILADOR-->APAGADA')

            if(dictionary["regadora"]["regadora"]==1):
                print('SHOWER -> ON')
            else:
                print('SHOWER -> OFF')
    
            
getOnOff()

