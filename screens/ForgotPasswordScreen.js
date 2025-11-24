import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { usuarioExiste, redefinirSenha } from '../database/database';

export default function ForgotPasswordScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleReset = async () => {
    setSuccessMessage('');

    if (!username || !newPassword || !confirmPassword) {
      setErrorMessage('Preencha todos os campos.');
      return;
    }

    // 🔒 Verificação de mínimo de caracteres
    if (newPassword.length < 8) {
      setErrorMessage('A senha deve ter no mínimo 8 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('As senhas não coincidem.');
      return;
    }

    try {
      const user = await usuarioExiste(username);
      if (!user) {
        setErrorMessage('Usuário não encontrado.');
        return;
      }

      await redefinirSenha(username, newPassword);
      setErrorMessage('');
      setSuccessMessage('Senha redefinida com sucesso!');

      setTimeout(() => {
        navigation.navigate('Login');
      }, 1500);

    } catch (error) {
      console.log(error);
      setErrorMessage('Ocorreu um problema ao redefinir a senha.');
    }
  };


  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Redefinir Senha</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Usuário</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu usuário"
          placeholderTextColor="#AFAFAF"
          value={username}
          onChangeText={text => {
            setUsername(text);
            setErrorMessage('');
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nova senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a nova senha"
          placeholderTextColor="#AFAFAF"
          secureTextEntry
          value={newPassword}
          onChangeText={text => {
            setNewPassword(text);
            setErrorMessage('');
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirmar senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirme a nova senha"
          placeholderTextColor="#AFAFAF"
          secureTextEntry
          value={confirmPassword}
          onChangeText={text => {
            setConfirmPassword(text);
            setErrorMessage('');
          }}
        />
      </View>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Redefinir senha</Text>
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
    paddingHorizontal: 26,
    justifyContent: 'center',
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#4E342E', // marrom elegante
    textAlign: 'center',
    marginBottom: 35,
  },

  inputContainer: {
    marginBottom: 22,
  },

  label: {
    fontSize: 14,
    color: '#6D4C41', // marrom suave
    marginBottom: 6,
  },

  input: {
    fontSize: 17,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#A1887F', // marrom claro premium
    color: '#3E2723', // marrom escuro
  },

  error: {
    color: '#B71C1C',
    marginBottom: 10,
    fontSize: 14,
  },

  success: {
    color: '#2E7D32',
    marginBottom: 10,
    fontSize: 14,
  },

  button: {
    backgroundColor: '#795548', // marrom principal
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
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },

  link: {
    color: '#795548', // marrom moderno
    fontSize: 15,
    textAlign: 'center',
    marginTop: 20,
  },
});
