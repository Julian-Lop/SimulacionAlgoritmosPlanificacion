//
export class Process {
  constructor(name, timeInit, timeRequired,) {
    this.name = name;
    this.timeInit = timeInit;
    this.timeLeft = timeRequired;
  }
}


// // Algoritmo de planificación RR

// export class RoundRobinScheduler {
//   constructor(quantum) {
//     this.quantum = quantum;
//     this.processQueue = [];
//     this.initialProcesses = []
//   }

//   enqueue(process) {
//     this.initialProcesses.push(process);
//     if (this.initialProcesses.length > 0) {
//       this.initialProcesses.sort((a, b) => {
//         return a.timeInit - b.timeInit;
//       })
//     }
//   }

//   run() {
//     let ciclo = 0
//     let positionFinish = null

//     if (this.processQueue.length < 1) {
//       const currentProcess = this.initialProcesses.shift()
//       this.processQueue.push(currentProcess)
//     }

//     while (this.processQueue.length > 0) {
//       if ((this.initialProcesses.length > 0) && (this.initialProcesses[0].timeInit == ciclo) ) {
//         const nuevo = this.initialProcesses.shift()

//         if (positionFinish && (nuevo.timeInit - positionFinish == 1)) {
//           const last = this.processQueue.pop()
//           this.processQueue.push(nuevo,last)
//         } else {
//           this.processQueue.push(nuevo)
//         }

//         // console.log(`Nuevo en Cola ${nuevo.name} | Ciclo ${ciclo} ⬆️ `)
//       }

//       const currentProcess = this.processQueue.shift()

//       currentProcess.timeLeft -= 1

//       // console.log(`Proceso ${currentProcess.name} Ejecución: ${currentProcess.timeLeft} | Ciclo ${ciclo} `)

//       if ( (ciclo + 1) % this.quantum == 0 && (currentProcess.timeLeft < 1) ) {
//         console.log(`Proceso ${currentProcess.name} Terminado ✅ `)
//       }
      
//       if ((ciclo + 1) % this.quantum == 0 && (currentProcess.timeLeft > 0)) {
//         this.processQueue.push(currentProcess)
//         positionFinish = ciclo
//       }

//       if ( (ciclo + 1) % this.quantum != 0 && (currentProcess.timeLeft > 0) ){
//         this.processQueue.unshift(currentProcess)
//       }

//       if ( (ciclo + 1) % this.quantum != 0 && (currentProcess.timeLeft < 1) ){
//         console.log(`Proceso ${currentProcess.name} Terminado ✅ Antes del Quantum`)
//         ciclo += this.quantum - 1
//       }

//       ciclo++
//     }
//   }

//   show() {
//     console.table(this.initialProcesses)
//   }
// }

// Algoritmo de planificación RR
export class RoundRobinScheduler {
  constructor(quantum) {
    this.quantum = quantum;
    this.processQueue = [];
    this.initialProcesses = []
    this.ciclo = 0
  }

  enqueue(process) {
    this.initialProcesses.push(process);
    if (this.initialProcesses.length > 0) {
      this.initialProcesses.sort((a, b) => {
        return a.timeInit - b.timeInit;
      })
    }
  }

  run() {

    //Se agrega el primer proceso a la cola de procesos
    if (this.processQueue.length < 1) {
      const currentProcess = this.initialProcesses.shift()
      this.processQueue.push(currentProcess)
    }

    //Mientras exista procesos en la cola se ejecuta el siguiente código
    while (this.processQueue.length > 0) {
      //Se guarda en una variable local la referencia del primeri proceso en cola
      let currentProcess = this.processQueue[0]
      

      //En esta parte se ejecuta el código con respecto al Quantum de tiempo definido
      for (let i = 0; i < this.quantum; i++) {

        //Si hay procesos que llegan, se ordenan en la cola
        if ((this.initialProcesses.length > 0) && (this.initialProcesses[0].timeInit == this.ciclo)) {
          //Se guarda en una variable el primer proceso que se saca de los procesos que están llegando
          const newProcess = this.initialProcesses.shift()
          
          if (i != 0) {
            this.processQueue.push(newProcess)

            // console.log(`Agregado al final ${newProcess.name} | ciclo ${this.ciclo} `)
          } 

          if (i == 0) {
            let temp = this.processQueue.pop()
            this.processQueue.push(newProcess,temp)
            
            // console.log(`Agregado al inicio ${newProcess.name} | ciclo ${this.ciclo} `)
          }
        }

        //Se le resta el tiempo de ejecución al proceso
        currentProcess.timeLeft -= 1

        //Si el proceso terminó su Quantum y no se ha finalizado se agrega a la cola,
        //si ya finalizó su Quantum y también finalizó de ejcecutarse, se saca de la cola
        if (i == 1 && currentProcess.timeLeft > 0) {
          this.processQueue.push(this.processQueue.shift())
        }else if (i == 1 && currentProcess.timeLeft < 0) {
          const  temp = this.processQueue.shift()
          console.log(`Proceso terminado ${temp.name} ✅`)
        }

        //Si el proceso finaliza su ejecución antes de finalizar su Quantum, se finaliza el Quantum
        //para darle paso al siguiente proceso
        if (i < 1 && currentProcess.timeLeft < 0) {
          const  temp = this.processQueue.shift()
          console.log(`Proceso terminado ${temp.name} ✅`)
          i = 1
        }

        // console.log(`Proceso ${currentProcess.name} | CPU: ${currentProcess.timeLeft} | Ciclo ${this.ciclo} `)

        //Se incrementa el tiempo en 1
        this.ciclo += 1
      }


    }
  }

  show() {
    console.table(this.initialProcesses)
  }
}