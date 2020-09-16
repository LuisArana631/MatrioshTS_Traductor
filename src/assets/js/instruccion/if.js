import { nodoError } from '../error/error';
import { errores } from '../error/errores';
import { instruccion } from '../abstract/instruccion';
import { tipo } from '../abstract/valores';
export class if_ extends instruccion {
    constructor(condicion, instrucciones, elst, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
        this.elst = elst;
    }
    ejecutar(environment) {
        var _a;
        const condicion = this.condicion.ejecutar(environment);
        if (condicion.tipo != tipo.BOOLEAN) {
            errores.addError(new nodoError("Semántico", "If solo puede ejecutarse con una expresión booleana", this.linea, this.columna, "Booleana"));
            return null;
        }
        else {
            if (condicion.valor == true) {
                return this.instrucciones.ejecutar(environment);
            }
            else {
                return (_a = this.elst) === null || _a === void 0 ? void 0 : _a.ejecutar(environment);
            }
        }
    }
}
