import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Icon from 'react-native-vector-icons/Ionicons';

const BoardView = ({tareas}) => {

  const [tasks, setTasks] = useState(tareas);

  // Función para cambiar el estado de la tarea cuando se mueve
  const handleDragEnd = ( data : any, from : any, to : any ) => {
    const updatedTasks = [...tasks];

    // Mover la tarea al nuevo índice y actualizar su estado en función de la sección
    const taskToMove = updatedTasks[from];
    if (to < tasksByStatus('Pendiente').length) {
      taskToMove.status = 'Pendiente';
    } else if (to < tasksByStatus('Pendiente').length + tasksByStatus('Iniciado').length) {
      taskToMove.status = 'Iniciado';
    } else {
      taskToMove.status = 'Concluido';
    }

    updatedTasks.splice(from, 1);
    updatedTasks.splice(to, 0, taskToMove);

    setTasks(updatedTasks); // Actualiza el estado de las tareas
  };

  // Filtrar tareas por estado
  const tasksByStatus = (status) => tareas.filter(task => task.status === status);

  // Renderizar la tarjeta de la tarea
  const renderTaskCard = ({ item, drag, isActive }) => (
    <TouchableOpacity
      style={[
        styles.taskCard,
        { backgroundColor: isActive ? '#f0f0f0' : '#fff' } // Cambia el color de fondo cuando se arrastra
      ]}
      onLongPress={drag}
    >
      <View style={styles.taskHeader}>
        <Text style={styles.taskTitle}>{item.nameTask}</Text>
        <TouchableOpacity>
          <Icon name="close-circle" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <Text style={styles.taskInfo}>Horas: {item.timeHoursTaks}</Text>
      <Text style={styles.taskStatus}>{item.status}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    console.log("tareas en el tablero: ",tareas);
  }, []);

  return (
    <View style={styles.container}>
      {/* Sección Pendiente */}
      <Text style={styles.sectionHeader}>Pendiente</Text>
      <DraggableFlatList
        data={tasksByStatus('Pendiente')}
        renderItem={renderTaskCard}
        keyExtractor={(item) => item._id.toString()}
        onDragEnd={handleDragEnd}
      />

      {/* Sección Iniciado */}
      <Text style={styles.sectionHeader}>Iniciado</Text>
      <DraggableFlatList
        data={tasksByStatus('Iniciado')}
        renderItem={renderTaskCard}
        keyExtractor={(item) => item._id.toString()}
        onDragEnd={handleDragEnd}
      />

      {/* Sección Concluido */}
      <Text style={styles.sectionHeader}>Concluido</Text>
      <DraggableFlatList
        data={tasksByStatus('Concluido')}
        renderItem={renderTaskCard}
        keyExtractor={(item) => item._id.toString()}
        onDragEnd={handleDragEnd}
      />
    </View>
  );
};

export default BoardView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginVertical: 10,
  },
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  taskInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  taskStatus: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 5,
  },
});
