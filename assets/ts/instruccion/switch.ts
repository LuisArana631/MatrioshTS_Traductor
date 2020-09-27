import { nodoError } from '../error/error';
import { errores } from '../error/errores';

import { instruccion } from '../abstract/instruccion';
import { expresion } from '../abstract/expresion';
import { ambiente } from '../herramientas/ambiente';

export class switch_ extends instruccion{
    constructor(private exp:expresion, private cases:Array<any>, linea:number, columna:number){
        super(linea, columna);
    }

    public ejecutar(environment:ambiente){
        let elemento_str:string = "";
        let val_condicion_guia = this.exp.ejecutar(environment);

        for(const case_item of this.cases){
            try{
                let val_condicion_case = case_item.nodo.condicion.ejecutar(environment);

                if(val_condicion_case.tipo != val_condicion_guia.tipo){
                    errores.addError(new nodoError("Semántico", "La condición del case no es correcta", case_item.linea, case_item.columna, "Error" ));
                }else{
                    if(val_condicion_case.valor === val_condicion_guia.valor){
                        const elemento = case_item.nodo.ejecutar(environment);
                        
                        if(elemento != undefined || elemento != null){
                            elemento_str += elemento.valor.valor + "\n";
                        }
                    }
                }
            }catch (error){
                errores.addError(new nodoError("Semántico", error, case_item.linea, case_item.columna, "Error"));
            }
        }

        return {
            valor:elemento_str,
            tipo: 1
        };

    }
}

