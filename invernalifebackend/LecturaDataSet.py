import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import random
import time

tiempo = time.strftime("%d-%m-%Y %H:%M:%S", time.localtime())
ruta = '/Users/Santiago/OneDrive - Universidad EAFIT/EAFIT 2020-1/Proyecto Integrador/INVERNALIFE/DATASETS/DATASET1.txt'
archivo = open(ruta, 'r')
cont=0
aux=0



listaDatos=[]
lista = (archivo.read().split('<http://datos.santander.es/api/datos/sensores_smart_irrigation'))

cred = credentials.Certificate('C:/Users/Santiago/OneDrive - Universidad EAFIT/EAFIT 2020-1/Proyecto Integrador/INVERNALIFE/JSON/invernalife-firebase-adminsdk-r6fz2-2c4537699b.json')
firebase_admin.initialize_app(cred, {'databaseURL': 'https://invernalife.firebaseio.com/'})
ref = db.reference('customer')



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
    


 
       
    




    
