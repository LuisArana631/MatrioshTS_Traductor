import { nodoError } from '../error/error';
import { errores } from '../error/errores';

import { instruccion } from '../abstract/instruccion';
import { expresion } from '../abstract/expresion';
import { ambiente } from '../herramientas/ambiente';
import { tipo } from '../abstract/valores'; 
import { instrucciones_ } from '../instruccion/instrucciones';

export class if_ extends instruccion{
    constructor(private condicion:expresion, private instrucciones:instrucciones_, private elst:instruccion|null, linea:number, columna:number){
        super(linea,columna);   
    }

    public ejecutar(environment:ambiente){
        const condicion = this.condicion.ejecutar(environment);

        if(condicion.tipo != tipo.BOOLEAN){
            errores.addError(new nodoError("Semántico", "If solo puede ejecutarse con una expresión booleana", this.linea, this.columna, "Booleana"));
            return null;
        }else{
            if(condicion.valor == true){                                                
                return this.instrucciones.ejecutar(environment, 2);
            }else{
                return this.elst?.ejecutar(environment);
            }
        }
    }
}