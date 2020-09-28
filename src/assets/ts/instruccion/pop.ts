import { instruccion } from '../abstract/instruccion';
import { errores } from '../error/errores';
import { ambiente } from '../herramientas/ambiente';
import { nodoError } from '../error/error';

export class pop_ extends instruccion{
    constructor(private id:string, linea:number, columna:number){
        super(linea, columna);
    }

    public ejecutar(environment:ambiente){
        let val_return:any = null;
        let variable_ = environment.get_variable(this.id);

        try{
            val_return = variable_.valor.pop();
        }catch(error){
            errores.addError(new nodoError("Semántico", error, this.linea, this.columna, "Error"));
        }

        return val_return;
    }
}