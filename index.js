import { Process, RoundRobinScheduler } from "./classes.js";

// Crear procesos
const processA = new Process("A", 0, 3);
const processB = new Process("B", 1, 4);
const processC = new Process("C", 3, 6);
const processD = new Process("D", 5, 5);
const processE = new Process("E", 4, 3);
// const processF = new Process("F", 6, 4);


// Crear planificador Round Robin con un quantum de tiempo de 3
const scheduler = new RoundRobinScheduler(2);

// Agregar procesos a la cola
scheduler.enqueue(processA);
scheduler.enqueue(processB);
scheduler.enqueue(processC);
scheduler.enqueue(processD);
scheduler.enqueue(processE);
// scheduler.enqueue(processF);

//Mostrar cola inicial
// scheduler.show()

// Ejecutar el planificador
scheduler.run();
  