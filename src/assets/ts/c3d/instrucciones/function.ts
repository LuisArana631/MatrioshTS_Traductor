import { nodoError } from '../../error/error';
import { instruccion_c3d } from '../abstract/instruccion';
import { ambiente_c3d } from '../tabla_simbolos/ambiente';
import { generador } from './generador';
import { statement_ } from './statement';

export class function_c3d extends instruccion_c3d{
    constructor(public id_:string, public instrucciones_:statement_, public parametros:Array<any>, linea_:number, columna_:number){
        super(linea_, columna_)
    }

    public traducir(env_:ambiente_c3d, generador_:generador, errores_:Array<nodoError>){
        try{
            generador_.add_call(this.id_);

            this.instrucciones_.traducir(env_, generador_, errores_);

            generador_.add_end_void();
        }catch(error){
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, `Error en función ${this.id_}`));
        }        
    }
}