# <em>Laboratorio: Llamadas al sistema </em>

## 🛠️ Funcionalidades del proyecto

* Implementación de Algoritmo Round Robin y FCFS
* Agregar procesos a los dos algoritmos
* Se muestran los procesos por consola

## 💻 Cómo usar el proyecto?

* Instalar Nodejs para poder ejecutar el código javascript 🟩.
* Identificar Archivo index.js 📃.
* Ejecutar el archivo index con el siguiente comando 🖱️. 
    ~~~ 
    node index.js 
    ~~~

* Los procesos se crean y asignan quemados en el archivo index.js:
    * Crear Proceso, parametros (Nombre Proceso: string, tiempoLegada: number, tiempoEjecución: number) 💡.
        ~~~ 
        const processA = new Process("A", 0, 8);                 
        ~~~
    * Asignar el proceso a un algoritmo de planificación Round Robin💡.
        ~~~ 
        scheduler.enqueue(processA);                
        ~~~
    
    * Asignar el proceso a un algoritmo de planificación FCFS💡.
        ~~~ 
        FCFSscheduler.enqueue(process1);               
        ~~~

* Ejecutar algoritmos de Planificación Round Robin y FCFS:
    * Ejecutar Planificación Round Robin ✅.
        ~~~ 
        scheduler.run();               
        ~~~
    * Ejecutar Planificación FCFS ✅.
        ~~~ 
        FCFSscheduler.run();               
        ~~~