import { nodoError } from '../error/error';
import { errores } from '../error/errores';
import { instruccion } from '../abstract/instruccion';
export class asignacion_ extends instruccion {
    constructor(exp, id_receptor, linea, columna) {
        super(linea, columna);
        this.exp = exp;
        this.id_receptor = id_receptor;
    }
    ejecutar(environment) {
        let val_insert;
        let variable_receptora = environment.get_variable(this.id_receptor);
        val_insert = this.exp.ejecutar(environment);
        if (val_insert.tipo != variable_receptora.tipo) {
            errores.addError(new nodoError("Semántico", "No se puede insertar " + val_insert.tipo + " a una variable tipo " + variable_receptora.tipo, this.linea, this.columna, "Tipos incorrectos"));
            return;
        }
        else if (variable_receptora.Perm == 0) {
            errores.addError(new nodoError("Semántico", "No se puede insertar " + val_insert.tipo + " a una variable constante", this.linea, this.columna, "Tipo Const"));
            return;
        }
        environment.update_variable(this.id_receptor, val_insert.valor);
    }
}
