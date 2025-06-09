import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, SegmentedButtons } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

// Dados mockados para demonstração
const mockData = {
  hourly: {
    labels: ['12h', '13h', '14h', '15h', '16h', '17h'],
    datasets: [
      {
        data: [28, 30, 32, 31, 29, 28],
        color: () => '#ff4444',
      },
      {
        data: [65, 68, 70, 72, 71, 69],
        color: () => '#2196F3',
      },
      {
        data: [45, 48, 50, 52, 51, 49],
        color: () => '#ffbb33',
      },
    ],
  },
  daily: {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    datasets: [
      {
        data: [29, 30, 31, 32, 30, 29, 28],
        color: () => '#ff4444',
      },
      {
        data: [68, 70, 72, 71, 69, 68, 67],
        color: () => '#2196F3',
      },
      {
        data: [48, 50, 52, 51, 49, 48, 47],
        color: () => '#ffbb33',
      },
    ],
  },
  weekly: {
    labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
    datasets: [
      {
        data: [30, 31, 29, 28],
        color: () => '#ff4444',
      },
      {
        data: [70, 71, 69, 68],
        color: () => '#2196F3',
      },
      {
        data: [50, 51, 49, 48],
        color: () => '#ffbb33',
      },
    ],
  },
};

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

export const HistoryScreen = () => {
  const [timeRange, setTimeRange] = useState('hourly');
  const screenWidth = Dimensions.get('window').width;

  const getChartData = () => {
    switch (timeRange) {
      case 'hourly':
        return mockData.hourly;
      case 'daily':
        return mockData.daily;
      case 'weekly':
        return mockData.weekly;
      default:
        return mockData.hourly;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Histórico de Condições</Title>
        <Paragraph style={styles.headerSubtitle}>
          Acompanhe as variações ao longo do tempo
        </Paragraph>
      </View>

      <Card style={styles.chartCard}>
        <Card.Content>
          <SegmentedButtons
            value={timeRange}
            onValueChange={setTimeRange}
            buttons={[
              { value: 'hourly', label: 'Horas' },
              { value: 'daily', label: 'Dias' },
              { value: 'weekly', label: 'Semanas' },
            ]}
            style={styles.segmentedButtons}
          />

          <LineChart
            data={getChartData()}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />

          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#ff4444' }]} />
              <Paragraph>Temperatura (°C)</Paragraph>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#2196F3' }]} />
              <Paragraph>Umidade (%)</Paragraph>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#ffbb33' }]} />
              <Paragraph>Qualidade do Ar (%)</Paragraph>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.statsCard}>
        <Card.Content>
          <Title>Estatísticas</Title>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Paragraph style={styles.statLabel}>Máxima</Paragraph>
              <Paragraph style={styles.statValue}>32°C</Paragraph>
            </View>
            <View style={styles.statItem}>
              <Paragraph style={styles.statLabel}>Mínima</Paragraph>
              <Paragraph style={styles.statValue}>28°C</Paragraph>
            </View>
            <View style={styles.statItem}>
              <Paragraph style={styles.statLabel}>Média</Paragraph>
              <Paragraph style={styles.statValue}>30°C</Paragraph>
            </View>
          </View>
        </Card.Content>
      </Card>
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
  chartCard: {
    margin: 16,
    elevation: 4,
  },
  segmentedButtons: {
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  statsCard: {
    margin: 16,
    marginTop: 0,
    elevation: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
}); 