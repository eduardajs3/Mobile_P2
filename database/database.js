import AsyncStorage from '@react-native-async-storage/async-storage';

export async function criarTabelaUsers() {
  const data = await AsyncStorage.getItem('users');
  if (!data) {
    const users = [
      { id: 1, usuario: 'admin', senha: '1234' }
    ];
    await AsyncStorage.setItem('users', JSON.stringify(users));
  }
}

export async function usuarioExiste(usuario) {
  const data = await AsyncStorage.getItem('users');
  const users = data ? JSON.parse(data) : [];
  return users.some(u => u.usuario === usuario);
}

export async function criarUsuario(usuario, senha) {
  const data = await AsyncStorage.getItem('users');
  const users = data ? JSON.parse(data) : [];
  const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;

  users.push({ id, usuario, senha });
  await AsyncStorage.setItem('users', JSON.stringify(users));
}

export async function verificarLogin(usuario, senha) {
  const data = await AsyncStorage.getItem('users');
  const users = data ? JSON.parse(data) : [];
  return users.find(u => u.usuario === usuario && u.senha === senha) || null;
}

export async function redefinirSenha(usuario, novaSenha) {
  const data = await AsyncStorage.getItem('users');
  let users = data ? JSON.parse(data) : [];
  users = users.map(u => {
    if (u.usuario === usuario) u.senha = novaSenha;
    return u;
  });
  await AsyncStorage.setItem('users', JSON.stringify(users));
}


export async function criarTabelaTarefas() {
  const data = await AsyncStorage.getItem('tarefas');
  if (!data) await AsyncStorage.setItem('tarefas', JSON.stringify([]));
}

export async function adicionarTarefa(titulo) {
  const data = await AsyncStorage.getItem('tarefas');
  const tarefas = data ? JSON.parse(data) : [];
  const id = tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 1;

  tarefas.push({ id, titulo });
  await AsyncStorage.setItem('tarefas', JSON.stringify(tarefas));
  return id;
}


export async function listarTarefas() {
  const data = await AsyncStorage.getItem('tarefas');
  return data ? JSON.parse(data) : [];
}

export async function atualizarTarefa(id, novoTitulo) {
  const data = await AsyncStorage.getItem('tarefas');
  let tarefas = data ? JSON.parse(data) : [];
  tarefas = tarefas.map(t => (t.id === id ? { ...t, titulo: novoTitulo } : t));
  await AsyncStorage.setItem('tarefas', JSON.stringify(tarefas));
}

export async function deletarTarefa(id) {
  const data = await AsyncStorage.getItem('tarefas');
  let tarefas = data ? JSON.parse(data) : [];
  tarefas = tarefas.filter(t => t.id !== id);
  await AsyncStorage.setItem('tarefas', JSON.stringify(tarefas));
}


export async function limparBanco() {
  await AsyncStorage.removeItem('users');
  await AsyncStorage.removeItem('tarefas');
}
