import { nodoError } from '../error/error';
import { errores } from '../error/errores';

import { instruccion } from '../abstract/instruccion';
import { expresion } from '../abstract/expresion';
import { ambiente } from '../herramientas/ambiente';
import { tipo } from '../abstract/valores'; 
import { instrucciones_ } from '../instruccion/instrucciones';

export class while_ extends instruccion{
    constructor(private condicion:expresion, private instrucciones:instrucciones_, linea:number, columna:number){
        super(linea, columna);
    }

    public ejecutar(environment:ambiente){
        let condicion = this.condicion.ejecutar(environment);


        if(condicion.tipo != tipo.BOOLEAN){
            errores.addError(new nodoError("Semántico", "If solo puede ejecutarse con una expresión booleana", this.linea, this.columna, "Booleana"));
            return null;
        }else{
            while(condicion){
                const elemento = this.instrucciones.ejecutar(environment);

                if(elemento != null || elemento != undefined){
                    return this.instrucciones.ejecutar(environment);                    
                }

                condicion = this.condicion.ejecutar(environment);

                if(condicion.tipo != tipo.BOOLEAN){
                    errores.addError(new nodoError("Semántico", "If solo puede ejecutarse con una expresión booleana", this.linea, this.columna, "Booleana"));
                    return null;
                }
            }
        }        
    }
}