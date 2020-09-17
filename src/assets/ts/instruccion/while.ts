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
        console.log(this.condicion);
        let condicion = this.condicion.ejecutar(environment);
        let elemento_str:string = "";

        if(condicion.tipo != tipo.BOOLEAN){
            errores.addError(new nodoError("Semántico", "If solo puede ejecutarse con una expresión booleana", this.linea, this.columna, "Booleana"));
            return null;
        }else{
            while(condicion){
                const elemento = this.instrucciones.ejecutar(environment);

                console.log(this.instrucciones);

                if(elemento != null || elemento != undefined){
                    console.log(elemento);                    
                }

                console.log(this.condicion);
                condicion = this.condicion.ejecutar(environment);
                if(condicion.tipo != tipo.BOOLEAN){
                    errores.addError(new nodoError("Semántico", "If solo puede ejecutarse con una expresión booleana", this.linea, this.columna, "Booleana"));
                    return null;
                }
            }

            return {
                valor: elemento_str,
                tipo: 1
            }
        }        
    }
}