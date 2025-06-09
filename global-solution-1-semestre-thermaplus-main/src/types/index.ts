export interface Usuario {
  id?: number;
  nome: string;
  idade: number;
  doenca: string;
}

export interface Alert {
  mensagem: string;
}

export interface IoTData {
  temperatura: number;
  umidade: number;
  nivelGas: number;
}

export interface Regiao {
  id?: number;
  estado: string;
  cidade: string;
} 