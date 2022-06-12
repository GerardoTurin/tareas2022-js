import './style.css';
import { Tarea, TareaList } from './classes';
import { crearTareaHTML } from './js/componentes.js';

/* import { Tarea } from './classes/tarea.class.js';
import { TareaList } from './classes/tarea-list.class.js'; */

export const tareaList = new TareaList();

tareaList.tareas.forEach( tarea => crearTareaHTML(tarea) );


const newTarea = new Tarea('JavaScript');

//tareaList.tareas[0].imprimirClase();

console.log('Tareas', tareaList.tareas);



//const tarea = new Tarea('Aprender JavaScript !!!');


//tarea.completado = true;

/* tareaList.agregarTarea(tarea);
console.log(tareaList);

crearTareaHTML(tarea); */

/* localStorage.setItem('mi-tarea', 'Aprender JavaScript !!!');
sessionStorage.setItem('mi-tarea', 'Aprender JavaScript 2'); */

/* setTimeout(() => {
    localStorage.removeItem('mi-tarea');
}, 3000); */