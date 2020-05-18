import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import random

ruta = '/Users/Santiago/OneDrive - Universidad EAFIT/EAFIT 2020-1/Proyecto Integrador/INVERNALIFE/DATASETS/DATASET1.txt'
archivo = open(ruta, 'r')
cont=0
listaDatos=[]
lista = (archivo.read().split('<http://datos.santander.es/api/datos/sensores_smart_irrigation'))
cred = credentials.Certificate('C:/Users/Santiago/Desktop/invernalife-firebase-adminsdk-r6fz2-2c4537699b.json')
'''
for i in range(0,len(listaDatos)):
    invernadero_ref = ref.child(listaDatos[i].split('|')[2])
    invernadero_ref.set({  
        'invernadero_general': {
             'TEMPERATURA': (listaDatos[i].split('|')[0]),
              'HUMEDAD AMBIENTE': (listaDatos[i].split('|')[1]),
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
   '''
firebase_admin.initialize_app(cred, {'databaseURL': 'https://invernalife.firebaseio.com/'})
ref = db.reference('123456/datos/')
#ref2 = db.reference('customer control')

def  contarDatos():
    diccionario=ref.get()
    nDatos=diccionario["numero_datos"]["numero_datos"]
    return nDatos

def  aumentarDatos():
    invernadero_ref = ref.child('numero_datos')
    invernadero_ref.update({
        'numero_datos': contarDatos()+1
    })

for i in range(0,len(lista)):
    
    if('temperature' in lista[i] ):
        dato=((lista[i].split('"'))[1])+'|'
    
    
    if('relativeHumidity' in lista[i] ):
        dato=dato +  ((lista[i].split('"'))[1])+'|'
   
             
    if('modified' in lista[i] ): 
        fecha=((((lista[i].split('"'))[1]).rstrip('Z')).replace('T',' '))
        dato= dato + fecha
        listaDatos.insert(cont,dato)
        cont=cont+1
        dato =''






def EnviarDatosPlanta():
    for i in range(0,len(listaDatos)):
        invernadero_ref = ref.child("dato"+str(contarDatos()))
        invernadero_ref.set({
            'fecha_dato':{
                    'fecha': listaDatos[i].split('|')[2]
            },
            
            'invernadero':{
                    'co2': random.randint(20, 30),
                    'humedad_ambiente': (listaDatos[i].split('|')[1]),
                    'ph': random.randint(0, 12),
                    'temperatura': (listaDatos[i].split('|')[0])
                    
                    
            },
            'maceta1': {
                'humedad_suelo': random.randint(20, 30)
            },
            'maceta2': {
                'humedad_suelo': random.randint(20, 30)
            }
        })
        aumentarDatos()

EnviarDatosPlanta()

 
       
    




    
