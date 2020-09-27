import { nodoError } from '../error/error';
import { errores } from '../error/errores';
import { instruccion } from '../abstract/instruccion';
export class switch_ extends instruccion {
    constructor(exp, cases, linea, columna) {
        super(linea, columna);
        this.exp = exp;
        this.cases = cases;
    }
    ejecutar(environment) {
        let elemento_str = "";
        let val_condicion_guia = this.exp.ejecutar(environment);
        for (const case_item of this.cases) {
            try {
                let val_condicion_case = case_item.nodo.condicion.ejecutar(environment);
                if (val_condicion_case.tipo != val_condicion_guia.tipo) {
                    errores.addError(new nodoError("Semántico", "La condición del case no es correcta", case_item.linea, case_item.columna, "Error"));
                }
                else {
                    if (val_condicion_case.valor === val_condicion_guia.valor) {
                        const elemento = case_item.nodo.ejecutar(environment);
                        if (elemento != undefined || elemento != null) {
                            elemento_str += elemento.valor.valor + "\n";
                        }
                    }
                }
            }
            catch (error) {
                errores.addError(new nodoError("Semántico", error, case_item.linea, case_item.columna, "Error"));
            }
        }
        return {
            valor: elemento_str,
            tipo: 1
        };
    }
}
