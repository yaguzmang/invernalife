import serial
from Conexion_python_firebase import DatosPlanta
data_sender = DatosPlanta()
ser = serial.Serial('/dev/ttyACM0',9600)
s = [0]
while True:
	read_serial=ser.readline()
	s[0] = str(int (ser.readline(),16))
    data = s[0].split("=")
    data_sender.EnviarHumedadSuelo(data[1])
	print (s[0])
	print (read_serial)
