import { instruccion_c3d } from '../abstract/instruccion';
import { expresion_c3d } from '../abstract/expresion';
import { ambiente_c3d } from '../tabla_simbolos/ambiente';
import { generador } from './generador';
import { nodoError } from '../../error/error';

export class for_c3d extends instruccion_c3d{
    constructor(private condicion_:expresion_c3d, private var_:expresion_c3d, private variable_:instruccion_c3d, private instruccion_:instruccion_c3d, private id_:string, linea_:number, columna_:number){
        super(linea_, columna_);
    }

    public traducir(env_:ambiente_c3d, generador_:generador, errores_:Array<nodoError>){
        try{
            let lbl_loop = generador_.new_label();
            
        }catch(error){
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, "Desconocido"));
        }
    }
}