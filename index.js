import { Process, RoundRobinScheduler, FCFSScheduler } from "./classes.js";

//Round Robin

// Crear procesos
const processA = new Process("A", 0, 8);
const processB = new Process("B", 1, 5);
const processC = new Process("C", 2, 4);
const processD = new Process("D", 5, 4);
const processE = new Process("E", 3, 7);
const processF = new Process("F", 6, 4);


// Crear planificador Round Robin con un quantum de tiempo de 2
const scheduler = new RoundRobinScheduler(2);

// Agregar procesos a la cola
scheduler.enqueue(processA);
scheduler.enqueue(processB);
scheduler.enqueue(processC);
scheduler.enqueue(processD);
scheduler.enqueue(processE);
scheduler.enqueue(processF);

// Mostrar cola inicial
// scheduler.show()

// Ejecutar el planificador Round Robin
scheduler.run();

//FCFS -----------------------------

// Crear procesos
const process1 = new Process("Proceso A", 0, 5);
const process2 = new Process("Proceso B", 2, 3);
const process3 = new Process("Proceso C", 4, 2);

// Crear un planificador FCFS
const FCFSscheduler = new FCFSScheduler();

// Agregar procesos a la cola del planificador
FCFSscheduler.enqueue(process1);
FCFSscheduler.enqueue(process2);
FCFSscheduler.enqueue(process3);

// Ejecutar el planificador FCFS
FCFSscheduler.run();