import { nodoError } from '../error/error';
import { errores } from '../error/errores';

import { retorno, tipo } from '../abstract/valores';
import { ambiente } from '../herramientas/ambiente';
import { expresion } from '../abstract/expresion';

export enum operacion_logica{
    OR,
    AND,
    NEGAR
}

export class logica extends expresion{
    
    constructor(private izquierda:expresion, private derecha:expresion, private tipo:operacion_logica, linea:number, columna:number){
        super(linea, columna);
    }

    public ejecutar(environment:ambiente):retorno{
        let operacion_izquierda;
        let operacion_derecha;

        if(this.izquierda){
             operacion_izquierda = this.izquierda.ejecutar(environment);
        }
            
        if(this.derecha){
            operacion_derecha = this.derecha.ejecutar(environment);
        }        

        let resultado:retorno;
        let tipo_guia = operacion_izquierda.tipo;
        
        if(operacion_izquierda != null && operacion_derecha != null)
            tipo_guia = this.determinar_tipo(operacion_izquierda.tipo, operacion_derecha.tipo);

        if(this.tipo == operacion_logica.OR){
            if(tipo_guia == tipo.BOOLEAN){
                resultado = {
                    valor: (operacion_izquierda.valor || operacion_derecha.valor),
                    tipo: tipo.BOOLEAN
                }
            }else{
                errores.addError(new nodoError("Semántico", "Solo se puede operar datos booleanos.", this.linea, this.columna, "tipo de dato"));
            }
        }else if(this.tipo == operacion_logica.AND){
            if(tipo_guia == tipo.BOOLEAN){
                resultado = {
                    valor: (operacion_izquierda.valor && operacion_derecha.valor),
                    tipo: tipo.BOOLEAN
                }
            }else{
                errores.addError(new nodoError("Semántico", "Solo se puede operar datos booleanos.", this.linea, this.columna, "tipo de dato"));
            }
        }else if(this.tipo == operacion_logica.NEGAR){
            if(tipo_guia == tipo.BOOLEAN){
                resultado = {
                    valor: (!operacion_izquierda.valor),
                    tipo: tipo.BOOLEAN
                }
            }else{
                errores.addError(new nodoError("Semántico", "Solo se puede operar datos booleanos.", this.linea, this.columna, "tipo de dato"));
            }
        }

        return resultado;
    }
}