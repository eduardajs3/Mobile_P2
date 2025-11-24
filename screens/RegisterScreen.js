import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { usuarioExiste, criarUsuario } from '../database/database';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async () => {
    setSuccessMessage('');

    if (!username || !password || !confirmPassword) {
      setErrorMessage('Preencha todos os campos.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('A senha deve ter no mínimo 8 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem.');
      return;
    }

    try {
      const exists = await usuarioExiste(username);
      if (exists) {
        setErrorMessage('Usuário já existe!');
        return;
      }

      await criarUsuario(username, password);
      setErrorMessage('');
      setSuccessMessage('Conta criada com sucesso!');

      setTimeout(() => {
        navigation.navigate('Login');
      }, 1500);

    } catch (error) {
      console.log(error);
      setErrorMessage('Ocorreu um problema ao criar a conta.');
    }
  };


  return (
    <View style={styles.container}>

      <Text style={styles.title}>Criar Conta</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Usuário</Text>
        <TextInput
          style={styles.input}
          placeholder="Escolha um nome de usuário"
          placeholderTextColor="#AFAFAF"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            setErrorMessage('');
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha</Text>
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

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirmar senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Repita sua senha"
          placeholderTextColor="#AFAFAF"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setErrorMessage('');
          }}
        />
      </View>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Voltar ao login</Text>
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
    fontSize: 32,
    fontWeight: '700',
    color: '#4E342E', 
    textAlign: 'center',
    marginBottom: 35,
  },

  inputContainer: {
    marginBottom: 22,
  },

  label: {
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

  error: {
    color: '#B71C1C', 
    marginTop: -10,
    marginBottom: 12,
    fontSize: 14,
  },

  success: {
    color: '#2E7D32', 
    marginTop: -10,
    marginBottom: 12,
    fontSize: 14,
  },

  button: {
    backgroundColor: '#795548', 
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',

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
  },

  link: {
    color: '#795548',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 20,
  },
});
