import { nodoError } from '../error/error';
import { errores } from '../error/errores';

import { instruccion } from '../abstract/instruccion';
import { expresion } from '../abstract/expresion';
import { ambiente } from '../herramientas/ambiente';
import { tipo } from '../abstract/valores';
import { instrucciones_ } from '../instruccion/instrucciones';

export class dowhile_ extends instruccion{
    constructor(private condicion:expresion, private instrucciones:instrucciones_, linea:number, columna:number){
        super(linea, columna);
    }

    public ejecutar(environment:ambiente){
        let condicion = this.condicion.ejecutar(environment);
        let elemento_str:string = "";

        if(condicion.tipo != tipo.BOOLEAN){
            errores.addError(new nodoError("Semántico", "If solo puede ejecutarse con una expresión booleana", this.linea, this.columna, "Booleana"));
            return null;
        }else{
            const elemento = this.instrucciones.ejecutar(environment, 0);

            if(elemento != null || elemento != undefined){
                elemento_str += elemento.valor;
            }

            while(condicion.valor){
                const elemento = this.instrucciones.ejecutar(environment, 0);

                if(elemento != null || elemento != undefined){
                    elemento_str += elemento.valor;      
                }

                condicion = this.condicion.ejecutar(environment);
            }

            return {
                valor: elemento_str,
                tipo: 1
            }
        }
    }
}