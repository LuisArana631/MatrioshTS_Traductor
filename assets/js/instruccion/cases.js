import { nodoError } from '../error/error';
import { errores } from '../error/errores';
import { instruccion } from '../abstract/instruccion';
export class cases_ extends instruccion {
    constructor(cases, linea, columna) {
        super(linea, columna);
        this.cases = cases;
    }
    ejecutar(environment) {
        let elemento_str = "";
        for (const case_item of this.cases) {
            try {
            }
            catch (error) {
                errores.addError(new nodoError("Semántico", error, case_item.linea, case_item.columna, "Error"));
            }
        }
    }
}
