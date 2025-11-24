import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, Pressable, Modal, TouchableOpacity, BackHandler 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const apps = [
    { nome: 'Tarefas', icone: 'check-circle', tela: 'Tarefas' },
    { nome: 'IMC', icone: 'monitor-weight', tela: 'IMC' },
    { nome: 'Frases', icone: 'format-quote', tela: 'Frases' },
    { nome: 'Conversor', icone: 'thermostat', tela: 'Conversor' },
    { nome: 'Sobre', icone: 'info', tela: 'Sobre' },
  ];

  const handleLogout = () => setModalVisible(true);

  const logoutConfirm = () => {
    setModalVisible(false);
    navigation.replace("Login");
  };

  // Intercepta botão voltar do Android
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        setModalVisible(true); // mostra modal
        return true; // evita ação padrão
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Menu Principal</Text>

      <View style={styles.grid}>
        {apps.map((item, index) => (
          <Pressable
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate(item.tela)}
          >
            <MaterialIcons name={item.icone} size={45} color="#FFF" />
            <Text style={styles.cardText}>{item.nome}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </Pressable>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>Tem certeza que deseja sair?</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={[styles.modalButton, { backgroundColor: '#7B4F36' }]}
                onPress={logoutConfirm}
              >
                <Text style={styles.modalButtonText}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.modalButtonText, { color: '#333' }]}>Não</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#FFFFFF',
    paddingBottom: 40,
  },
  titulo: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 25, 
    color: '#5B3A29' 
  },
  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'center' 
  },
  card: {
    backgroundColor: '#7B4F36',
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 15,
    margin: 10,
    width: 140,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  cardText: { 
    color: '#FFF', 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginTop: 8 
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#5B3A29',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  logoutText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  /* === MODAL === */
  modalContainer: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.4)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  modalBox: { 
    width: '80%', 
    backgroundColor: '#FFF', 
    borderRadius: 15, 
    padding: 20, 
    alignItems: 'center' 
  },
  modalText: { 
    fontSize: 18, 
    color: '#333', 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  modalActions: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%' 
  },
  modalButton: { 
    flex: 1, 
    paddingVertical: 12, 
    borderRadius: 10, 
    marginHorizontal: 5, 
    alignItems: 'center' 
  },
  modalButtonText: { 
    color: '#FFF', 
    fontWeight: '600', 
    fontSize: 16 
  },
});
