import { nodoError } from '../error/error';
import { errores } from '../error/errores';
import { tipo } from '../abstract/valores';
import { expresion } from '../abstract/expresion';
export var operacion_unitaria;
(function (operacion_unitaria) {
    operacion_unitaria[operacion_unitaria["INCREMENTO"] = 0] = "INCREMENTO";
    operacion_unitaria[operacion_unitaria["DECREMENTO"] = 1] = "DECREMENTO";
})(operacion_unitaria || (operacion_unitaria = {}));
export class aritmetica_unitaria extends expresion {
    constructor(exp, tipo, id, linea, columna) {
        super(linea, columna);
        this.exp = exp;
        this.tipo = tipo;
        this.id = id;
    }
    ejecutar(environment) {
        let operacion_ = this.exp.ejecutar(environment);
        let resultado;
        let tipo_guia = this.determinar_tipo(operacion_.tipo, 0); //SOLO SE PUEDE INCREMENTAR, DECREMENTO Y NEGAR NUMEROS
        if (this.tipo == operacion_unitaria.INCREMENTO) {
            if (this.id != "") { //SE INCLUYE ID
                if (tipo_guia == tipo.NUMBER) {
                    resultado = {
                        valor: (operacion_.valor + 1),
                        tipo: tipo.NUMBER
                    };
                    //ACTUALIZAR VARIABLE
                    environment.update_variable(this.id, resultado.valor);
                }
                else {
                    errores.addError(new nodoError("Semántico", "No se puede incrementar.", this.linea, this.columna, "Dato erroneo"));
                }
            }
            else { //NO SE INCLUYE ID
                errores.addError(new nodoError("Semántico", "Solo se puede incrementar variables", this.linea, this.columna, "Dato erroneo"));
            }
        }
        else if (this.tipo == operacion_unitaria.DECREMENTO) {
            if (this.id != "") { //SE INCLUYE ID
                if (tipo_guia == tipo.NUMBER) {
                    resultado = {
                        valor: (operacion_.valor - 1),
                        tipo: tipo.NUMBER
                    };
                    //ACTUALIZAR VARIABLE
                    environment.update_variable(this.id, resultado.valor);
                }
                else {
                    errores.addError(new nodoError("Semántico", "No se puede incrementar.", this.linea, this.columna, "Dato erroneo"));
                }
            }
            else { //NO SE INCLUYE ID
                errores.addError(new nodoError("Semántico", "Solo se puede decrementar variables", this.linea, this.columna, "Dato erroneo"));
            }
        }
        return null;
    }
}
