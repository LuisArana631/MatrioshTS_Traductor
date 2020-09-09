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
            if(tipo_guia == tipo.STRING){
                resultado = {
                    valor: (operacion_izquierda.valor.toString() + operacion_derecha.valor.toString()),
                    tipo: tipo.STRING
                }
            }else if(tipo_guia == tipo.NUMBER){
                resultado = {
                    valor: (operacion_izquierda.valor + operacion_derecha.valor),
                    tipo: tipo.NUMBER
                }
            }else{
                throw new nodoError("Semántico", "Tipos de datos incorrectos: ", this.linea, this.columna, tipo_guia.toString());                
            }
        }

        return resultado;
    }
}



