import { nodoError } from '../error/error';
import { errores } from '../error/errores';

import { retorno, tipo } from '../abstract/valores';
import { ambiente } from '../herramientas/ambiente';
import { expresion } from '../abstract/expresion';

export enum operacion_unitaria{
    INCREMENTO,
    DECREMENTO
}

export class aritmetica_unitaria extends expresion{
    constructor(private exp:expresion, private tipo:operacion_unitaria, private id:string, linea:number, columna:number){
        super(linea, columna);
    }

    public ejecutar(environment:ambiente):retorno{
        let operacion_ = this.exp.ejecutar(environment);

        let resultado:retorno;
        let tipo_guia = this.determinar_tipo(operacion_.tipo, 0);  //SOLO SE PUEDE INCREMENTAR, DECREMENTO Y NEGAR NUMEROS

        if(this.tipo == operacion_unitaria.INCREMENTO){
            if(this.id != ""){  //SE INCLUYE ID
                if(tipo_guia == tipo.NUMBER){
                    resultado = {
                        valor: (operacion_.valor + 1),
                        tipo: tipo.NUMBER
                    }

                    //ACTUALIZAR VARIABLE
                    environment.update_variable(this.id, resultado.valor);
                }else{
                    errores.addError(new nodoError("Semántico", "No se puede incrementar.", this.linea, this.columna, "Dato erroneo"));
                }
            }else{  //NO SE INCLUYE ID
                errores.addError(new nodoError("Semántico", "Solo se puede incrementar variables", this.linea, this.columna, "Dato erroneo"))
            }
        }else if(this.tipo == operacion_unitaria.DECREMENTO){
            if(this.id != ""){  //SE INCLUYE ID
                if(tipo_guia == tipo.NUMBER){
                    resultado = {
                        valor: (operacion_.valor - 1),
                        tipo: tipo.NUMBER
                    }

                    //ACTUALIZAR VARIABLE
                    environment.update_variable(this.id, resultado.valor);
                }else{
                    errores.addError(new nodoError("Semántico", "No se puede incrementar.", this.linea, this.columna, "Dato erroneo"));
                }
            }else{  //NO SE INCLUYE ID
                errores.addError(new nodoError("Semántico", "Solo se puede decrementar variables", this.linea, this.columna, "Dato erroneo"))
            }
        }

        return null;
    }
}