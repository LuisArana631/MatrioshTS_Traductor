import { instruccion } from '../abstract/instruccion';
import { nodoError } from '../error/error';
import { errores } from '../error/errores';
import { ambiente } from '../herramientas/ambiente';

export class length_ extends instruccion{
    constructor(private id:string, linea:number, columna:number){
        super(linea, columna);
    }

    public ejecutar(environment:ambiente){
        let val_return:any = null;
        let variable_receptora = environment.get_variable(this.id);

        try{
            val_return = {
                valor: variable_receptora.valor.length,
                tipo: 0
            }
        }catch(error){
            errores.addError(new nodoError("Semántico", error, this.linea, this.columna, "Error"));
        }

        return val_return;
    }
}