import { instruccion } from '../abstract/instruccion';
import { ambiente } from '../herramientas/ambiente';
import { expresion } from '../abstract/expresion';
import { errores } from '../error/errores';
import { nodoError } from '../error/error';

export class push_ extends instruccion{
    constructor(private id:string, private val_:expresion, linea:number, columna:number){
        super(linea, columna);
    }

    public ejecutar(environment:ambiente){
        let val_return:any = this.val_.ejecutar(environment);
        let variable_ = environment.get_variable(this.id);

        try{
            val_return = variable_.valor.push(val_return);

            return{
                valor: val_return,
                variable: variable_.tipo
            }
        }catch(error){
            errores.addError(new nodoError("Semántico", error, this.linea, this.columna, "Error"));
        }

        return val_return;
    }
}