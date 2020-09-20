import { nodoError } from '../error/error';
import { errores } from '../error/errores';

import { instruccion } from '../abstract/instruccion';
import { expresion } from '../abstract/expresion';
import { ambiente } from '../herramientas/ambiente';

export class asignacion_ extends instruccion{
    constructor(private exp:expresion, private id_receptor:string, linea:number, columna:number ){
        super(linea, columna);
    }

    public ejecutar(environment:ambiente){
        let val_insert:any;
        let variable_receptora = environment.get_variable(this.id_receptor);
        val_insert = this.exp.ejecutar(environment);

        if(val_insert.tipo != variable_receptora.tipo){
            errores.addError(new nodoError("Semántico", "No se puede insertar " + val_insert.tipo + " a una variable tipo " + variable_receptora.tipo, this.linea, this.columna, "Tipos incorrectos"));
        }

        environment.update_variable(this.id_receptor, val_insert.valor);
    }
}