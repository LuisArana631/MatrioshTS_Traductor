import { nodoError } from '../../error/error';
import { instruccion_c3d } from '../abstract/instruccion';
import { ambiente_c3d } from '../tabla_simbolos/ambiente';
import { generador } from './generador';

export class break_c3d extends instruccion_c3d{
    constructor(linea_:number, columna_:number){
        super(linea_, columna_ );
    }

    public traducir(env_:ambiente_c3d, generador_:generador, errores_:Array<nodoError>){
        if(env_.break_ == null){
            errores_.push(new nodoError("Semántico", "Sentencia break en un ambito incorrecto", this.linea_, this.columna_, "Error de ámbito"));
        }else{
            generador_.add_goto(env_.break_);
        }
    }
}