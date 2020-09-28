import { instruccion } from '../abstract/instruccion';
import { errores } from '../error/errores';
import { nodoError } from '../error/error';
export class push_ extends instruccion {
    constructor(id, val_, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.val_ = val_;
    }
    ejecutar(environment) {
        let val_return = this.val_.ejecutar(environment);
        let variable_ = environment.get_variable(this.id);
        try {
            val_return = variable_.valor.push(val_return);
            return {
                valor: val_return,
                variable: variable_.tipo
            };
        }
        catch (error) {
            errores.addError(new nodoError("Semántico", error, this.linea, this.columna, "Error"));
        }
        return val_return;
    }
}
