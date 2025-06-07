#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

#define DHTTYPE      DHT22

#define MQ2PIN 34
#define DHTPIN 23
DHT_Unified dht(DHTPIN, DHTTYPE);
int sensorValue;
bool buzzerDisparado = false;

LiquidCrystal_I2C lcd(0x27, 20, 4);

void setup() {
  Wire.begin(21, 22);
  Serial.begin(115200);

  // inicializaçao do display + tela inicial
  lcd.init();
  lcd.backlight();
  lcd.setCursor(4, 2);
  lcd.print("Therma Plus");
  delay(1500);
  // inicializacao automatica do MQ2 e manual do DHT22
  Serial.println("MQ2 aquecendo...");
	delay(200);
  dht.begin();
  Serial.println("Usando o Sensor DHT");
}

void loop() {
  // leitura da temperatura do dispositivo DHT22
  sensors_event_t event;
  dht.temperature().getEvent(&event);
  if (isnan(event.temperature))
  {
    Serial.println("Erro na leitura da Temperatura!");
  }
  else
  {
    lcd.setCursor(0,1);
    lcd.print("Temperatura: ");
    lcd.print(event.temperature, 0);
    lcd.print(" C    ");
  }

  // leitura da umidade do dispositivo DHT22
  dht.humidity().getEvent(&event);
  if (isnan(event.relative_humidity))
  {
    Serial.println("Erro na leitura da Umidade!");
  }
  else
  {
    lcd.setCursor(0,2);
    lcd.print("Umidade: ");
    lcd.print(event.relative_humidity);
    lcd.print("%    ");
  }
  
  // leitura do nivel de gas do dispositivo MQ2
  sensorValue = analogRead(MQ2PIN);
	
	if (sensorValue < 1366) {
    lcd.setCursor(0,3);
    lcd.print("Nivel de CO2: Baixo    ");
  } else if(sensorValue < 2731){
    lcd.setCursor(0,3);
    lcd.print("Nivel de CO2: Medio    ");
  } else {
    lcd.setCursor(0,3);
    lcd.print("Nivel de CO2: Alto    ");
  }
  // delay aplicado entre leituras
  delay(5000);
}
