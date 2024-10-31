import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import { getWorkSpacesById, createNewProject } from '@/api'; // Importar la función createNewProject
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WorkSpaceProjects = () => {
  const { workspaceId } = useLocalSearchParams();
  const [Workspace, setWorkspace] = useState(null);
  const [newProjectName, setNewProjectName] = useState(''); // Nombre del nuevo proyecto
  const [projectsSuccess, setProjectsSuccess] = useState(false); // Lista de proyectos

  const fetchWorkspaces = async () => {
    const token = await AsyncStorage.getItem('authToken');
    const workspaces = await getWorkSpacesById(token, workspaceId);
    setWorkspace(workspaces);
    console.log('datos ws', workspaces);
  };

  const handleAddProject = async () => {
    if (newProjectName.trim()) {
      try {
        const token = await AsyncStorage.getItem('authToken');
        
        // Enviar el nuevo proyecto al servidor
        const newProjectData = {
          nameProject: newProjectName,
          workspaceid: workspaceId
        };

        const result = await createNewProject(token, newProjectData);

        if (result.message !== 'ok') {
          console.log('Error al crear el proyecto:', result.error);
          Alert.alert('Error', 'Ocurrio un error al crear el proyecto');
          setProjectsSuccess(false);
          return;
        }

        setProjectsSuccess(true);
        Alert.alert('Proyecto creado', 'Se ha creado el proyecto exitosamente');
        setNewProjectName('');
        console.log('Proyecto creado:', result);
      } catch (error) {
        console.log('Error al crear proyecto:', error);
        Alert.alert('Error', 'Ocurrió un error al crear el proyecto');
      }
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, [projectsSuccess]);

  return (
    <View style={styles.container}>
      {/* Header con el nombre del WorkSpace, flecha de regreso e ícono de info */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.workspaceTitle}>WorkSpace de {Workspace?.propetaryUser.name}</Text>
        <TouchableOpacity onPress={() => router.push('/workspaces/detailsWorkspace')} style={styles.infoButton}>
          <Icon name="information-circle-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Título de la sección de proyectos */}
      <Text style={styles.title}>Proyectos: {Workspace?.projects.length}</Text>

      {/* Campo de entrada para un nuevo proyecto */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Crea un nuevo proyecto"
          value={newProjectName}
          onChangeText={setNewProjectName}
          onSubmitEditing={handleAddProject} // Llamar a handleAddProject al presionar Enter
        />
      </View>

      {/* Listado de proyectos */}
      <FlatList
        data={Workspace?.projects}
        keyExtractor={(item) => item._id || item.nameProject}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.projectCard}
            onPress={() =>
              router.push({
                pathname: '/workspaces/ProjectDetails',
                params: { projectId: item._id },
              })
            }
          >
            <View style={styles.projectInfo}>
              <Text style={styles.projectName}>{item.nameProject}</Text>
              <Text style={styles.projectStatus}>Estado: {item.status}</Text>
              <Text style={styles.projectTasks}>Tareas: {item.tasks.length}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Botón para agregar proyecto sin acción */}
      <TouchableOpacity style={styles.addButton}>
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
    backgroundColor: '#007AFF',
    padding: 15,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 5,
  },
  workspaceTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  addProjectButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
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
    marginHorizontal: 20,
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
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'transparent',
  },
});
