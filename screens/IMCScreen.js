import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';

export default function IMCScreen() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState(null);
  const [diag, setDiag] = useState('');

  const calcularIMC = () => {
    if (peso && altura) {
      const pesoNum = parseFloat(peso.replace(',', '.'));
      const alturaNum = parseFloat(altura.replace(',', '.'));
      const imc = pesoNum / (alturaNum * alturaNum);
      setResultado(imc.toFixed(2));

      if (imc < 18.5) setDiag("Magreza");
      else if (imc < 25) setDiag("Normal");
      else if (imc < 30) setDiag("Sobrepeso");
      else if (imc < 40) setDiag("Obesidade");
      else setDiag("Obesidade Grave");
    } else {
      alert("Por favor, digite o peso e altura corretamente");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Calcule seu IMC</Text>

        <TextInput
          style={styles.input}
          placeholder="Peso (kg)"
          placeholderTextColor="#A18466"
          keyboardType="numeric"
          value={peso}
          onChangeText={setPeso}
        />

        <TextInput
          style={styles.input}
          placeholder="Altura (m)"
          placeholderTextColor="#A18466"
          keyboardType="numeric"
          value={altura}
          onChangeText={setAltura}
        />

        <Pressable style={styles.button} onPress={calcularIMC}>
          <Text style={styles.buttonText}>CALCULAR</Text>
        </Pressable>

        {resultado && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>IMC: {resultado}</Text>
            <Text style={styles.resultText}>Diagnóstico: {diag}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // fundo branco
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF', // cartão branco
    borderRadius: 25,
    padding: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5B3A29',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F5EFE6', // cor leve para input
    borderRadius: 15,
    borderWidth: 1.2,
    borderColor: '#D8C7B0',
    height: 50,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 15,
    color: '#5B3A29',
  },
  button: {
    backgroundColor: '#7B4F36',
    borderRadius: 15,
    paddingVertical: 14,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 25,
    backgroundColor: '#FDF7F0', // leve contraste
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D8C7B0',
  },
  resultText: {
    fontSize: 22,
    color: '#5B3A29',
    fontWeight: '600',
    marginVertical: 4,
    textAlign: 'center',
  },
});
