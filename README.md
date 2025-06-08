# ThermaPlus — Monitoramento Inteligente de Calor e Qualidade do Ar

📌 Nota: Projeto desenvolvido para fins acadêmicos na disciplina de Disruptive Architectures - IoT, IoB & Generative AI

![Imagem do Prototipo](/img/imagem-prototipo.png)

Diante do atual cenário de aumento da temperatura global, é essencial criar soluções que monitorem as condições ambientais locais, ajudando as pessoas a se protegerem de exposições prolongadas ao calor e a poluentes atmosféricos. O ThermalPlus visa esse propósito, combinando sensores e conectividade para oferecer alertas e dados em tempo real.

Através de sensores instalados em um dispositivo físico, o sistema coleta informações sobre temperatura, umidade e nível de gases no ambiente (ex. fumaça ou CO2), permitindo a visualização dessas informações tanto em um display local quanto em um aplicativo móvel.

## Integrantes

RM555679 - Lavinia Soo Hyun Park

Rm556242 - Giovanna Laturague Bueno

## Funcionalidades

- Leitura de Temperatura
- Leitura de Umidade
- Leitura do Nível de Gás
- Visualização local em tempo real
- Envio das informações coletadas para o aplicativo mobile

## Componentes Utilizados

- DHT22 (Sensor de temperatura e umidade)
- MQ2 (Sensor de gases)
- ESP32 (Microcontrolador com Wi-Fi)
- Display LCD 20x4 I2C

## Como executar o projeto

### Requisitos

- Arduino IDE ou PlatformiIO (VSCode)
- Placa ESP32
- Bibliotecas
    - DHT sensor library (Adafruit)
    - LiquidCrystal I2C (Frank de Brabander)
    - PubSubClient (Nick O'Leary)
    - ArduinoJson (Benoit Blanchon)

### Passo-a-Passo

1. Acessar o projeto do protótipo

**Link do Projeto Wokwi** : https://wokwi.com/projects/433064054962155521

ou

Rodar Localmente : Baixar o projeto e pegar a pasta /GS1-IOT-DEVICE-SIM

#### >> Como rodar localmente

1.1. Instale a IDE desejada

1.2. (Arduino IDE) Instale o suporte à placa ESP32

    - Arquivo > Preferências
    - URLs Adicionais para Gerenciadores de Placas
    - Adicione a URL: https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
    - Ferramentas > Placa > Gerenciador de Placas
    - Instale a ESP32

1.3. (Arduino IDE) Instale as bibliotecas necessárias

    - Sketch > Incluir Bibliotecas > Gerenciar Biliotecas
    - Busque e instale cada biblioteca citada acima
