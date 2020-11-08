import { nodoError } from '../../error/error';
import { instruccion_c3d } from '../abstract/instruccion';
import { ambiente_c3d } from '../tabla_simbolos/ambiente';
import { generador } from './generador';

export class call_c3d extends instruccion_c3d{
    constructor(public id_:string, public parametros:Array<any>, linea_:number, columna_:number){
        super(linea_, columna_);
    }

    public traducir(env_:ambiente_c3d, generador_:generador, errores_:Array<nodoError>){
        try{            
            generador_.next_stack(env_.size + generador_.get_temporales().size);
            generador_.add_call(this.id_);
            generador_.prev_stack(env_.size + generador_.get_temporales().size);
        }catch(error){
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, "Error en llamada de función"));
        }
    }
}