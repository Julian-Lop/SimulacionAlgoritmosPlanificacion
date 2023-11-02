import { Process, RoundRobinScheduler } from "./classes.js";
import { ProcessFCFS, FCFSScheduler } from "./classes.js";

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

//Mostrar cola inicial
// scheduler.show()

// Ejecutar el planificador
// scheduler.run();
  



//FCFS -----------------------------

// Crear procesos
const process1 = new ProcessFCFS("Proceso A", 0, 5);
const process2 = new ProcessFCFS("Proceso B", 2, 3);
const process3 = new ProcessFCFS("Proceso C", 4, 2);

// Crear un planificador FCFS
const schedulerFCFS = new FCFSScheduler();

// Agregar procesos a la cola del planificador
schedulerFCFS.enqueue(process1);
schedulerFCFS.enqueue(process2);
schedulerFCFS.enqueue(process3);

// Ejecutar el planificador FCFS
schedulerFCFS.run();