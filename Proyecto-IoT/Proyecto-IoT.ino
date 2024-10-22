//Librerias Necesarias para ejecucion de componentes
#define RST 21
#define AO 26


void setup() {
  Serial.begin(9600);
  pinMode(AO, OUTPUT);
  pinMode(RST, OUTPUT);
  Serial.println("Iniciando recoleccion de datos");
  //Determinar funcion de los pines

}

void loop() {
  //Establecer lectura de valores de temperatura y establecer conexion a internet mediante comandos de terminal
  //Alertas de temperatura mediante terminal

}

void establecer_conexion(String red, String contraseña){}

void activar_Alerta(){}
