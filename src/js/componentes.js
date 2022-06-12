
import { Tarea, TareaList } from '../classes';
import { tareaList } from '../index.js';




//! Referencia al html
const htmlTareas = document.querySelector('.todo-list');
const textoInput = document.querySelector('.new-tarea');
const btnBorrComplet = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const linkFiltro = document.querySelectorAll('.filtro');
const contPendientes = document.querySelector('strong');





export const crearTareaHTML = (tarea) => {

/* 
    <li class="completed" data-id="abc">
        <div class="view">
            <input class="toggle" type="checkbox" checked>
            <label>Probar JavaScript</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>
    <li>
        <div class="view">
            <input class="toggle" type="checkbox">
            <label>Comprar un unicornio</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Rule the web">
    </li>
*/


    // Crear el elemento li
    const htmlTarea = document.createElement('li');
    htmlTarea.classList.toggle('completed', tarea.completado);
    htmlTarea.dataset.id = tarea.id;

    // Crear el elemento div
    const htmlTareaView = document.createElement('div');
    htmlTareaView.classList.add('view');

    // Crear el elemento input
    const htmlTareaViewInput = document.createElement('input');
    htmlTareaViewInput.classList.add('toggle');
    htmlTareaViewInput.setAttribute('type', 'checkbox');
    htmlTareaViewInput.checked = tarea.completado;

    // Crear el elemento label
    const htmlTareaViewLabel = document.createElement('label');
    htmlTareaViewLabel.textContent = tarea.tarea;

    // Crear el elemento button
    const htmlTareaViewButton = document.createElement('button');
    htmlTareaViewButton.classList.add('destroy');

    // Agregar los elementos al div
    htmlTareaView.appendChild(htmlTareaViewInput);
    htmlTareaView.appendChild(htmlTareaViewLabel);
    htmlTareaView.appendChild(htmlTareaViewButton);

    // Crear el elemento otro input
    const htmlTareaEdit = document.createElement('input');
    htmlTareaEdit.classList.add('edit');
    htmlTareaEdit.setAttribute('value', tarea.tarea);
    
    // Agregar los elementos al li
    htmlTarea.appendChild(htmlTareaView);
    htmlTarea.appendChild(htmlTareaEdit);

    htmlTareas.appendChild(htmlTarea);

    return htmlTarea;

}



//! Eventos
// keyup: cuando se suelta una tecla.
// keycode: que tecla se presiono.

textoInput.addEventListener('keyup', (evt) => {

    
    if (evt.keyCode === 13 && textoInput.value.length > 0) {

        const nuevaTarea = new Tarea(textoInput.value);
        tareaList.agregarTarea(nuevaTarea);
        
        contPendientes.innerHTML = contPendientes.getPendientes();
        
        
        crearTareaHTML(nuevaTarea);
        textoInput.value = '';
    }
    

});


htmlTareas.addEventListener('click', (evt) => {
    

    const nombreElemento = evt.target.localName;
    const tareaElemento = evt.target.parentElement.parentElement;
    const tareaId = tareaElemento.dataset.id;
    
    
    if (nombreElemento.includes('input')) {  // click en el checkbox
        tareaList.marcarCompletado(tareaId);
        tareaElemento.classList.toggle('completed');
        
        if (tareaElemento.classList.contains('completed')) {
            contPendientes.innerHTML = contPendientes.getPendientes();
        } else {
            contPendientes.innerHTML = contPendientes.getPendientes();
        }

    } else if (nombreElemento.includes('button')) {  // click en el boton de eliminar
        tareaList.eliminarTarea(tareaId);
        htmlTareas.removeChild(tareaElemento)
        contPendientes.innerHTML = contPendientes.getPendientes();
        
    }


    console.log(tareaList)

});


btnBorrComplet.addEventListener('click', () => {
    
        tareaList.eliminarCompletados();
    
        for (let i = htmlTareas.children.length - 1; i >= 0; i--) {
            const elemento = htmlTareas.children[i];
            console.log(elemento)
    
            if (elemento.classList.contains('completed')) {
                htmlTareas.removeChild(elemento);
            }
        }
    
    });


ulFiltros.addEventListener('click', (evt) => {
        
    const filtro = evt.target.text;
    if ( !filtro ) { return; }

    linkFiltro.forEach(link => { link.classList.remove('selected') });
    evt.target.classList.add('selected');

    for ( const elemento of htmlTareas.children ) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        

        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if ( !completado ) {
                    elemento.classList.add('hidden');
                }
                break;
        }
    };

});



contPendientes.getPendientes = () => {
    let pendientes = 0;
    tareaList.tareas.forEach(tarea => {
        if (!tarea.completado) {
            pendientes++;
        } else if (tarea.completado) {
            pendientes - 1;
        }
    });  
    return pendientes;
}

document.addEventListener('DOMContentLoaded', () => {
    contPendientes.innerHTML = contPendientes.getPendientes();

});









