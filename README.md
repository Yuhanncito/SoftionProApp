Esta aplicación móvil permite a los usuarios gestionar proyectos y tareas de manera eficiente. Con ella, los usuarios pueden crear proyectos, asignar tareas a diferentes miembros del equipo, establecer fechas de inicio y finalización, y visualizar las tareas en diferentes formatos, como listas y tableros Kanban. El objetivo principal es mejorar la organización y el seguimiento de las tareas dentro de un equipo, asegurando que los proyectos avancen de manera efectiva y dentro de los plazos establecidos.

# Objetivos
- Facilitar la asignación y seguimiento de tareas dentro de un equipo.
- Proporcionar una interfaz intuitiva para gestionar proyectos, fechas límite y responsables.
- Permitir a los usuarios visualizar las tareas en diferentes formatos para adaptarse a diversas necesidades.

# Metodologia elegida
## Metodología para el desarrollo de software: Scrum
Para el desarrollo de la aplicación móvil que permitirá la gestión de proyectos y tareas, se
ha optado por la metodología Scrum. Esta decisión se basa en las características
particulares del proyecto, que involucra la creación de una herramienta flexible y adaptable
para la asignación de tareas, la gestión de fechas límite, responsables y miembros del
equipo, con la posibilidad de visualizar las tareas en formato de lista y tablero Kanban.
Scrum es una metodología ágil, lo que significa que se enfoca en la entrega incremental y
en la capacidad de adaptación a los cambios, características esenciales en el contexto de
desarrollo de una aplicación móvil. Dado que los requisitos del usuario pueden evolucionar
con el tiempo, Scrum facilita una respuesta rápida a nuevas demandas, sin comprometer el
progreso del proyecto.
Además, el enfoque colaborativo de Scrum es ideal para un proyecto de este tipo. A través
de reuniones frecuentes, como las planificaciones de sprint y las reuniones diarias, el
equipo de desarrollo puede mantener una comunicación fluida, identificar problemas de
manera oportuna y asegurarse de que las expectativas del cliente se cumplan en cada fase.
El trabajo en ciclos cortos (sprints) permite al equipo entregar versiones funcionales de la
aplicación de manera regular, lo que no solo reduce riesgos, sino que también permite
probar y ajustar las características antes de la entrega final. Esto es fundamental para
asegurar que la aplicación cumpla con las necesidades específicas de los usuarios, como la
visualización de tareas en diferentes formatos.
Finalmente, la capacidad de inspección y adaptación continua de Scrum es un aspecto
crucial, ya que en un equipo pequeño como el que desarrollará esta aplicación, la
retroalimentación constante es clave para mejorar la comunicación interna y asegurar una
correcta alineación con los objetivos del proyecto.

# Frameworks de desarrollo movil a utilizar
Para el desarrollo de nuestra app móvil de gestión de proyectos y tareas, hemos optado por
usar React Native como framework de desarrollo móvil. La razón principal es que tiene
varias ventajas que lo hacen perfecto para este proyecto.
Primero que nada, React Native permite crear aplicaciones multiplataforma. Esto nos
ahorra muchísimo tiempo.
Además, trabaja bajo el lenguaje de programación JavaScript, usado tanto en la web como
en el desarrollo móvil. Esto facilita el trabajo del equipo, ya que podemos reutilizar muchos
conocimientos y bibliotecas ya existentes. También nos permite desarrollar de manera más
rápida y flexible funciones clave, como la creación de proyectos, la asignación de tareas y
la visualización en listas o tableros Kanban.
Un punto clave es que React Native ofrece un rendimiento cercano al de las apps nativas.
Esto es súper importante para una app de gestión de proyectos, donde se manejan muchas
interacciones y actualizaciones de datos en tiempo real. Al usar componentes nativos, nos
aseguramos de que la experiencia sea fluida y rápida, lo que es fundamental para mantener
la eficiencia en la gestión de tareas.

# Control de versiones seleccionada
Para el control de versiones se utiliza **Git** junto con **GitHub** como plataforma de alojamiento de repositorios.

# Flujo de Trabajo
 **Clonar el repositorio**: Para comenzar a trabajar, clona el repositorio utilizando el siguiente comando:
  git clone https://github.com/usuario/repositorio.git

# Esquema de versiona miento
El esquema de versiona miento que se va a utilizar para el desarrollo del proyecto será con
Git y GitHub. La rama principal, main, contendrá siempre el código estable y listo para
producción. Todas las funcionalidades nuevas o cambios se desarrollarán en ramas
específicas que partirán de una rama de desarrollo llamada develop. Para cada nueva
funcionalidad, se creará una rama con el prefijo feature/ y una breve descripción de la tarea,
como feature/nueva-funcionalidad.
Si se necesita corregir algún error en producción, se creara una rama hotfix/ desde main, y
una vez corregido, esa rama se fusionará tanto en main como en develop, para mantener el
código sincronizado.

#Ramas: El flujo de trabajo se basa en las siguientes ramas:
main: Contiene la versión estable y lista para producción.
develop: Contiene las últimas características en desarrollo.
feature/: Para cada nueva característica, se crea una rama con este prefijo, seguida de una breve descripción.
hotfix/: Para correcciones rápidas en la versión en producción.

# Estrategia de Despliegue y CI/CD
Para garantizar una integración continua y un despliegue automatizado, se utiliza un flujo de **CI/CD** basado en **GitHub Actions**.
## Entornos
- **Desarrollo**: Las nuevas características se prueban en este entorno antes de ser fusionadas en la rama `main`.
- **Producción**: Una vez que el código ha pasado por todas las pruebas, se despliega automáticamente en el entorno de producción.
## Proceso CI/CD
1. **Integración Continua (CI)**: Cada vez que se crea un pull request o se realizan cambios en la rama `develop`, se ejecutan pruebas automáticas para asegurar que el código no introduce nuevos errores.
2. **Despliegue Continuo (CD)**: Cuando el código es aprobado y fusionado en `main`, se despliega automáticamente en el entorno de producción.

# Instrucciones para Clonar el Repositorio, Instalar Dependencias y Ejecutar el Proyecto
## Instrucciones de Instalación

- Clonar el Repositorio
git clone https://github.com/usuario/repositorio.git
cd repositorio
- Instalar Dependencias
npm install
- Ejecutar la Aplicación
npm start

