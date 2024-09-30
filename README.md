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
Por último, la comunidad de React Native es enorme y siempre está creciendo. Esto
significa que tenemos acceso a muchos recursos, herramientas y soluciones para los
problemas que podamos enfrentar. Además, nos asegura que el framework se mantenga
actualizado y siga las mejores prácticas.

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
