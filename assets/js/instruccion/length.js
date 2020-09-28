import { instruccion } from '../abstract/instruccion';
import { nodoError } from '../error/error';
import { errores } from '../error/errores';
export class length_ extends instruccion {
    constructor(id, linea, columna) {
        super(linea, columna);
        this.id = id;
    }
    ejecutar(environment) {
        let val_return = null;
        let variable_receptora = environment.get_variable(this.id);
        try {
            val_return = {
                valor: variable_receptora.valor.length,
                tipo: 0
            };
        }
        catch (error) {
            errores.addError(new nodoError("Semántico", error, this.linea, this.columna, "Error"));
        }
        return val_return;
    }
}
