import { instruccion_c3d } from '../abstract/instruccion';
import { expresion_c3d } from '../abstract/expresion';
import { generador } from './generador';
import { nodoError } from '../../error/error';
import { ambiente_c3d } from '../tabla_simbolos/ambiente';

export class case_c3d extends instruccion_c3d{
    constructor(public condicion_:expresion_c3d, private instr_:instruccion_c3d, linea_:number, columna_:number){
        super(linea_, columna_);
    }

    public traducir(env_:ambiente_c3d, generador_:generador, errores_:Array<nodoError>){
        try{
            this.instr_.traducir(env_, generador_, errores_);
        }catch(error){
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, "Error en case"));
            return;
        }
    }
}