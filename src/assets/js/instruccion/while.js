import { nodoError } from '../error/error';
import { errores } from '../error/errores';
import { instruccion } from '../abstract/instruccion';
import { tipo } from '../abstract/valores';
export class while_ extends instruccion {
    constructor(condicion, instrucciones, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }
    ejecutar(environment) {
        console.log(this.condicion);
        let condicion = this.condicion.ejecutar(environment);
        let elemento_str = "";
        if (condicion.tipo != tipo.BOOLEAN) {
            errores.addError(new nodoError("Semántico", "If solo puede ejecutarse con una expresión booleana", this.linea, this.columna, "Booleana"));
            return null;
        }
        else {
            while (condicion) {
                const elemento = this.instrucciones.ejecutar(environment);
                console.log(this.instrucciones);
                if (elemento != null || elemento != undefined) {
                    console.log(elemento);
                }
                console.log(this.condicion);
                condicion = this.condicion.ejecutar(environment);
                if (condicion.tipo != tipo.BOOLEAN) {
                    errores.addError(new nodoError("Semántico", "If solo puede ejecutarse con una expresión booleana", this.linea, this.columna, "Booleana"));
                    return null;
                }
            }
            return {
                valor: elemento_str,
                tipo: 1
            };
        }
    }
}
