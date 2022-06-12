export class Tarea {

    static fromJson( {id, tarea, completado, creado} ) { //esto  es para recuperar las instancias de la clase Tarea del localStorage.

        const tareaTemporal = new Tarea( tarea );
        tareaTemporal.id = id;
        tareaTemporal.completado = completado;
        tareaTemporal.creado = creado;

        return tareaTemporal;
    }

    constructor ( tarea ) {

        this.tarea = tarea;

        this.id = new Date().getTime(); // hora actual en milisegundos
        this.completado = false;
        this.creado = new Date();
    }

    imprimirClase() {
        console.log(` Tarea: ${this.tarea} - id: ${this.id}`);
    }
}