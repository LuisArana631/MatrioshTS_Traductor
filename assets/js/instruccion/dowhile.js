import { nodoError } from '../error/error';
import { errores } from '../error/errores';
import { instruccion } from '../abstract/instruccion';
import { tipo } from '../abstract/valores';
export class dowhile_ extends instruccion {
    constructor(condicion, instrucciones, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }
    ejecutar(environment) {
        let condicion = this.condicion.ejecutar(environment);
        let elemento_str = "";
        if (condicion.tipo != tipo.BOOLEAN) {
            errores.addError(new nodoError("Semántico", "If solo puede ejecutarse con una expresión booleana", this.linea, this.columna, "Booleana"));
            return null;
        }
        else {
            const elemento = this.instrucciones.ejecutar(environment, 0);
            if (elemento != null || elemento != undefined) {
                elemento_str += elemento.valor;
            }
            while (condicion.valor) {
                const elemento = this.instrucciones.ejecutar(environment, 0);
                if (elemento != null || elemento != undefined) {
                    elemento_str += elemento.valor;
                }
                condicion = this.condicion.ejecutar(environment);
            }
            return {
                valor: elemento_str,
                tipo: 1
            };
        }
    }
}
