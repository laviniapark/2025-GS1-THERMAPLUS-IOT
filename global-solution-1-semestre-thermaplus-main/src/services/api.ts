import axios from 'axios';
import { Platform } from 'react-native';
import { Usuario, Alert, Regiao } from '../types';

// Função para determinar a URL base da API
const getBaseUrl = () => {
  if (Platform.OS === 'android') {
    return 'https://10.0.2.2:5182';
  }
  return 'https://localhost:5182';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor para logs de requisição
api.interceptors.request.use(
  (config) => {
    console.log('Requisição:', {
      url: `${config.baseURL}${config.url}`,
      method: config.method,
      data: config.data,
    });
    return config;
  },
  (error) => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptor para logs de resposta
api.interceptors.response.use(
  (response) => {
    console.log('Resposta:', {
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('Erro na resposta:', {
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      console.error('Erro de rede:', error.message);
    } else {
      console.error('Erro:', error.message);
    }
    return Promise.reject(error);
  }
);

// Função de teste para verificar a conexão
export const testConnection = async () => {
  try {
    const response = await api.get('/usuario/index');
    return response.data;
  } catch (error) {
    console.error('Erro ao conectar com a API:', error);
    throw error;
  }
};

export const userService = {
  getCurrentUser: async () => {
    const response = await api.get('/usuario/index');
    return response.data;
  },

  create: async (usuario: Usuario) => {
    const response = await api.post('/usuario/create', usuario);
    return response.data;
  },
  
  update: async (id: number, usuario: Usuario) => {
    const response = await api.put(`/usuario/update/${id}`, usuario);
    return response.data;
  },
  
  delete: async (id: number) => {
    await api.delete(`/usuario/delete/${id}`);
  }
};

export const alertService = {
  getAll: async () => {
    const response = await api.get('/alerta/index');
    return response.data;
  },
  
  create: async (alerta: Alert) => {
    const response = await api.post('/alerta/create', alerta);
    return response.data;
  },
  
  getByUser: async (userId: number) => {
    const response = await api.get(`/alerta/getbyuser/${userId}`);
    return response.data;
  }
};

export const regionService = {
  create: async (regiao: Regiao) => {
    const response = await api.post('/regiao/create', regiao);
    return response.data;
  },
  
  getByUser: async (userId: number) => {
    const response = await api.get(`/regiao/getbyuser/${userId}`);
    return response.data;
  },
  
  update: async (id: number, region: Regiao) => {
    const response = await api.put(`/regioes/${id}`, region);
    return response.data;
  },
  
  get: async (id: number) => {
    const response = await api.get(`/regioes/${id}`);
    return response.data;
  },
  
  delete: async (id: number) => {
    const response = await api.delete(`/regioes/${id}`);
    return response.data;
  }
}; 