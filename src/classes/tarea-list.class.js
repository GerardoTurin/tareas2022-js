import { Tarea } from './index.js';

export class TareaList {

    constructor () {

        /* this.tareas = []; */
        this.cargarLocalStorage();

    }

    agregarTarea ( tarea ) {
        this.tareas.push( tarea );
        this.guardarLocalStorage();
    }

    eliminarTarea ( id ) {
        this.tareas = this.tareas.filter( tarea => tarea.id != id );
        this.guardarLocalStorage();
    }

    marcarCompletado ( id ) {

        this.tareas = this.tareas.map( tarea => {
            console.log(id, tarea.id);
            if ( tarea.id == id ) {
                tarea.completado = !tarea.completado;
                this.guardarLocalStorage();
            }
            return tarea;
        });
        
    }

    eliminarCompletados () {
        this.tareas = this.tareas.filter( tarea => !tarea.completado );
        this.guardarLocalStorage();
    }


    guardarLocalStorage () {
        localStorage.setItem('tarea', JSON.stringify(this.tareas));
    }


    cargarLocalStorage () {
        //this.tareas = JSON.parse(localStorage.getItem('tarea'));

        /* if ( localStorage.getItem('tarea') ) {
            this.tareas = JSON.parse(localStorage.getItem('tarea'));

        } else {
            this.tareas = [];
        } */

        this.tareas = ( localStorage.getItem('tarea') ) 
                    ? JSON.parse(localStorage.getItem('tarea'))
                    : [];
        
        this.tareas = this.tareas.map( Tarea.fromJson );
    }


    getPendientes () {
        this.tareas = this.tareas.filter( tarea => !tarea.completado );
        this.guardarLocalStorage();
    }

    getCompletados () {
        return this.tareas.filter( tarea => tarea.completado );
    }

}