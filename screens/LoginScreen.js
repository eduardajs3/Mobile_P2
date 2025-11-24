import React, {useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { verificarLogin } from '../database/database';
import { useFocusEffect } from '@react-navigation/native';


export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useFocusEffect(
    useCallback(() => {
      setUsername('');
      setPassword('');
      setErrorMessage('');
    }, [])
  );


  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage('Preencha todos os campos.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('A senha deve ter no mínimo 8 caracteres.');
      return;
    }

    try {
      const user = await verificarLogin(username, password);
      if (user) {
        setErrorMessage('');
        navigation.navigate('Home', { username });
      } else {
        setErrorMessage('Usuário ou senha incorretos.');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('Ocorreu um problema ao tentar logar.');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo</Text>
      <Text style={styles.subtitle}>Faça login para continuar</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Usuário</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu usuário"
          placeholderTextColor="#AFAFAF"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            setErrorMessage('');
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#AFAFAF"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrorMessage('');
          }}
        />
      </View>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.link}>Esqueci minha senha</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={[styles.link, { marginTop: 12 }]}>
          Criar nova conta
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 28,
    justifyContent: 'center',
  },

  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#4E342E', 
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 17,
    color: '#6D4C41',
    marginBottom: 40,
  },

  inputContainer: {
    marginBottom: 22,
  },

  inputLabel: {
    fontSize: 14,
    color: '#5D4037', 
    marginBottom: 6,
  },

  input: {
    fontSize: 17,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#A1887F', 
    color: '#3E2723', 
  },

  errorText: {
    color: '#B71C1C',
    fontSize: 14,
    marginTop: -12,
    marginBottom: 12,
  },

  button: {
    backgroundColor: '#795548', 
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,

    shadowColor: '#795548',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.3,
  },

  link: {
    color: '#795548', 
    fontSize: 15,
    textAlign: 'center',
    marginTop: 18,
  },
});
