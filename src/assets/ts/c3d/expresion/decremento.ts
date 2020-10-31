import { expresion_c3d } from '../abstract/expresion';
import { ambiente_c3d } from '../tabla_simbolos/ambiente';
import { retorno } from '../tools/retorno';
import { generador } from '../instrucciones/generador';
import { tipos_dato } from '../tools/tipo';
import { nodoError } from '../../error/error';

export class incremento extends expresion_c3d{
    private right_oper: expresion_c3d;

    constructor(right_: expresion_c3d, linea_:number, columna_:number){
        super(linea_, columna_);
        this.right_oper = right_;
    }

    public traducir(env_: ambiente_c3d, generador_:generador, errores_:Array<nodoError>):retorno{
        const right_ = this.right_oper.traducir(env_, generador_, errores_);
        const temp_ = generador_.new_temporal();
        
        switch(right_.tipo_.tipo){  
            case tipos_dato.NUMBER:
            case tipos_dato.BOOLEAN:
                generador_.add_expresion(temp_, 1, +right_.get_valor(), '-');
                return new retorno(temp_, true, right_.tipo_ );
            default:
                errores_.push(new nodoError("Semántico", `No se puede decrementar ${right_.tipo_.tipo}`, this.linea_, this.columna_, "Decrementar"));
                break;
        }

    }
}