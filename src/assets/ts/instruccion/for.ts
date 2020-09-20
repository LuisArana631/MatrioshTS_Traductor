import { nodoError } from '../error/error';
import { errores } from '../error/errores';

import { instruccion } from '../abstract/instruccion';
import { expresion } from '../abstract/expresion';
import { ambiente } from '../herramientas/ambiente';
import { tipo } from '../abstract/valores';
import { instrucciones_ } from '../instruccion/instrucciones';

export class for_ extends instruccion{
    constructor(private condicion:expresion, private alterar_variable:expresion, private variable:instruccion, private instrucciones:instrucciones_,private id:string, linea:number, columna:number){
        super(linea, columna);
    }

    public ejecutar(environment:ambiente){
        let elemento_str:string = "";
        if(this.variable){
            this.variable.ejecutar(environment);
        }
        
        let variable = environment.get_variable(this.id);

        if(variable == null || variable == undefined){
            errores.addError(new nodoError("Semántico", "Variable no encontrada", this.linea, this.columna, "Number"));
            return null;
        }        

        if(variable.tipo != tipo.NUMBER){
            errores.addError(new nodoError("Semántico", "Tipo de dato incorrecto", this.linea, this.columna, "Number"));
            return null;
        }

        for(variable.valor; this.condicion.ejecutar(environment).valor; this.alterar_variable.ejecutar(environment)){
            const elemento = this.instrucciones.ejecutar(environment, 1);

            if(elemento != null || elemento != undefined){
                elemento_str += elemento.valor;      
            }
        }

        return {
            valor: elemento_str,
            tipo: 1
        }
    }
}