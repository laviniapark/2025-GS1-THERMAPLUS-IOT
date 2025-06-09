import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Card, Title, Text, Button, useTheme, Divider } from 'react-native-paper';
import { useIotData } from '../context/IotDataContext';
import { Ionicons } from '@expo/vector-icons';

type AlertType = 'temperature' | 'humidity' | 'gas';
type AlertSeverity = 'high' | 'medium' | 'low';

interface Alert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  message: string;
  timestamp: string;
  value: number;
}

// Dados mockados para teste
const mockData = {
  temperature: 36.5, // Temperatura alta para gerar alerta
  humidity: 65,      // Umidade baixa para gerar alerta
  gasLevel: 1800,    // Nível de gás baixo para gerar alerta
  timestamp: new Date().toISOString()
};

export const AlertsScreen = () => {
  const theme = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const { iotData, fetchIotData } = useIotData();
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const generateAlerts = (data: typeof mockData): Alert[] => {
    const newAlerts: Alert[] = [];

    // Alerta de temperatura alta
    if (data.temperature > 35) {
      newAlerts.push({
        id: 'temp-1',
        type: 'temperature',
        severity: 'high',
        message: 'Temperatura extremamente alta detectada!',
        timestamp: data.timestamp,
        value: data.temperature
      });
    }

    // Alerta de umidade baixa
    if (data.humidity < 70) {
      newAlerts.push({
        id: 'hum-1',
        type: 'humidity',
        severity: 'medium',
        message: 'Nível de umidade abaixo do recomendado',
        timestamp: data.timestamp,
        value: data.humidity
      });
    }

    // Alerta de nível de gás baixo
    if (data.gasLevel < 2000) {
      newAlerts.push({
        id: 'gas-1',
        type: 'gas',
        severity: 'low',
        message: 'Nível de gás abaixo do normal',
        timestamp: data.timestamp,
        value: data.gasLevel
      });
    }

    return newAlerts;
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simula uma atualização dos dados
    setTimeout(() => {
      setAlerts(generateAlerts(mockData));
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    setAlerts(generateAlerts(mockData));
  }, []);

  const getSeverityColor = (severity: AlertSeverity) => {
    switch (severity) {
      case 'high':
        return '#f44336';
      case 'medium':
        return '#ff9800';
      case 'low':
        return '#4caf50';
      default:
        return '#757575';
    }
  };

  const getSeverityText = (severity: AlertSeverity) => {
    switch (severity) {
      case 'high':
        return 'Alto';
      case 'medium':
        return 'Médio';
      case 'low':
        return 'Baixo';
      default:
        return 'Desconhecido';
    }
  };

  const getAlertIcon = (type: AlertType): keyof typeof Ionicons.glyphMap => {
    switch (type) {
      case 'temperature':
        return 'thermometer';
      case 'humidity':
        return 'water';
      case 'gas':
        return 'alert';
      default:
        return 'alert';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {alerts.map((alert) => (
          <Card key={alert.id} style={styles.card}>
            <Card.Content>
              <View style={styles.header}>
                <View style={styles.titleContainer}>
                  <Ionicons
                    name={getAlertIcon(alert.type)}
                    size={24}
                    color={getSeverityColor(alert.severity)}
                  />
                  <Title style={styles.title}>{alert.message}</Title>
                </View>
                <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(alert.severity) }]}>
                  <Text style={styles.severityText}>{getSeverityText(alert.severity)}</Text>
                </View>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.details}>
                <View style={styles.detailItem}>
                  <Text style={styles.label}>Valor:</Text>
                  <Text style={styles.value}>{alert.value}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.label}>Horário:</Text>
                  <Text style={styles.value}>
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </Text>
                </View>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="text"
                onPress={() => {}}
                icon="information"
              >
                Mais Informações
              </Button>
              <Button
                mode="contained"
                onPress={() => {}}
                icon="check"
                style={{ backgroundColor: getSeverityColor(alert.severity) }}
              >
                Resolver
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    marginLeft: 8,
    fontSize: 16,
    flex: 1,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 8,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  detailItem: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: '#666',
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
}); 