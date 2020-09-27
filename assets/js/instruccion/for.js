import { nodoError } from '../error/error';
import { errores } from '../error/errores';
import { instruccion } from '../abstract/instruccion';
import { tipo } from '../abstract/valores';
export class for_ extends instruccion {
    constructor(condicion, alterar_variable, variable, instrucciones, id, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.alterar_variable = alterar_variable;
        this.variable = variable;
        this.instrucciones = instrucciones;
        this.id = id;
    }
    ejecutar(environment) {
        let elemento_str = "";
        if (this.variable) {
            this.variable.ejecutar(environment);
        }
        let variable = environment.get_variable(this.id);
        if (variable == null || variable == undefined) {
            errores.addError(new nodoError("Semántico", "Variable no encontrada", this.linea, this.columna, "Number"));
            return null;
        }
        if (variable.tipo != tipo.NUMBER) {
            errores.addError(new nodoError("Semántico", "Tipo de dato incorrecto", this.linea, this.columna, "Number"));
            return null;
        }
        for (variable.valor; this.condicion.ejecutar(environment).valor; this.alterar_variable.ejecutar(environment)) {
            const elemento = this.instrucciones.ejecutar(environment, 1);
            if (elemento != null || elemento != undefined) {
                elemento_str += elemento.valor;
            }
        }
        return {
            valor: elemento_str,
            tipo: 1
        };
    }
}
