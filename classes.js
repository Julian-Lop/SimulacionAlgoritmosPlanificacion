// Proceso con propiedades para funcionar en los dos Planificadores
export class Process {
  constructor(name, timeInit, timeRequired) {
    this.name = name;
    this.timeInit = timeInit;
    this.timeLeft = timeRequired;
  }
}


// Algoritmo de planificación RR
export class RoundRobinScheduler {
  constructor(quantum) {
    this.quantum = quantum;
    this.processQueue = [];
    this.initialProcesses = []
    this.time = 0
  }

  // Agrega los procesos en orden de llegada, para después simular la ejecución en tiempos de llegada
  enqueue(process) {
    this.initialProcesses.push(process);
    if (this.initialProcesses.length > 0) {
      this.initialProcesses.sort((a, b) => {
        return a.timeInit - b.timeInit;
      })
    }
  }

  // Ejecuta el planificador
  run() {

    //Se agrega el primer proceso a la cola de procesos
    if (this.processQueue.length < 1) {
      const currentProcess = this.initialProcesses.shift()
      this.processQueue.push(currentProcess)
    }

    //Mientras existan procesos en la cola se ejecuta el siguiente código
    while (this.processQueue.length > 0) {
      //Se guarda en una variable local la referencia del primer proceso en cola
      let currentProcess = this.processQueue[0]
      

      //En esta parte se ejecuta el código con respecto al Quantum de tiempo definido
      for (let i = 0; i < this.quantum; i++) {

        //Si hay procesos que llegan, se ordenan en la cola
        if ((this.initialProcesses.length > 0) && (this.initialProcesses[0].timeInit == this.time)) {
          //Se guarda en una variable el primer proceso que se saca de los procesos que están llegando
          const newProcess = this.initialProcesses.shift()
          
          //Se verifica si llega un proceso que no sea el inicio del Quantum y se agrega al final de la cola
          if (i != 0) {
            this.processQueue.push(newProcess)
          } 

          //Se verfica si llega al inicio del Quantum y se agrega a la cola
          //una posición antepneultima
          if (i == 0) {
            let temp = this.processQueue.pop()
            this.processQueue.push(newProcess,temp)
          }
        }

        //Se le resta el tiempo de ejecución al proceso
        currentProcess.timeLeft -= 1

        //Si el proceso terminó su Quantum y no se ha finalizado se agrega a la cola,
        //si ya finalizó su Quantum y también finalizó de ejcecutarse, se saca de la cola
        if (i == this.quantum-1 && currentProcess.timeLeft > 0) {
          this.processQueue.push(this.processQueue.shift())
        }else if (i == 1 && currentProcess.timeLeft < 1) {
          const  temp = this.processQueue.shift()
          console.log(`Proceso terminado ${temp.name} ✅`)
        }

        //Si el proceso finaliza su ejecución antes de finalizar su Quantum, se finaliza el Quantum
        //para darle paso al siguiente proceso
        if (i < this.quantum-1 && currentProcess.timeLeft < 1) {
          const  temp = this.processQueue.shift()
          console.log(`Proceso terminado ${temp.name} ✅`)
          i += this.quantum
        }

        console.log(`Proceso ${currentProcess.name} | CPU: ${currentProcess.timeLeft} | Tiempo ${this.time} `)

        //Se incrementa el tiempo en 1
        this.time += 1
      }

    }
  }

  show() {
    console.table(this.initialProcesses)
  }
}

//ALgoritmo de Planificación FCFS
export class FCFSScheduler {
  constructor() {
    this.queue = [];
  }

  // Agrega los procesos a la cola
  enqueue(process) {
    this.queue.push(process);
  }

  // Ejecuta el planificador
  run() {

    // Se define una variable para hacer de contador de tiempo
    let currentTime = 0;

    // Mientras existan procesos en la cola se ejecuta el siguiente código
    while (this.queue.length > 0) {
      // Se guarda el primer proceso en cola
      const currentProcess = this.queue.shift();

      // Se verifica que el tiempo de llegada del proceso es mayor que el tiempo actual
      // Entonces cambiamos el tiempo actual por el tiempo de llegada del proceso
      if (currentProcess.timeInit > currentTime) {
        currentTime = currentProcess.timeInit;
      }

      // Mostramos la ejecución del proceso en el tiempo específico
      console.log(`Tiempo: ${currentTime} | Ejecutando proceso: ${currentProcess.name}`);

      // Le sumamos al tiempo actual el tiempo requerido por el proceso
      currentTime += currentProcess.timeLeft;

      // Se muestra el tiempo en que finaliza la ejecución del proceso
      console.log(`Tiempo: ${currentTime} | Proceso ${currentProcess.name} completado.`);
    }
  }
}


