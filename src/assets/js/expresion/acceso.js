import { expresion } from '../abstract/expresion';
import { nodoError } from '../error/error';
import { errores } from '../error/errores';
export class acceso extends expresion {
    constructor(id, linea, columna) {
        super(linea, columna);
        this.id = id;
    }
    ejecutar(environment) {
        const value = environment.get_variable(this.id);
        console.log();
        if (value == null) {
            errores.addError(new nodoError("Semántico", "No se encontró dicha variable ó es una variable sin inicializar", this.linea, this.columna, "variable " + this.id));
        }
        return {
            valor: value.valor,
            tipo: value.tipo
        };
    }
}
