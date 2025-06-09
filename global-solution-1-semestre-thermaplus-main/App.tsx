import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

// Screens
import { IoTScreen } from './src/screens/IoTScreen';
import { AlertsScreen } from './src/screens/AlertsScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { HealthTipsScreen } from './src/screens/HealthTipsScreen';
import { HistoryScreen } from './src/screens/HistoryScreen';

// Contexts
import { IotDataProvider } from './src/context/IotDataContext';
import { AuthProvider } from './src/context/AuthContext';

const Tab = createBottomTabNavigator();

const getIconName = (routeName: string, focused: boolean) => {
  const icons = {
    IoT: focused ? 'hardware-chip' : 'hardware-chip-outline',
    Alertas: focused ? 'notifications' : 'notifications-outline',
    Perfil: focused ? 'person' : 'person-outline',
    Dicas: focused ? 'medkit' : 'medkit-outline',
    Histórico: focused ? 'stats-chart' : 'stats-chart-outline',
  };
  return icons[routeName as keyof typeof icons] || 'help-circle';
};

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <IotDataProvider>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => (
                  <Ionicons 
                    name={getIconName(route.name, focused)} 
                    size={size} 
                    color={color} 
                  />
                ),
                tabBarActiveTintColor: '#2196F3',
                tabBarInactiveTintColor: 'gray',
                headerStyle: {
                  backgroundColor: '#2196F3',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              })}
            >
              <Tab.Screen 
                name="IoT" 
                component={IoTScreen}
                options={{ title: 'Monitoramento IoT' }}
              />
              <Tab.Screen 
                name="Dicas" 
                component={HealthTipsScreen}
                options={{ title: 'Dicas de Saúde' }}
              />
              <Tab.Screen 
                name="Histórico" 
                component={HistoryScreen}
                options={{ title: 'Histórico' }}
              />
              <Tab.Screen 
                name="Alertas" 
                component={AlertsScreen}
                options={{ title: 'Alertas' }}
              />
              <Tab.Screen 
                name="Perfil" 
                component={ProfileScreen}
                options={{ title: 'Perfil' }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </IotDataProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
