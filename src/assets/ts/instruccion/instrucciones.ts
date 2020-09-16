import { instruccion } from '../abstract/instruccion';
import { ambiente } from '../herramientas/ambiente';

import { errores } from '../error/errores';
import { nodoError } from '../error/error';

export class instrucciones_ extends instruccion{
    constructor(private codigo:Array<any>, linea:number, columna:number){
        super(linea, columna);
    }

    public ejecutar(environment:ambiente){
        const nuevo_ambiente = new ambiente(environment);
        let elemento_str:string = "";

        for(const instr of this.codigo){
            try{
                const elemento = instr.nodo.ejecutar(nuevo_ambiente);

                if(elemento != undefined || elemento != null){
                    elemento_str += elemento.valor + "\n";
                }
            }catch(error){
                errores.addError(new nodoError("Semántico", error, instr.linea, instr.columna, "error"));
            }
        }

        
        return {
            valor: elemento_str,
            tipo: 1
        };
    }
}