import { nodoError } from '../error/error';
import { errores } from '../error/errores';

import { retorno, tipo } from '../abstract/valores';
import { ambiente } from '../herramientas/ambiente';
import { expresion } from '../abstract/expresion';

export enum operacion_aritmetica{
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    MODULO,
    POTENCIA
}

export class aritmetica extends expresion{

    constructor(private izquierda:expresion, private derecha:expresion, private tipo:operacion_aritmetica, linea:number, columna:number){
        super(linea, columna);
    }

    public ejecutar(environment:ambiente):retorno{
        let operacion_izquierda = this.izquierda.ejecutar(environment);
        let operacion_derecha = this.derecha.ejecutar(environment);

        let resultado:retorno;
        let tipo_guia = this.determinar_tipo(operacion_izquierda.tipo, operacion_derecha.tipo);

        if(this.tipo == operacion_aritmetica.SUMA){
            if(tipo_guia == tipo.NUMBER){
                resultado = {
                    valor: (operacion_izquierda.valor + operacion_derecha.valor),
                    tipo: tipo.NUMBER
                };
            }else if(tipo_guia == tipo.STRING){
                resultado = {
                    valor: (operacion_izquierda.valor.toString() + operacion_derecha.valor.toString()),
                    tipo: tipo.STRING
                };
            }else if(tipo_guia == tipo.BOOLEAN){
                errores.addError(new nodoError("Semántico", "No se puede sumar", this.linea, this.columna, "booleanos"));
            }else if(tipo_guia == tipo.VOID){
                errores.addError(new nodoError("Semántico", "No se puede sumar", this.linea, this.columna, "void"));
            }else if(tipo_guia == tipo.NULL){
                errores.addError(new nodoError("Semántico", "No se puede sumar", this.linea, this.columna, "null"));
            }else if(tipo_guia == tipo.TYPES){
                errores.addError(new nodoError("Semántico", "No se puede sumar", this.linea, this.columna, "type"));
            }else if(tipo_guia == tipo.ARRAY){
                errores.addError(new nodoError("Semántico", "No se puede sumar", this.linea, this.columna, "array"));
            }else{
                errores.addError(new nodoError("Semántico", "No se puede sumar", this.linea, this.columna, "desconocido"));
            }
        }else if(this.tipo == operacion_aritmetica.RESTA){
            if(tipo_guia == tipo.NUMBER){
                resultado = {
                    valor: (operacion_izquierda.valor - operacion_derecha.valor),
                    tipo: tipo.NUMBER
                };
            }else if(tipo_guia == tipo.STRING){
                errores.addError(new nodoError("Semántico", "No se puede restar", this.linea, this.columna, "string"));
            }else if(tipo_guia == tipo.BOOLEAN){
                errores.addError(new nodoError("Semántico", "No se puede restar", this.linea, this.columna, "booleanos"));
            }else if(tipo_guia == tipo.VOID){
                errores.addError(new nodoError("Semántico", "No se puede restar", this.linea, this.columna, "void"));
            }else if(tipo_guia == tipo.NULL){
                errores.addError(new nodoError("Semántico", "No se puede restar", this.linea, this.columna, "null"));
            }else if(tipo_guia == tipo.TYPES){
                errores.addError(new nodoError("Semántico", "No se puede restar", this.linea, this.columna, "type"));
            }else if(tipo_guia == tipo.ARRAY){
                errores.addError(new nodoError("Semántico", "No se puede restar", this.linea, this.columna, "array"));
            }else{
                errores.addError(new nodoError("Semántico", "No se puede restar", this.linea, this.columna, "desconocido"));
            }
        }else if(this.tipo == operacion_aritmetica.MULTIPLICACION){
            if(tipo_guia == tipo.NUMBER){
                resultado = {
                    valor: (operacion_izquierda.valor * operacion_derecha.valor),
                    tipo: tipo.NUMBER
                };
            }else if(tipo_guia == tipo.STRING){
                errores.addError(new nodoError("Semántico", "No se puede multiplicar", this.linea, this.columna, "string"));
            }else if(tipo_guia == tipo.BOOLEAN){
                errores.addError(new nodoError("Semántico", "No se puede multiplicar", this.linea, this.columna, "booleanos"));
            }else if(tipo_guia == tipo.VOID){
                errores.addError(new nodoError("Semántico", "No se puede multiplicar", this.linea, this.columna, "void"));
            }else if(tipo_guia == tipo.NULL){
                errores.addError(new nodoError("Semántico", "No se puede multiplicar", this.linea, this.columna, "null"));
            }else if(tipo_guia == tipo.TYPES){
                errores.addError(new nodoError("Semántico", "No se puede multiplicar", this.linea, this.columna, "type"));
            }else if(tipo_guia == tipo.ARRAY){
                errores.addError(new nodoError("Semántico", "No se puede multiplicar", this.linea, this.columna, "array"));
            }else{
                errores.addError(new nodoError("Semántico", "No se puede multiplicar", this.linea, this.columna, "desconocido"));
            }
        }else if(this.tipo == operacion_aritmetica.DIVISION){
            if(tipo_guia == tipo.NUMBER){
                resultado = {
                    valor: (operacion_izquierda.valor / operacion_derecha.valor),
                    tipo: tipo.NUMBER
                };
            }else if(tipo_guia == tipo.STRING){
                errores.addError(new nodoError("Semántico", "No se puede dividir", this.linea, this.columna, "string"));
            }else if(tipo_guia == tipo.BOOLEAN){
                errores.addError(new nodoError("Semántico", "No se puede dividir", this.linea, this.columna, "booleanos"));
            }else if(tipo_guia == tipo.VOID){
                errores.addError(new nodoError("Semántico", "No se puede dividir", this.linea, this.columna, "void"));
            }else if(tipo_guia == tipo.NULL){
                errores.addError(new nodoError("Semántico", "No se puede dividir", this.linea, this.columna, "null"));
            }else if(tipo_guia == tipo.TYPES){
                errores.addError(new nodoError("Semántico", "No se puede dividir", this.linea, this.columna, "type"));
            }else if(tipo_guia == tipo.ARRAY){
                errores.addError(new nodoError("Semántico", "No se puede dividir", this.linea, this.columna, "array"));
            }else{
                errores.addError(new nodoError("Semántico", "No se puede dividir", this.linea, this.columna, "desconocido"));
            }
        }else if(this.tipo == operacion_aritmetica.MODULO){
            if(tipo_guia == tipo.NUMBER){
                resultado = {
                    valor: (operacion_izquierda.valor % operacion_derecha.valor),
                    tipo: tipo.NUMBER
                };
            }else if(tipo_guia == tipo.STRING){
                errores.addError(new nodoError("Semántico", "No se puede dividir modulo", this.linea, this.columna, "string"));
            }else if(tipo_guia == tipo.BOOLEAN){
                errores.addError(new nodoError("Semántico", "No se puede dividir modulo", this.linea, this.columna, "booleanos"));
            }else if(tipo_guia == tipo.VOID){
                errores.addError(new nodoError("Semántico", "No se puede dividir modulo", this.linea, this.columna, "void"));
            }else if(tipo_guia == tipo.NULL){
                errores.addError(new nodoError("Semántico", "No se puede dividir modulo", this.linea, this.columna, "null"));
            }else if(tipo_guia == tipo.TYPES){
                errores.addError(new nodoError("Semántico", "No se puede dividir modulo", this.linea, this.columna, "type"));
            }else if(tipo_guia == tipo.ARRAY){
                errores.addError(new nodoError("Semántico", "No se puede dividir modulo", this.linea, this.columna, "array"));
            }else{
                errores.addError(new nodoError("Semántico", "No se puede dividir modulo", this.linea, this.columna, "desconocido"));
            }
        }else if(this.tipo == operacion_aritmetica.POTENCIA){
            if(tipo_guia == tipo.NUMBER){
                resultado = {
                    valor: (operacion_izquierda.valor ** operacion_derecha.valor),
                    tipo: tipo.NUMBER
                };
            }else if(tipo_guia == tipo.STRING){
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "string"));
            }else if(tipo_guia == tipo.BOOLEAN){
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "booleanos"));
            }else if(tipo_guia == tipo.VOID){
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "void"));
            }else if(tipo_guia == tipo.NULL){
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "null"));
            }else if(tipo_guia == tipo.TYPES){
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "type"));
            }else if(tipo_guia == tipo.ARRAY){
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "array"));
            }else{
                errores.addError(new nodoError("Semántico", "No se puede realizar potencia", this.linea, this.columna, "desconocido"));
            }
        }

        return resultado;
    }
}



