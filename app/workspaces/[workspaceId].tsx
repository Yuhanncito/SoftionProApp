import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router'; // Para la navegación con router
import Icon from 'react-native-vector-icons/Ionicons'; // Asegúrate de tener Ionicons instalada
import { getWorkSpacesById } from '@/api';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para recuperar el token

const WorkSpaceProjects = () => {
  const { workspaceId } = useLocalSearchParams();
  const [Workspace, setWorkspace] = useState(null);
  
  const fetchWorkspaces = async () => {
    const token = await AsyncStorage.getItem('authToken');
    const workspaces = await getWorkSpacesById(token,workspaceId);
    setWorkspace(workspaces);
    console.log('datos ws',workspaces);
  }

  useEffect(() => {
    fetchWorkspaces();
  }, []);



  return (
    <View style={styles.container}>
      {/* Header con el nombre del WorkSpace, flecha de regreso e ícono de info */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.workspaceTitle}>WorkSpace de {Workspace?.propetaryUser.name}</Text>
        <TouchableOpacity onPress={() => console.log('Info presionada')} style={styles.infoButton}>
          <Icon name="information-circle-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Título de la sección de proyectos */}
      <Text style={styles.title}>Proyectos: {Workspace?.projects.length}</Text>
      
      {/* Listado de proyectos */}
      <FlatList
        data={Workspace?.projects}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.projectCard} onPress={() => router.push({ pathname: '/workspaces/ProjectDetails', params: { projectId: item._id } })}>
            
              <View style={styles.projectInfo}>
                <Text style={styles.projectName}>{item.nameProject}</Text>
                <Text style={styles.projectStatus}>Estado: {item.status}</Text>
                <Text style={styles.projectTasks}>Tareas: {item.tasks.length}</Text>
              </View>
            </TouchableOpacity>
        )}
      />

      {/* Botón para agregar proyecto */}
      <TouchableOpacity style={styles.addButton} onPress={() => console.log('Agregar proyecto')}>
        <Icon name="add-circle" size={48} color="#007AFF" />
      </TouchableOpacity>
    </View>
  );
};

export default WorkSpaceProjects;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF', // Fondo azul
    padding: 15,
    paddingTop: 40, // Para tener espacio debajo del notch
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Separar los elementos
  },
  backButton: {
    padding: 5,
  },
  workspaceTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1, // Esto permite que el título ocupe el espacio entre los botones
    textAlign: 'center', // Centra el título
  },
  infoButton: {
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    marginLeft: 20,
  },
  projectCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20, // Ajuste para que no estén pegados a los bordes
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  projectStatus: {
    fontSize: 16,
    color: '#555',
  },
  projectTasks: {
    fontSize: 16,
    color: '#888',
  },
  deleteButton: {
    marginLeft: 15,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'transparent',
  },
});

/*
 <FlatList
        data={projects}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.projectCard}>
            <TouchableOpacity
              onPress={() => router.push({ pathname: '/workspaces/ProjectDetails', params: { projectName: item.name } })} // Navegación con nombre del proyecto
            >
              <View style={styles.projectInfo}>
                <Text style={styles.projectName}>{item.name}</Text>
                <Text style={styles.projectStatus}>Estado: {item.status}</Text>
                <Text style={styles.projectTasks}>Tareas: {item.tasks}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.name)} style={styles.deleteButton}>
              <Icon name="close-circle" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />


*/