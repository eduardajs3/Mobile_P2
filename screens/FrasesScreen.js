import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [frase, setFrase] = useState("Toque no botão para gerar ");
  
  const frases = [
    "O futuro é criado pelas decisões que você toma hoje.",
    "Pequenos passos constroem grandes conquistas.",
    "Sua melhor versão começa agora.",
    "Acredite no processo, o progresso vem com o tempo.",
    "Coragem é agir mesmo com medo.",
    "Respire fundo. O momento presente é tudo que existe.",
    "Menos expectativa, mais gratidão.",
    "Sua paz vale mais que qualquer pressa.",
    "Tudo flui quando você desacelera por dentro.",
    "A simplicidade é o último grau de sofisticação.",
    "Transforme ideias em movimento.",
    "Inove. Arrisque. Evolua.",
    "Seu próximo passo pode mudar tudo.",
    "Energia boa atrai oportunidades boas.",
    "Seja raro: seja você mesmo."
  ];

  const gerarFrase = () => {
    const indice = Math.floor(Math.random() * frases.length);
    setFrase(frases[indice]);
  };

  const limparFrase = () => {
    setFrase("");
  };

  return (
    <View style={styles.app}>
      <Text style={styles.titulo}>FRASES</Text>

      <View style={styles.card}>
        <Text style={styles.frase}>{frase}</Text>
      </View>

      <View style={styles.boxBtn}>
        <Pressable 
          style={({ pressed }) => [styles.btn, pressed && { opacity: 0.8 }]} 
          onPress={gerarFrase}
        >
          <Text style={styles.textBtn}>Gerar</Text>
        </Pressable>

        <Pressable 
          style={({ pressed }) => [styles.btn, styles.secBtn, pressed && { opacity: 0.8 }]}
          onPress={limparFrase}
        >
          <Text style={styles.textBtn}>Limpar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  titulo: {
    marginBottom: 32,
    fontSize: 32,
    fontWeight: '900',
    color: '#5B3A29', 
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  card: {
    width: '100%',
    minHeight: 150,
    backgroundColor: '#FFF7EE', 
    padding: 24,
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    elevation: 12,
    shadowColor: '#5B3A29',
    shadowOpacity: 0.18,
    shadowRadius: 10,
    marginBottom: 24,
    borderWidth: 1.5,
    borderColor: '#7B4F36',
  },
  frase: {
    fontSize: 22,
    textAlign: 'center',
    color: '#4A3428',
    marginVertical: 12,
    fontStyle: 'italic',
    lineHeight: 28,
  },
  boxBtn: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    gap: 20,
  },
  btn: {
    paddingHorizontal: 40,
    paddingVertical: 22,
    backgroundColor: '#7B4F36', 
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#7B4F36',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  textBtn: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 0.5,
  },
  secBtn: {
    backgroundColor: '#5B3A29', 
  },
});
