import React from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { useMqtt } from '../context/MqttContext';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

export const HealthTipsScreen = () => {
  const { iotData } = useMqtt();

  const getHealthTips = () => {
    if (!iotData) return [];

    const tips = [];

    // Dicas baseadas na temperatura
    if (iotData.temperatura > 30) {
      tips.push({
        title: 'Calor Extremo',
        description: 'Mantenha-se hidratado! Beba pelo menos 2L de água por dia e evite atividades físicas intensas.',
        icon: '🌡️',
        severity: 'high'
      });
    } else if (iotData.temperatura > 25) {
      tips.push({
        title: 'Temperatura Elevada',
        description: 'Use roupas leves e claras. Evite exposição prolongada ao sol entre 10h e 16h.',
        icon: '☀️',
        severity: 'medium'
      });
    }

    // Dicas baseadas na umidade
    if (iotData.umidade > 80) {
      tips.push({
        title: 'Umidade Alta',
        description: 'Use desumidificador se possível. Mantenha janelas abertas para circulação de ar.',
        icon: '💧',
        severity: 'high'
      });
    } else if (iotData.umidade > 60) {
      tips.push({
        title: 'Umidade Moderada',
        description: 'Mantenha-se seco e troque de roupas se estiver suado.',
        icon: '🌫️',
        severity: 'medium'
      });
    }

    // Dicas baseadas no nível de gás
    if (iotData.nivelGas > 70) {
      tips.push({
        title: 'Qualidade do Ar Comprometida',
        description: 'Use máscara ao sair. Evite atividades ao ar livre.',
        icon: '😷',
        severity: 'high'
      });
    }

    // Dicas gerais
    tips.push({
      title: 'Dica Geral',
      description: 'Monitore sua pressão arterial regularmente em dias de calor extremo.',
      icon: '❤️',
      severity: 'low'
    });

    return tips;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return '#ff4444';
      case 'medium':
        return '#ffbb33';
      case 'low':
        return '#00C851';
      default:
        return '#2196F3';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dicas de Saúde</Text>
        <Text style={styles.headerSubtitle}>
          Recomendações baseadas nas condições atuais
        </Text>
      </View>

      {iotData && (
        <Card style={styles.currentConditions}>
          <Card.Content>
            <Title>Condições Atuais</Title>
            <Paragraph>Temperatura: {iotData.temperatura}°C</Paragraph>
            <Paragraph>Umidade: {iotData.umidade}%</Paragraph>
            <Paragraph>Qualidade do Ar: {iotData.nivelGas}%</Paragraph>
          </Card.Content>
        </Card>
      )}

      {getHealthTips().map((tip, index) => (
        <Card key={index} style={[styles.tipCard, { borderLeftColor: getSeverityColor(tip.severity) }]}>
          <Card.Content>
            <View style={styles.tipHeader}>
              <Text style={styles.tipIcon}>{tip.icon}</Text>
              <Title style={styles.tipTitle}>{tip.title}</Title>
            </View>
            <Paragraph style={styles.tipDescription}>{tip.description}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => Alert.alert('Mais Informações', 'Consulte um médico se os sintomas persistirem.')}>
              Saiba Mais
            </Button>
          </Card.Actions>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#2196F3',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
  },
  currentConditions: {
    margin: 16,
    elevation: 4,
  },
  tipCard: {
    margin: 16,
    marginTop: 8,
    borderLeftWidth: 4,
    elevation: 2,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tipDescription: {
    fontSize: 16,
    lineHeight: 24,
  },
}); 