import { nodoError } from '../error/error';
import { tipo } from '../abstract/valores';
import { expresion } from '../abstract/expresion';
export var operacion_aritmetica;
(function (operacion_aritmetica) {
    operacion_aritmetica[operacion_aritmetica["SUMA"] = 0] = "SUMA";
    operacion_aritmetica[operacion_aritmetica["RESTA"] = 1] = "RESTA";
    operacion_aritmetica[operacion_aritmetica["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    operacion_aritmetica[operacion_aritmetica["DIVISION"] = 3] = "DIVISION";
    operacion_aritmetica[operacion_aritmetica["MODULO"] = 4] = "MODULO";
    operacion_aritmetica[operacion_aritmetica["POTENCIA"] = 5] = "POTENCIA";
})(operacion_aritmetica || (operacion_aritmetica = {}));
export class aritmetica extends expresion {
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
        if (this.tipo == operacion_aritmetica.SUMA) {
            if (tipo_guia == tipo.STRING) {
                resultado = {
                    valor: (operacion_izquierda.valor.toString() + operacion_derecha.valor.toString()),
                    tipo: tipo.STRING
                };
            }
            else if (tipo_guia == tipo.NUMBER) {
                resultado = {
                    valor: (operacion_izquierda.valor + operacion_derecha.valor),
                    tipo: tipo.NUMBER
                };
            }
            else {
                throw new nodoError("Semántico", "Tipos de datos incorrectos: ", this.linea, this.columna, tipo_guia.toString());
            }
        }
        return resultado;
    }
}
