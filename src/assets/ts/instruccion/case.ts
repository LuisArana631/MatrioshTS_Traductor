import { nodoError } from '../error/error';
import { errores } from '../error/errores';

import { instruccion } from '../abstract/instruccion';
import { expresion } from '../abstract/expresion';
import { ambiente } from '../herramientas/ambiente';
import { instrucciones_ } from '../instruccion/instrucciones';

export class case_ extends instruccion{
    constructor(public condicion:expresion, private instrucciones:instrucciones_, linea:number, columna:number){
        super(linea, columna);
    }

    public ejecutar(environment:ambiente){
        try{
            let elemento_str = this.instrucciones.ejecutar(environment, 4);

            return {
                valor: elemento_str,
                tipo: 1
            }
        }catch(error){
            errores.addError(new nodoError("Semántico",error, this.linea, this.columna, "Error"));
        }
    }
}