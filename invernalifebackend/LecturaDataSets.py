import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import random

ruta = '../TEMPERATURA_HUMEDAD.txt'
ruta1 = '../ph.txt'
ruta2 = '../CO2.txt'

cred = credentials.Certificate('../invernalife-firebase-adminsdk-r6fz2-2c4537699b.json')

firebase_admin.initialize_app(cred, {'databaseURL': 'https://invernalife.firebaseio.com/'})
#y6glVJDL7GY2ZkXJXPhW479sTGH3 usuario establecido
ref = db.reference('y6glVJDL7GY2ZkXJXPhW479sTGH3/datos/')


archivo = open(ruta, 'r')
archivo1 = open(ruta1, 'r')
archivo2 = open(ruta2, 'r')

listaDatosTemperatura=[]
listaDatosHumedad=[]
listaDatosPh=[]
listaDatosFechas=[]
listaDatosFechasAux=[]
listaDatosCo=[]

lista = ((archivo.read().split(',')))
lista1 = ((archivo1.read().split(',')))
lista2 = ((archivo2.read().split(',')))

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
    
    if('Tair.C' in lista[i] ):
        dato=((lista[i].split('"'))[3])
        entero= (dato.split('.'))[0]
        if(int(entero)>=15 and int(entero)<=45):
         listaDatosTemperatura.insert(i,(dato))

    if('RH.percent' in lista[i] ):
        dato=((lista[i].split('"'))[3])
        entero= (dato.split('.'))[0]
        if(int(entero)>=15 and int(entero)<=41):
         listaDatosHumedad.insert(i,(dato))

for i in range(0,len(lista1)):
 
    if('pH' in lista1[i] ):
        dato=((lista1[i].split('"'))[2])
        entero= ((((dato.split(':'))[1]).replace("\n","")).replace("}","")).split('.')[0]
        
        if(int(entero)>0 and int(entero)<=15):
             listaDatosPh.insert(i,((dato.replace("\n","")).replace("}","")))

for i in range(0,len(lista2)):
     
        if('valor' in lista2[i] ):
            datoCo=(lista2[i].split(':')[1]).replace("}","")
            co= datoCo.split('. ')[0]
            
            if(float(co)>200.0 and float(co)<=1000.0):
               co1=round(((float(co))/7), 2)
               if(co1>12.0 and co1<=60.0):
                   datoCo2= str(co1)
                   listaDatosCo.insert(i,co1)
                

        if('fecha' in  lista2[i] ):
            fecha=((((lista2[i])).split(': ')[1])[:-4]).replace('"','')
            listaDatosFechasAux.insert(i,fecha)
          
        
        


listaDatosFechas =listaDatosFechasAux
conjunto= set(listaDatosFechas)
listaDatosFechas = list(conjunto)
listaDatosFechas.sort()



def EnviarDatosMaceta():
    
    for i in range(0,len(listaDatosCo)):
        invernadero_ref = ref.child("dato"+str(contarDatos()))
        invernadero_ref.set({
            'fecha_dato':{
                    'fecha': listaDatosFechas[i]
            },
            
            'invernadero':{
                    'co2': listaDatosCo[i],
                    'humedad_ambiente': listaDatosHumedad[i],
                    'ph': listaDatosPh[i],
                    'temperatura': listaDatosTemperatura[i]
                    
                    
            },
            'maceta1': {
                'humedad_suelo': random.randint(20, 30)
            },
            'maceta2': {
                'humedad_suelo': random.randint(20, 30)
            }
        })
        aumentarDatos()

EnviarDatosMaceta()


    
