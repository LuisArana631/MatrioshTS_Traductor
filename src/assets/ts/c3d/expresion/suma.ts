import { expresion_c3d } from '../abstract/expresion';
import { ambiente_c3d } from '../tabla_simbolos/ambiente';
import { retorno } from '../tools/retorno';
import { generador } from '../instrucciones/generador';
import { tipos_dato } from '../tools/tipo';
import { tipo } from '../../abstract/valores';
import { nodoError } from '../../error/error';

export class suma extends expresion_c3d{
    private left_oper: expresion_c3d;
    private right_oper: expresion_c3d;

    constructor(left_: expresion_c3d, right_: expresion_c3d, linea_:number, columna_:number){
        super(linea_, columna_);
        this.left_oper = left_;
        this.right_oper = right_;
    }

    public traducir(env_: ambiente_c3d, generador_:generador, errores_:Array<nodoError>):retorno{
        const left_ = this.left_oper.traducir(env_, generador_, errores_);
        const right_ = this.right_oper.traducir(env_, generador_, errores_);

        const temp_ = generador_.new_temporal();
        const tipo_guia = this.determinar_tipo(left_.tipo_.tipo, right_.tipo_.tipo)
        
        switch(tipo_guia){
            case tipo.NUMBER:
            case tipo.BOOLEAN:
                let print_left = left_.get_valor();
                let print_right = right_.get_valor();
                generador_.add_expresion(temp_, print_left, print_right, '+');
                return new retorno(temp_, true, right_.tipo_.tipo == tipos_dato.NUMBER ? right_.tipo_ : left_.tipo_);
            case tipo.STRING:
                const temp_aux =  generador_.new_temporal();
                generador_.free_temp(temp_aux);
                generador_.add_expresion(temp_aux,'p', env_.size + 1, '+');
                generador_.add_set_stack(temp_aux, left_.get_valor());
                generador_.add_expresion(temp_aux, temp_aux, '1', '+'   );
                generador_.add_set_stack(temp_aux, right_.get_valor());
                generador_.next_stack(env_.size);
                return new retorno(temp_, true, right_.tipo_.tipo == tipos_dato.STRING ? right_.tipo_ : left_.tipo_);
            default:
                errores_.push(new nodoError("Semántico", `No se puede sumar ${left_.tipo_.tipo} + ${right_.tipo_.tipo}`, this.linea_, this.columna_, "Suma"));
                break;
        }

    }
}