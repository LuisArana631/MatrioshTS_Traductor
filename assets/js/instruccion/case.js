import { nodoError } from '../error/error';
import { errores } from '../error/errores';
import { instruccion } from '../abstract/instruccion';
export class case_ extends instruccion {
    constructor(condicion, instrucciones, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }
    ejecutar(environment) {
        try {
            let elemento_str = this.instrucciones.ejecutar(environment, 4);
            return {
                valor: elemento_str,
                tipo: 1
            };
        }
        catch (error) {
            errores.addError(new nodoError("Semántico", error, this.linea, this.columna, "Error"));
        }
    }
}
