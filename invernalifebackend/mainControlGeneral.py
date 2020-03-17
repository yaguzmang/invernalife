import serial
from Conexion_python_firebaseCG import DatosGenerales
data_sender = DatosGenerales()
ser = serial.Serial('/dev/ttyACM0',9600)
s = [0]
while True:
	read_serial=ser.readline()
	s[0] = str(int (ser.readline(),16))
    data = s[0].split("=")
    data_sender.EnviarDatosGenerales(data[1],data[3],data[5],data[7])
	print (s[0])
	print (read_serial)