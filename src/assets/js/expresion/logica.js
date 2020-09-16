import { nodoError } from '../error/error';
import { errores } from '../error/errores';
import { tipo } from '../abstract/valores';
import { expresion } from '../abstract/expresion';
export var operacion_logica;
(function (operacion_logica) {
    operacion_logica[operacion_logica["OR"] = 0] = "OR";
    operacion_logica[operacion_logica["AND"] = 1] = "AND";
    operacion_logica[operacion_logica["NEGAR"] = 2] = "NEGAR";
})(operacion_logica || (operacion_logica = {}));
export class logica extends expresion {
    constructor(izquierda, derecha, tipo, linea, columna) {
        super(linea, columna);
        this.izquierda = izquierda;
        this.derecha = derecha;
        this.tipo = tipo;
    }
    ejecutar(environment) {
        let operacion_izquierda = this.izquierda.ejecutar(environment);
        let operacion_derecha = this.derecha.ejecutar(environment);
        let resultado;
        let tipo_guia = this.determinar_tipo(operacion_izquierda.tipo, operacion_derecha.tipo);
        if (this.tipo == operacion_logica.OR) {
            if (tipo_guia == tipo.BOOLEAN) {
                resultado = {
                    valor: (operacion_izquierda.valor || operacion_derecha.valor),
                    tipo: tipo.BOOLEAN
                };
            }
            else {
                errores.addError(new nodoError("Semántico", "Solo se puede operar datos booleanos.", this.linea, this.columna, "tipo de dato"));
            }
        }
        else if (this.tipo == operacion_logica.AND) {
            if (tipo_guia == tipo.BOOLEAN) {
                resultado = {
                    valor: (operacion_izquierda.valor && operacion_derecha.valor),
                    tipo: tipo.BOOLEAN
                };
            }
            else {
                errores.addError(new nodoError("Semántico", "Solo se puede operar datos booleanos.", this.linea, this.columna, "tipo de dato"));
            }
        }
        else if (this.tipo == operacion_logica.NEGAR) {
            if (tipo_guia == tipo.BOOLEAN) {
                resultado = {
                    valor: (!operacion_izquierda.valor),
                    tipo: tipo.BOOLEAN
                };
            }
            else {
                errores.addError(new nodoError("Semántico", "Solo se puede operar datos booleanos.", this.linea, this.columna, "tipo de dato"));
            }
        }
        return resultado;
    }
}
