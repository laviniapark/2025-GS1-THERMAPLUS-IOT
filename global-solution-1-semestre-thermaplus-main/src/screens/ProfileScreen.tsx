import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text, Card, Title, Paragraph, useTheme } from 'react-native-paper';
import { userService, regionService, testConnection } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { User } from '../types/user';
import { Region, Estado } from '../types/region';
import { Picker } from '@react-native-picker/picker';

export const ProfileScreen = () => {
  const theme = useTheme();
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);

  // Estados para região
  const [regionData, setRegionData] = useState<Region>({
    estado: 'SP',
    cidade: ''
  });
  const [regionCreated, setRegionCreated] = useState(false);
  const [regionId, setRegionId] = useState<number | null>(null);

  // Estados para usuário
  const [formData, setFormData] = useState({
    nome: '',
    idade: 0,
    doenca: '',
    regiaoId: 0
  });

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await userService.getCurrentUser();
      if (currentUser) {
        updateUser(currentUser);
        setFormData({
          nome: currentUser.nome || '',
          idade: currentUser.idade || 0,
          doenca: currentUser.doenca || '',
          regiaoId: currentUser.regiaoId || 0
        });
        setRegionCreated(true);
        setRegionId(currentUser.regiaoId);
      }
    } catch (error) {
      console.log('Usuário não encontrado, iniciando fluxo de cadastro');
    }
  };

  const handleTestConnection = async () => {
    setTestingConnection(true);
    try {
      const result = await testConnection();
      Alert.alert('Sucesso', 'Conexão com o backend estabelecida com sucesso!');
      console.log('Resultado do teste:', result);
    } catch (error) {
      console.error('Erro no teste de conexão:', error);
      Alert.alert(
        'Erro',
        'Não foi possível conectar ao backend. Verifique se o servidor está rodando e se a URL está correta.'
      );
    } finally {
      setTestingConnection(false);
    }
  };

  const handleRegionSubmit = async () => {
    if (!regionData.cidade.trim()) {
      Alert.alert('Erro', 'Por favor, preencha a cidade');
      return;
    }

    setLoading(true);
    try {
      const response = await regionService.create(regionData);
      setRegionId(response.regiaoId);
      setRegionCreated(true);
      setFormData(prev => ({ ...prev, regiaoId: response.regiaoId }));
      Alert.alert('Sucesso', 'Região cadastrada com sucesso!');
    } catch (error) {
      console.error('Error creating region:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar a região');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.nome || !formData.doenca) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (formData.idade <= 0) {
      Alert.alert('Erro', 'Por favor, insira uma idade válida');
      return;
    }

    if (!regionId) {
      Alert.alert('Erro', 'Por favor, cadastre uma região primeiro');
      return;
    }

    setLoading(true);
    try {
      const userData: User = {
        nome: formData.nome,
        idade: formData.idade,
        doenca: formData.doenca,
        regiaoId: regionId
      };

      if (user?.usuarioId) {
        // Atualização
        await userService.update(user.usuarioId, userData);
        updateUser({ ...user, ...userData });
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
      } else {
        // Novo cadastro
        const response = await userService.create(userData);
        updateUser(response);
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      }
      setEditing(false);
    } catch (error) {
      console.error('Error saving user:', error);
      Alert.alert('Erro', 'Não foi possível salvar os dados');
    } finally {
      setLoading(false);
    }
  };

  if (!regionCreated) {
    return (
      <ScrollView style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Cadastro de Região</Title>
            <Paragraph style={styles.subtitle}>
              Primeiro, vamos cadastrar sua região
            </Paragraph>

            <Button
              mode="outlined"
              onPress={handleTestConnection}
              loading={testingConnection}
              disabled={testingConnection}
              style={styles.testButton}
            >
              Testar Conexão com Backend
            </Button>

            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Estado:</Text>
              <Picker
                selectedValue={regionData.estado}
                onValueChange={(value: Estado) => setRegionData(prev => ({ ...prev, estado: value }))}
                style={styles.picker}
              >
                <Picker.Item label="Acre" value="AC" />
                <Picker.Item label="Alagoas" value="AL" />
                <Picker.Item label="Amapá" value="AP" />
                <Picker.Item label="Amazonas" value="AM" />
                <Picker.Item label="Bahia" value="BA" />
                <Picker.Item label="Ceará" value="CE" />
                <Picker.Item label="Distrito Federal" value="DF" />
                <Picker.Item label="Espírito Santo" value="ES" />
                <Picker.Item label="Goiás" value="GO" />
                <Picker.Item label="Maranhão" value="MA" />
                <Picker.Item label="Mato Grosso" value="MT" />
                <Picker.Item label="Mato Grosso do Sul" value="MS" />
                <Picker.Item label="Minas Gerais" value="MG" />
                <Picker.Item label="Pará" value="PA" />
                <Picker.Item label="Paraíba" value="PB" />
                <Picker.Item label="Paraná" value="PR" />
                <Picker.Item label="Pernambuco" value="PE" />
                <Picker.Item label="Piauí" value="PI" />
                <Picker.Item label="Rio de Janeiro" value="RJ" />
                <Picker.Item label="Rio Grande do Norte" value="RN" />
                <Picker.Item label="Rio Grande do Sul" value="RS" />
                <Picker.Item label="Rondônia" value="RO" />
                <Picker.Item label="Roraima" value="RR" />
                <Picker.Item label="Santa Catarina" value="SC" />
                <Picker.Item label="São Paulo" value="SP" />
                <Picker.Item label="Sergipe" value="SE" />
                <Picker.Item label="Tocantins" value="TO" />
              </Picker>
            </View>

            <TextInput
              label="Cidade"
              value={regionData.cidade}
              onChangeText={(text) => setRegionData(prev => ({ ...prev, cidade: text }))}
              style={styles.input}
              mode="outlined"
            />

            <Button
              mode="contained"
              onPress={handleRegionSubmit}
              loading={loading}
              disabled={loading}
              style={styles.button}
            >
              Cadastrar Região
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Perfil do Usuário</Title>
          <Paragraph style={styles.subtitle}>
            {user ? 'Gerencie suas informações pessoais' : 'Complete seu cadastro'}
          </Paragraph>

          <Button
            mode="outlined"
            onPress={handleTestConnection}
            loading={testingConnection}
            disabled={testingConnection}
            style={styles.testButton}
          >
            Testar Conexão com Backend
          </Button>

          <TextInput
            label="Nome"
            value={formData.nome}
            onChangeText={(text) => setFormData(prev => ({ ...prev, nome: text }))}
            style={styles.input}
            mode="outlined"
            disabled={!editing && !!user}
          />

          <TextInput
            label="Idade"
            value={formData.idade.toString()}
            onChangeText={(text) => setFormData(prev => ({ ...prev, idade: parseInt(text) || 0 }))}
            style={styles.input}
            mode="outlined"
            keyboardType="numeric"
            disabled={!editing && !!user}
          />

          <TextInput
            label="Doença"
            value={formData.doenca}
            onChangeText={(text) => setFormData(prev => ({ ...prev, doenca: text }))}
            style={styles.input}
            mode="outlined"
            disabled={!editing && !!user}
          />

          {user ? (
            <View style={styles.buttonContainer}>
              {editing ? (
                <>
                  <Button
                    mode="contained"
                    onPress={handleSubmit}
                    loading={loading}
                    disabled={loading}
                    style={[styles.button, styles.saveButton]}
                  >
                    Salvar
                  </Button>
                  <Button
                    mode="outlined"
                    onPress={() => setEditing(false)}
                    style={styles.button}
                  >
                    Cancelar
                  </Button>
                </>
              ) : (
                <Button
                  mode="contained"
                  onPress={() => setEditing(true)}
                  style={styles.button}
                >
                  Editar Perfil
                </Button>
              )}
            </View>
          ) : (
            <Button
              mode="contained"
              onPress={handleSubmit}
              loading={loading}
              disabled={loading}
              style={styles.button}
            >
              Cadastrar
            </Button>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2196F3',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: '#2196F3',
  },
  pickerContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    marginLeft: 8,
  },
  picker: {
    height: 50,
  },
  testButton: {
    marginBottom: 16,
    borderColor: '#2196F3',
  },
}); 