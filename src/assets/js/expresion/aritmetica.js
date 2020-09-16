import { nodoError } from '../error/error';
import { errores } from '../error/errores';
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
    operacion_aritmetica[operacion_aritmetica["INCREMENTO"] = 6] = "INCREMENTO";
    operacion_aritmetica[operacion_aritmetica["DECREMENTO"] = 7] = "DECREMENTO";
    operacion_aritmetica[operacion_aritmetica["NEGAR"] = 8] = "NEGAR";
})(operacion_aritmetica || (operacion_aritmetica = {}));
export class aritmetica extends expresion {
    constructor(izquierda, derecha, tipo, linea, columna) {
        super(linea, columna);
        this.izquierda = izquierda;
        this.derecha = derecha;
        this.tipo = tipo;
    }
    ejecutar(environment) {
        let operacion_izquierda;
        let operacion_derecha;
        if (this.izquierda) {
            operacion_izquierda = this.izquierda.ejecutar(environment);
        }
        if (this.derecha) {
            operacion_derecha = this.derecha.ejecutar(environment);
        }
        let resultado;
        let tipo_guia = this.determinar_tipo(operacion_izquierda.tipo, operacion_derecha.tipo);
        if (this.tipo == operacion_aritmetica.SUMA) {
            if (tipo_guia == tipo.NUMBER) {
                resultado = {
                    valor: (operacion_izquierda.valor + operacion_derecha.valor),
                    tipo: tipo.NUMBER
                };
            }
            else if (tipo_guia == tipo.STRING) {
                resultado = {
                    valor: (operacion_izquierda.valor.toString() + operacion_derecha.valor.toString()),
                    tipo: tipo.STRING
                };
            }
            else if (tipo_guia == tipo.BOOLEAN) {
                errores.addError(new nodoError("Semántico", "No se puede sumar", this.linea, this.columna, "booleanos"));
            }
            else if (tipo_guia == tipo.VOID) {
                errores.addError(new nodoError("Semántico", "No se puede sumar", this.linea, this.columna, "void"));
            }
            else if (tipo_guia == tipo.NULL) {
                errores.addError(new nodoError("Semántico", "No se puede sumar", this.linea, this.columna, "null"));
            }
            else if (tipo_guia == tipo.TYPES) {
                errores.addError(new nodoError("Semántico", "No se puede sumar", this.linea, this.columna, "type"));
            }
            else if (tipo_guia == tipo.ARRAY) {
                errores.addError(new nodoError("Semántico", "No se puede sumar", this.linea, this.columna, "array"));
            }
            else {
                errores.addError(new nodoError("Semántico", "No se puede sumar", this.linea, this.columna, "desconocido"));
            }
        }
        else if (this.tipo == operacion_aritmetica.RESTA) {
            if (tipo_guia == tipo.NUMBER) {
                resultado = {
                    valor: (operacion_izquierda.valor - operacion_derecha.valor),
                    tipo: tipo.NUMBER
                };
            }
            else if (tipo_guia == tipo.STRING) {
                errores.addError(new nodoError("Semántico", "No se puede restar", this.linea, this.columna, "string"));
            }
            else if (tipo_guia == tipo.BOOLEAN) {
                errores.addError(new nodoError("Semántico", "No se puede restar", this.linea, this.columna, "booleanos"));
            }
            else if (tipo_guia == tipo.VOID) {
                errores.addError(new nodoError("Semántico", "No se puede restar", this.linea, this.columna, "void"));
            }
            else if (tipo_guia == tipo.NULL) {
                errores.addError(new nodoError("Semántico", "No se puede restar", this.linea, this.columna, "null"));
            }
            else if (tipo_guia == tipo.TYPES) {
                errores.addError(new nodoError("Semántico", "No se puede restar", this.linea, this.columna, "type"));
            }
            else if (tipo_guia == tipo.ARRAY) {
                errores.addError(new nodoError("Semántico", "No se puede restar", this.linea, this.columna, "array"));
            }
            else {
                errores.addError(new nodoError("Semántico", "No se puede restar", this.linea, this.columna, "desconocido"));
            }
        }
        else if (this.tipo == operacion_aritmetica.MULTIPLICACION) {
            if (tipo_guia == tipo.NUMBER) {
                resultado = {
                    valor: (operacion_izquierda.valor * operacion_derecha.valor),
                    tipo: tipo.NUMBER
                };
            }
            else if (tipo_guia == tipo.STRING) {
                errores.addError(new nodoError("Semántico", "No se puede multiplicar", this.linea, this.columna, "string"));
            }
            else if (tipo_guia == tipo.BOOLEAN) {
                errores.addError(new nodoError("Semántico", "No se puede multiplicar", this.linea, this.columna, "booleanos"));
            }
            else if (tipo_guia == tipo.VOID) {
                errores.addError(new nodoError("Semántico", "No se puede multiplicar", this.linea, this.columna, "void"));
            }
            else if (tipo_guia == tipo.NULL) {
                errores.addError(new nodoError("Semántico", "No se puede multiplicar", this.linea, this.columna, "null"));
            }
            else if (tipo_guia == tipo.TYPES) {
                errores.addError(new nodoError("Semántico", "No se puede multiplicar", this.linea, this.columna, "type"));
            }
            else if (tipo_guia == tipo.ARRAY) {
                errores.addError(new nodoError("Semántico", "No se puede multiplicar", this.linea, this.columna, "array"));
            }
            else {
                errores.addError(new nodoError("Semántico", "No se puede multiplicar", this.linea, this.columna, "desconocido"));
            }
        }
        else if (this.tipo == operacion_aritmetica.DIVISION) {
            if (tipo_guia == tipo.NUMBER) {
                resultado = {
                    valor: (operacion_izquierda.valor / operacion_derecha.valor),
                    tipo: tipo.NUMBER
                };
            }
            else if (tipo_guia == tipo.STRING) {
                errores.addError(new nodoError("Semántico", "No se puede dividir", this.linea, this.columna, "string"));
            }
            else if (tipo_guia == tipo.BOOLEAN) {
                errores.addError(new nodoError("Semántico", "No se puede dividir", this.linea, this.columna, "booleanos"));
            }
            else if (tipo_guia == tipo.VOID) {
                errores.addError(new nodoError("Semántico", "No se puede dividir", this.linea, this.columna, "void"));
            }
            else if (tipo_guia == tipo.NULL) {
                errores.addError(new nodoError("Semántico", "No se puede dividir", this.linea, this.columna, "null"));
            }
            else if (tipo_guia == tipo.TYPES) {
                errores.addError(new nodoError("Semántico", "No se puede dividir", this.linea, this.columna, "type"));
            }
            else if (tipo_guia == tipo.ARRAY) {
                errores.addError(new nodoError("Semántico", "No se puede dividir", this.linea, this.columna, "array"));
            }
            else {
                errores.addError(new nodoError("Semántico", "No se puede dividir", this.linea, this.columna, "desconocido"));
            }
        }
        else if (this.tipo == operacion_aritmetica.MODULO) {
            if (tipo_guia == tipo.NUMBER) {
                resultado = {
                    valor: (operacion_izquierda.valor % operacion_derecha.valor),
                    tipo: tipo.NUMBER
                };
            }
            else if (tipo_guia == tipo.STRING) {
                errores.addError(new nodoError("Semántico", "No se puede dividir modulo", this.linea, this.columna, "string"));
            }
            else if (tipo_guia == tipo.BOOLEAN) {
                errores.addError(new nodoError("Semántico", "No se puede dividir modulo", this.linea, this.columna, "booleanos"));
            }
            else if (tipo_guia == tipo.VOID) {
                errores.addError(new nodoError("Semántico", "No se puede dividir modulo", this.linea, this.columna, "void"));
            }
            else if (tipo_guia == tipo.NULL) {
                errores.addError(new nodoError("Semántico", "No se puede dividir modulo", this.linea, this.columna, "null"));
            }
            else if (tipo_guia == tipo.TYPES) {
                errores.addError(new nodoError("Semántico", "No se puede dividir modulo", this.linea, this.columna, "type"));
            }
            else if (tipo_guia == tipo.ARRAY) {
                errores.addError(new nodoError("Semántico", "No se puede dividir modulo", this.linea, this.columna, "array"));
            }
            else {
                errores.addError(new nodoError("Semántico", "No se puede dividir modulo", this.linea, this.columna, "desconocido"));
            }
        }
        else if (this.tipo == operacion_aritmetica.POTENCIA) {
            if (tipo_guia == tipo.NUMBER) {
                resultado = {
                    valor: (Math.pow(operacion_izquierda.valor, operacion_derecha.valor)),
                    tipo: tipo.NUMBER
                };
            }
            else if (tipo_guia == tipo.STRING) {
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "string"));
            }
            else if (tipo_guia == tipo.BOOLEAN) {
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "booleanos"));
            }
            else if (tipo_guia == tipo.VOID) {
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "void"));
            }
            else if (tipo_guia == tipo.NULL) {
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "null"));
            }
            else if (tipo_guia == tipo.TYPES) {
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "type"));
            }
            else if (tipo_guia == tipo.ARRAY) {
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "array"));
            }
            else {
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "desconocido"));
            }
        }
        else if (this.tipo == operacion_aritmetica.INCREMENTO) {
            if (tipo_guia == tipo.NUMBER) {
                resultado = {
                    valor: (operacion_izquierda.valor++),
                    tipo: tipo.NUMBER
                };
            }
            else if (tipo_guia == tipo.STRING) {
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "string"));
            }
            else if (tipo_guia == tipo.BOOLEAN) {
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "booleanos"));
            }
            else if (tipo_guia == tipo.VOID) {
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "void"));
            }
            else if (tipo_guia == tipo.NULL) {
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "null"));
            }
            else if (tipo_guia == tipo.TYPES) {
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "type"));
            }
            else if (tipo_guia == tipo.ARRAY) {
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "array"));
            }
            else {
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "desconocido"));
            }
        }
        else if (this.tipo == operacion_aritmetica.DECREMENTO) {
            if (tipo_guia == tipo.NUMBER) {
                resultado = {
                    valor: (operacion_izquierda.valor--),
                    tipo: tipo.NUMBER
                };
            }
            else if (tipo_guia == tipo.STRING) {
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "string"));
            }
            else if (tipo_guia == tipo.BOOLEAN) {
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "booleanos"));
            }
            else if (tipo_guia == tipo.VOID) {
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "void"));
            }
            else if (tipo_guia == tipo.NULL) {
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "null"));
            }
            else if (tipo_guia == tipo.TYPES) {
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "type"));
            }
            else if (tipo_guia == tipo.ARRAY) {
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "array"));
            }
            else {
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "desconocido"));
            }
        }
        else if (this.tipo == operacion_aritmetica.NEGAR) {
            if (tipo_guia == tipo.NUMBER) {
                resultado = {
                    valor: (-operacion_izquierda.valor),
                    tipo: tipo.NUMBER
                };
            }
            else if (tipo_guia == tipo.STRING) {
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "string"));
            }
            else if (tipo_guia == tipo.BOOLEAN) {
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "booleanos"));
            }
            else if (tipo_guia == tipo.VOID) {
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "void"));
            }
            else if (tipo_guia == tipo.NULL) {
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "null"));
            }
            else if (tipo_guia == tipo.TYPES) {
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "type"));
            }
            else if (tipo_guia == tipo.ARRAY) {
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "array"));
            }
            else {
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "desconocido"));
            }
        }
        return resultado;
    }
}
