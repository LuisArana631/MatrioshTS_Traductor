import { instruccion_c3d } from '../abstract/instruccion';
import { expresion_c3d } from '../abstract/expresion';
import { ambiente_c3d } from '../tabla_simbolos/ambiente';
import { generador } from './generador';
import { nodoError } from '../../error/error';
import { retorno } from '../tools/retorno';

export class return_c3d extends instruccion_c3d{
    constructor(private expresion_:expresion_c3d, linea_:number, columna_:number){
        super(linea_, columna_);
    }

    public traducir(env_:ambiente_c3d, generador_:generador, errores_:Array<nodoError>){
        try{
            if(env_.return_ == null){
                errores_.push(new nodoError("Semántico", "Sentencia return en un ambito incorrecto", this.linea_, this.columna_, "Error de ámbito"));
            }else{
                let return_val:retorno;
                if(this.expresion_ != null){
                    return_val = this.expresion_.traducir(env_, generador_, errores_);
                    generador_.add_set_stack(return_val.get_valor(), "p");
                }                
                generador_.add_goto(env_.return_);

                return return_val;
            }
        }catch(error){
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, "Error en return"));
        } 
    }
}