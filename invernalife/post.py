import requests
import json
payload = {'temp':28.5,'hum':85.5,'ph':7.5}
payloadJson = json.dumps(payload)
r = requests.post("http://localhost:3000/api/", headers = {'Content-Type': 'application/json'}, data=payloadJson)
r_dict = r.json()
print(r_dict)