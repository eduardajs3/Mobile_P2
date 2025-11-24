import React from 'react';
import { View, Text, StyleSheet, Linking, ScrollView, Pressable } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sobre o Aplicativo</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Finalidade</Text>
        <Text style={styles.text}>
          Este aplicativo tem como propósito oferecer ferramentas simples e úteis para o dia a dia.
          Ele reúne funções como cálculo de IMC, lista de tarefas, frases motivacionais e conversão de temperatura, 
           permitindo que o usuário acesse tudo de forma rápida, prática e organizada.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Recursos</Text>
        <Text style={styles.text}>
          
          • Cálculo de IMC{'\n'}
          • Lista de tarefas com criação, atualização e exclusão{'\n'}
          • Frases motivacionais exibidas aleatoriamente{'\n'}
          • Conversão de temperatura{'\n'}
          • Armazenamento local (Local Storage / AsyncStorage){'\n'}
          • Navegação simples e intuitiva{'\n'}
          • Interface moderna, leve e responsiva
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Desenvolvedora</Text>
        <Text style={styles.text}>
          Nome: Eduarda Josileide da Silva{'\n'}
      
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Contato</Text>
        <Text style={styles.text}>Email: eduardajosileide321.com</Text>

        <Pressable
          style={styles.linkButton}
          onPress={() => Linking.openURL('https://www.linkedin.com/in/eduarda-josileide-49028b324?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app')}
        >
          <Text style={styles.linkText}>LinkedIn</Text>
        </Pressable>

        
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Eduarda Josileide da Silva</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
    backgroundColor: '#FFFF',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5B3A29',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    width: '100%',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: '#7B4F36',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  linkButton: {
    backgroundColor: '#7B4F36',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  linkText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
  },
});
