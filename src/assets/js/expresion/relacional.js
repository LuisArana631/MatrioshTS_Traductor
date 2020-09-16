import { tipo } from '../abstract/valores';
import { expresion } from '../abstract/expresion';
export var operacion_relacional;
(function (operacion_relacional) {
    operacion_relacional[operacion_relacional["IGUAL"] = 0] = "IGUAL";
    operacion_relacional[operacion_relacional["NO_IGUAL"] = 1] = "NO_IGUAL";
    operacion_relacional[operacion_relacional["MENOR"] = 2] = "MENOR";
    operacion_relacional[operacion_relacional["MAYOR"] = 3] = "MAYOR";
    operacion_relacional[operacion_relacional["MENOR_IGUAL"] = 4] = "MENOR_IGUAL";
    operacion_relacional[operacion_relacional["MAYOR_IGUAL"] = 5] = "MAYOR_IGUAL";
})(operacion_relacional || (operacion_relacional = {}));
export class relacional extends expresion {
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
        if (this.tipo == operacion_relacional.IGUAL) {
            resultado = {
                valor: (operacion_izquierda.valor === operacion_derecha.valor),
                tipo: tipo.BOOLEAN
            };
        }
        else if (this.tipo == operacion_relacional.NO_IGUAL) {
            resultado = {
                valor: (operacion_izquierda.valor != operacion_derecha.valor),
                tipo: tipo.BOOLEAN
            };
        }
        else if (this.tipo == operacion_relacional.MAYOR) {
            resultado = {
                valor: (operacion_izquierda.valor > operacion_derecha.valor),
                tipo: tipo.BOOLEAN
            };
        }
        else if (this.tipo == operacion_relacional.MAYOR_IGUAL) {
            resultado = {
                valor: (operacion_izquierda.valor >= operacion_derecha.valor),
                tipo: tipo.BOOLEAN
            };
        }
        else if (this.tipo == operacion_relacional.MENOR) {
            resultado = {
                valor: (operacion_izquierda.valor < operacion_derecha.valor),
                tipo: tipo.BOOLEAN
            };
        }
        else if (this.tipo == operacion_relacional.MENOR_IGUAL) {
            resultado = {
                valor: (operacion_izquierda.valor <= operacion_derecha.valor),
                tipo: tipo.BOOLEAN
            };
        }
        return resultado;
    }
}
