import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [tempType, setTempType] = useState('');
  const [tempType1, setTempType1] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');

  const convertTemperature = () => {
    const value = parseFloat(inputValue);

    if (isNaN(value)) {
      setResult('Digite um número válido!');
      return;
    }

    if (tempType === '' || tempType1 === '' || tempType === '---' || tempType1 === '---') {
      setResult('Selecione as unidades!');
      return;
    }

    if (tempType === tempType1) {
      setResult(`${value.toFixed(2)} °${tempType}`);
      return;
    }

    let converted = 0;

    if (tempType === 'C' && tempType1 === 'F') converted = value * 9 / 5 + 32;
    else if (tempType === 'C' && tempType1 === 'K') converted = value + 273.15;
    else if (tempType === 'F' && tempType1 === 'C') converted = (value - 32) * 5 / 9;
    else if (tempType === 'F' && tempType1 === 'K') converted = (value - 32) * 5 / 9 + 273.15;
    else if (tempType === 'K' && tempType1 === 'C') converted = value - 273.15;
    else if (tempType === 'K' && tempType1 === 'F') converted = (value - 273.15) * 9 / 5 + 32;

    setResult(`${converted.toFixed(2)} °${tempType1}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Conversor de Temperatura</Text>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Digite o valor"
          placeholderTextColor="#A68A7A"
          value={inputValue}
          onChangeText={setInputValue}
        />

        <Text style={styles.label}>Converter de:</Text>
        <View style={styles.pickerBox}>
          <Picker
            selectedValue={tempType}
            onValueChange={setTempType}
            style={styles.picker}
            dropdownIconColor="#5B3A29"
          >
            <Picker.Item label="Selecionar" value="---" />
            <Picker.Item label="Celsius" value="C" />
            <Picker.Item label="Fahrenheit" value="F" />
            <Picker.Item label="Kelvin" value="K" />
          </Picker>
        </View>

        <Text style={styles.label}>Para:</Text>
        <View style={styles.pickerBox}>
          <Picker
            selectedValue={tempType1}
            onValueChange={setTempType1}
            style={styles.picker}
            dropdownIconColor="#5B3A29"
          >
            <Picker.Item label="Selecionar" value="---" />
            <Picker.Item label="Celsius" value="C" />
            <Picker.Item label="Fahrenheit" value="F" />
            <Picker.Item label="Kelvin" value="K" />
          </Picker>
        </View>

        <Pressable style={styles.button} onPress={convertTemperature}>
          <Text style={styles.buttonText}>Converter</Text>
        </Pressable>

        {result !== '' && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>{result}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
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

  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5B3A29',
    marginTop: 12,
  },

  input: {
    backgroundColor: '#F5EFE6',
    borderRadius: 15,
    borderWidth: 1.2,
    borderColor: '#D8C7B0',
    height: 50,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 15,
    color: '#5B3A29',
  },

  pickerBox: {
    borderWidth: 1.2,
    borderColor: '#D8C7B0',
    backgroundColor: '#F5EFE6',
    borderRadius: 15,
    marginTop: 5,
    marginBottom: 10,
    overflow: 'hidden',
  },

  picker: {
    height: 50,
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
    backgroundColor: '#FDF7F0',
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
    textAlign: 'center',
  },
});
