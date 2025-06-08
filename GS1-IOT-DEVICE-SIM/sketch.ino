#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include <Wire.h>
#include <ArduinoJson.h>
#include <LiquidCrystal_I2C.h>
#include <WiFi.h>
#include <PubSubClient.h>

// Configurações do Hardware
#define DHTTYPE      DHT22
#define MQ2PIN 34
#define DHTPIN 23
#define PUBLISH_DELAY 5000

// Configuração do WIFI
const char *SSID = "Wokwi-GUEST";
const char *PASSWORD = "";

// Configuração do MQTT
const char *BROKER_MQTT = "broker.hivemq.com";
const int BROKER_PORT = 1883;
const char *ID_MQTT = "esp32_thermal_plus";
const char *TOPIC_PUBLISH_THG = "thermalplus/iot/infos";

// Struct para envio de dados
struct SensorData {
  int temperatura;
  int umidade;
  int nivelGas;
};

// Variáveis globais
DHT_Unified dht(DHTPIN, DHTTYPE);
LiquidCrystal_I2C lcd(0x27, 20, 4);
WiFiClient espClient;
PubSubClient MQTT(espClient);
unsigned long publishUpdate = 0;
SensorData sensorValues;
const int TAMANHO = 200;
int uTemperatura = NAN;
int uUmidade = NAN;
int uNivelGas = NAN;

// Protótipos de funções
void updateSensorValues();
void initWifi();
void initMQTT();
void reconnectWifi();
void reconnectMQTT();
void checkWifiAndMQTT();

void updateSensorValues() {
// leitura da temperatura do dispositivo DHT22
  sensors_event_t event;
  dht.temperature().getEvent(&event);
  if (isnan(event.temperature))
  {
    Serial.println("Erro na leitura da Temperatura!");
    sensorValues.temperatura = NAN;
  }
  else
  {
    sensorValues.temperatura = event.temperature;
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
    sensorValues.umidade = NAN;
  }
  else
  {
    sensorValues.umidade = event.relative_humidity;
    lcd.setCursor(0,2);
    lcd.print("Umidade: ");
    lcd.print(event.relative_humidity);
    lcd.print("%    ");
  }
  
  // Leitura do nivel de gas do dispositivo MQ2
  sensorValues.nivelGas = analogRead(MQ2PIN);
	
	if (sensorValues.nivelGas < 1366) {
    lcd.setCursor(0,3);
    lcd.print("Nivel de CO2: Baixo    ");
  } else if(sensorValues.nivelGas < 2731){
    lcd.setCursor(0,3);
    lcd.print("Nivel de CO2: Medio    ");
  } else {
    lcd.setCursor(0,3);
    lcd.print("Nivel de CO2: Alto    ");
  }
}

// Função - Conectar WIFI
void initWifi() {
  Serial.print("Conectando com a rede: ");
  Serial.println(SSID);
  WiFi.begin(SSID, PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
  delay(100);
  Serial.print(".");
  }

  Serial.println();
  Serial.print("Conectado com sucesso: ");
  Serial.println(SSID);
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
}

// Função - Iniciar o MQTT
void initMQTT() {
  MQTT.setServer(BROKER_MQTT, BROKER_PORT);
}

void reconnectWifi() {
  if (WiFi.status() == WL_CONNECTED)
    return;

  WiFi.begin(SSID, PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.print(".");
  }

  Serial.println();
  Serial.print("Wifi conectado com sucesso");
  Serial.print(SSID);
  Serial.println("IP: ");
  Serial.println(WiFi.localIP());
}

void reconnectMQTT() {
  while (!MQTT.connected()) {
    Serial.print("Tentando conectar com o Broker MQTT: ");
    Serial.println(BROKER_MQTT);

    if (MQTT.connect(ID_MQTT)) {
      Serial.println("Conectado ao broker MQTT!");
    } else {
      Serial.println("Falha na conexão com MQTT. Tentando novamente em 2 segundos.");
      delay(2000);
    }
  }
}

void checkWifiAndMQTT() {
  if (WiFi.status() != WL_CONNECTED) reconnectWifi();
  if (!MQTT.connected()) reconnectMQTT();
}

void setup() {
  Wire.begin(21, 22);
  Serial.begin(115200);
  initWifi();
  initMQTT();

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
  checkWifiAndMQTT();
  MQTT.loop();

  if ((millis() - publishUpdate) >= PUBLISH_DELAY) {
    publishUpdate = millis();
    updateSensorValues();

    bool mudou =
      sensorValues.temperatura != uTemperatura ||
      sensorValues.umidade != uUmidade ||
      sensorValues.nivelGas != uNivelGas;
    
    if (!isnan(sensorValues.temperatura) && !isnan(sensorValues.umidade) && mudou) {
      uTemperatura = sensorValues.temperatura;
      uUmidade = sensorValues.umidade;
      uNivelGas = sensorValues.nivelGas;

      JsonDocument doc;
      doc["temperatura"] = sensorValues.temperatura;
      doc["umidade"] = sensorValues.umidade;
      doc["nivel_gas"] = sensorValues.nivelGas;

      char buffer[TAMANHO];
      serializeJson(doc, buffer);
      MQTT.publish(TOPIC_PUBLISH_THG, buffer);
      Serial.println(buffer);
    }
  }
}
