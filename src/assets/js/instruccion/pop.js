import { instruccion } from '../abstract/instruccion';
import { errores } from '../error/errores';
import { nodoError } from '../error/error';
export class pop_ extends instruccion {
    constructor(id, linea, columna) {
        super(linea, columna);
        this.id = id;
    }
    ejecutar(environment) {
        let val_return = null;
        let variable_ = environment.get_variable(this.id);
        try {
            val_return = variable_.valor.pop();
        }
        catch (error) {
            errores.addError(new nodoError("Semántico", error, this.linea, this.columna, "Error"));
        }
        return val_return;
    }
}
