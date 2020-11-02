import { expresion_c3d } from '../abstract/expresion';
import { ambiente_c3d } from '../tabla_simbolos/ambiente';
import { retorno } from '../tools/retorno';
import { generador } from '../instrucciones/generador';
import { tipos_, tipos_dato } from '../tools/tipo';
import { errores } from '../../error/errores';
import { nodoError } from '../../error/error';

export class incremento extends expresion_c3d{
    private right_oper: expresion_c3d;

    constructor(right_: expresion_c3d, linea_:number, columna_:number){
        super(linea_, columna_);
        this.right_oper = right_;
    }

    public traducir(env_: ambiente_c3d, generador_:generador, errores_:Array<nodoError>):retorno{
        try{
            const right_ = this.right_oper.traducir(env_, generador_, errores_);
            const temp_ = generador_.new_temporal();      
            
            if(right_.get_valor().charAt(0) == "t"){
                generador_.free_temp(right_.get_valor());
            }      

            switch(right_.tipo_.tipo){  
                case tipos_dato.NUMBER:
                    generador_.add_expresion(temp_, 1, +right_.get_valor(), '+');
                    return new retorno(temp_, true, new tipos_(tipos_dato.NUMBER));
                default:
                    errores_.push(new nodoError("Semántico", `No se puede incrementar ${right_.tipo_.tipo}`, this.linea_, this.columna_, "Incremento"));
                    break;
            }
        }catch(error){
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, "Desconocido"));
            return;
        }
    }
}