import { nodoError } from '../error/error';
import { errores } from '../error/errores';

import { retorno, tipo } from '../abstract/valores';
import { ambiente } from '../herramientas/ambiente';
import { expresion } from '../abstract/expresion';

export enum operacion_relacional{
    IGUAL,
    NO_IGUAL,
    MENOR,
    MAYOR,
    MENOR_IGUAL,
    MAYOR_IGUAL
}

export class relacional extends expresion{
    
    constructor(private izquierda:expresion, private derecha:expresion, private tipo:operacion_relacional, linea:number, columna:number){
        super(linea, columna);
    }

    public ejecutar(environment:ambiente):retorno{
        let operacion_izquierda = this.izquierda.ejecutar(environment);
        let operacion_derecha = this.derecha.ejecutar(environment);

        let resultado;
        
        if(this.tipo == operacion_relacional.IGUAL){
            resultado = {
                valor: (operacion_izquierda.valor === operacion_derecha.valor),
                tipo: tipo.BOOLEAN
            };
        }else if(this.tipo == operacion_relacional.NO_IGUAL){
            resultado = {
                valor: (operacion_izquierda.valor != operacion_derecha.valor),
                tipo: tipo.BOOLEAN
            };
        }else if(this.tipo == operacion_relacional.MAYOR){
            resultado = {
                valor: (operacion_izquierda.valor > operacion_derecha.valor),
                tipo: tipo.BOOLEAN
            };
        }else if(this.tipo == operacion_relacional.MAYOR_IGUAL){
            resultado = {
                valor: (operacion_izquierda.valor >= operacion_derecha.valor),
                tipo: tipo.BOOLEAN
            };
        }else if(this.tipo == operacion_relacional.MENOR){
            resultado = {
                valor: (operacion_izquierda.valor < operacion_derecha.valor),
                tipo: tipo.BOOLEAN
            };
        }else if(this.tipo == operacion_relacional.MENOR_IGUAL){
            resultado = {
                valor: (operacion_izquierda.valor <= operacion_derecha.valor),
                tipo: tipo.BOOLEAN
            };
        }

        return resultado;
    }


}