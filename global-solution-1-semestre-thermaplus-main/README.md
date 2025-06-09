# Therma Plus - Monitoramento de Saúde IoT

O Therma Plus é um aplicativo móvel desenvolvido em React Native que monitora condições ambientais e de saúde através de sensores IoT. O aplicativo permite que usuários monitorem temperatura, umidade e níveis de gás em tempo real, recebendo alertas quando as condições ultrapassam limites seguros.

## Integrantes

RM555679 - Lavinia Soo Hyun Park

RM556242 - Giovanna Laturague Bueno

## 📁 Estrutura do Projeto

O projeto é dividido em duas partes principais:

1. **Frontend (React Native)**
   - Aplicativo móvel para monitoramento
   - Interface do usuário
   - Comunicação com o backend

2. **Backend (.NET)**
   - API REST para gerenciamento de dados
   - Processamento de dados dos sensores
   - Banco de dados

## 🚀 Funcionalidades

- **Monitoramento IoT em Tempo Real**
  - Visualização de temperatura ambiente
  - Monitoramento de umidade
  - Detecção de níveis de gás
  - Gráficos de histórico de dados

- **Sistema de Alertas**
  - Notificações personalizadas
  - Alertas baseados em condições ambientais
  - Histórico de alertas

- **Perfil do Usuário**
  - Cadastro de informações pessoais
  - Registro de região (estado e cidade)
  - Histórico de condições ambientais

- **Dicas de Saúde**
  - Recomendações baseadas nas condições ambientais
  - Dicas personalizadas para cada usuário

## 📋 Pré-requisitos

### Frontend
- Node.js (versão 18 ou superior)
- npm
- Expo CLI

### Backend
- .NET 8.0 SDK
- Visual Studio 2022 ou Visual Studio Code
- SQL Server (ou outro banco de dados compatível)

## 🔧 Instalação

### Frontend (React Native)

1. Clone o repositório:
```bash
git clone https://github.com/FIAP-MOBILE/global-solution-1-semestre-thermaplus.git
cd global-solution-1-semestre-thermaplus
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o projeto:
```bash
npm start
```

4. Use o Expo Go no seu dispositivo móvel para escanear o QR code que aparecerá no terminal.

### Backend (.NET)

1. Clone o repositório do backend:
```bash
git clone https://github.com/laviniapark/2025-GS1-THERMAPLUS-ABD.git
```

2. Abra o projeto no Visual Studio ou Visual Studio Code

3. Restaure os pacotes NuGet:
```bash
dotnet restore
```

4. Execute o projeto:
```bash
dotnet run
```

O backend estará disponível em `http://localhost:5182`

### IOT

Acesse o projeto no seguinte link: https://wokwi.com/projects/433064054962155521

## 🔌 Configuração do Backend

1. Certifique-se de que o backend .NET está rodando na porta 5182
2. Para emuladores Android, a URL base será automaticamente ajustada para `10.0.2.2:5182`
3. Para dispositivos iOS ou desenvolvimento, use `localhost:5182`

## 📱 Telas do Aplicativo

1. **IoT**
   - Monitoramento em tempo real
   - Gráficos de dados
   - Status dos sensores

2. **Alertas**
   - Lista de alertas ativos
   - Histórico de notificações
   - Configurações de alerta

3. **Perfil**
   - Informações do usuário
   - Configurações de região
   - Histórico de dados

4. **Dicas de Saúde**
   - Recomendações personalizadas
   - Artigos informativos
   - Dicas baseadas em condições

5. **Histórico**
   - Gráficos de histórico
   - Análise de tendências
   - Exportação de dados

## 🛠️ Tecnologias Utilizadas

### Frontend
- React Native
- Expo
- TypeScript
- React Navigation
- React Native Paper
- Axios
- React Native Chart Kit
- MQTT (para comunicação IoT)

### Backend
- .NET 8.0
- Entity Framework Core
- SQL Server
- Swagger/OpenAPI
- CORS
