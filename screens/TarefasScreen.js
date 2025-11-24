import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Modal 
} from 'react-native';
import * as Database from '../database/database'; 

export default function TarefasScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const loadTasks = async () => {
    const lista = await Database.listarTarefas();
    const listaNum = lista.map(t => ({ ...t, id: Number(t.id) }));
    setTasks(listaNum);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addOrEditTask = async () => {
    if (!task.trim()) return;

    if (editId !== null) {
      await Database.atualizarTarefa(editId, task);
      const novaLista = tasks.map(t => t.id === editId ? { ...t, titulo: task } : t);
      setTasks(novaLista);
      setEditId(null);
    } else {
      const id = await Database.adicionarTarefa(task);
      const novaLista = [...tasks, { id: Number(id), titulo: task }];
      setTasks(novaLista);
    }
    setTask('');
  };

  const confirmDelete = (id) => {
    setTaskToDelete(Number(id));
    setModalVisible(true);
  };

  const deleteTask = async () => {
    if (taskToDelete !== null) {
      await Database.deletarTarefa(taskToDelete);
      const novaLista = tasks.filter(t => t.id !== taskToDelete);
      setTasks(novaLista);
      setModalVisible(false);
      setTaskToDelete(null);
    }
  };

  const startEdit = (item) => {
    setTask(item.titulo);
    setEditId(item.id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Tarefas</Text>

      <TextInput
        style={styles.input}
        placeholder="Adicionar nova tarefa"
        placeholderTextColor="#8B6F47"
        value={task}
        onChangeText={setTask}
      />

      <TouchableOpacity style={styles.button} onPress={addOrEditTask}>
        <Text style={styles.buttonText}>{editId !== null ? 'Salvar' : 'Adicionar'}</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.taskText}>{item.titulo}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => startEdit(item)}>
                <Text style={styles.edit}>📝</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                <Text style={styles.delete}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>Tem certeza que deseja excluir esta tarefa?</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#7B4F36' }]}
                onPress={deleteTask}
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
    backgroundColor: '#FFF',
    padding: 20 
  },

  titulo: { 
    fontSize: 28, 
    fontWeight: 'bold',
    color: '#5B3A29', 
    marginBottom: 20, 
    textAlign: 'center' 
  },

  input: { 
    width: '100%',
    borderWidth: 1.5, 
    borderColor: '#7B4F36', 
    backgroundColor: '#FFF7EE', 
    borderRadius: 12, 
    paddingHorizontal: 15, 
    height: 50, 
    fontSize: 16, 
    marginBottom: 15, 
    color: '#5B3A29' 
  },

  button: { 
    backgroundColor: '#7B4F36', 
    paddingVertical: 14,
    borderRadius: 12, 
    alignItems: 'center', 
    marginBottom: 20 
  },

  buttonText: { 
    color: '#FFF', 
    fontSize: 16, 
    fontWeight: '600' 
  },

  card: { 
    backgroundColor: '#FFF7EE', 
    borderRadius: 15, 
    padding: 15, 
    marginBottom: 12, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    shadowColor: '#000', 
    shadowOpacity: 0.08, 
    shadowOffset: { width: 0, height: 3 }, 
    shadowRadius: 5, 
    elevation: 3 
  },

  taskText: { 
    fontSize: 16, 
    color: '#5B3A29', 
    flex: 1 
  },

  actions: { 
    flexDirection: 'row', 
    gap: 15, 
    marginLeft: 10 
  },

  edit: { 
    fontSize: 20 
  },

  delete: { 
    fontSize: 20 
  },

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
