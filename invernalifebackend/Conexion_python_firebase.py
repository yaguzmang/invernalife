from firebase import firebase
 
firebase = firebase.FirebaseApplication('https://invernalife.firebaseio.com/', None)
data =  { 'TEMPERATURA': '21°',
          'HUMEDAD': '15%',
          'PH': '70'
          }
result = firebase.post('/invernalife/Customer/invernadero1',data)
print(result)