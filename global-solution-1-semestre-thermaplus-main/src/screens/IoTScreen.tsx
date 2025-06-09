import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useMqtt } from '../context/MqttContext';

export const IoTScreen = () => {
  const { isConnected, iotData } = useMqtt();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dados do IoT</Text>
      <Text style={[styles.status, { color: isConnected ? 'green' : 'red' }]}>
        Status: {isConnected ? 'Conectado' : 'Desconectado'}
      </Text>
      
      {iotData ? (
        <View style={styles.dataContainer}>
          <View style={styles.dataItem}>
            <Text style={styles.label}>Temperatura</Text>
            <Text style={styles.value}>{iotData.temperatura}°C</Text>
          </View>
          
          <View style={styles.dataItem}>
            <Text style={styles.label}>Umidade</Text>
            <Text style={styles.value}>{iotData.umidade}%</Text>
          </View>
          
          <View style={styles.dataItem}>
            <Text style={styles.label}>Nível de Gás</Text>
            <Text style={styles.value}>{iotData.nivelGas} ppm</Text>
          </View>
          
          <Text style={styles.timestamp}>
            Última atualização: {new Date(iotData.timestamp).toLocaleString()}
          </Text>
        </View>
      ) : (
        <Text style={styles.noData}>Aguardando dados...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  status: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  dataContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dataItem: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 20,
    textAlign: 'center',
  },
  noData: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
}); 