import * as React from 'react';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import das telas
import LoginScreen from './screens/LoginScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import IMCScreen from './screens/IMCScreen';
import TarefasScreen from './screens/TarefasScreen';
import FrasesScreen from './screens/FrasesScreen';
import SobreScreen from './screens/SobreScreen';
import ConversorScreen from './screens/ConversorScreen';

// Import banco de dados
import { criarTabelaUsers, criarTabelaTarefas } from './database/database';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    criarTabelaUsers()
      .then(() => console.log('Tabela de usuários criada!'))
      .catch(err => console.log('Erro ao criar tabela de usuários:', err));

    criarTabelaTarefas()
      .then(() => console.log('Tabela de tarefas criada!'))
      .catch(err => console.log('Erro ao criar tabela de tarefas:', err));
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ title: 'Redefinir Senha' }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Criar Conta' }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Menu Principal', headerBackVisible: false }}
        />
        <Stack.Screen
          name="Tarefas"
          component={TarefasScreen}
          options={{ title: 'Lista de Tarefas' }}
        />
        <Stack.Screen
          name="IMC"
          component={IMCScreen}
          options={{ title: 'IMC' }}
        />
        <Stack.Screen
          name="Frases"
          component={FrasesScreen}
          options={{ title: 'Frases' }}
        />
        <Stack.Screen
          name="Conversor"
          component={ConversorScreen}
          options={{ title: 'Conversor' }}
        />
        <Stack.Screen
          name="Sobre"
          component={SobreScreen}
          options={{ title: 'Sobre' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
