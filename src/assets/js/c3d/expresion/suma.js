import { expresion_c3d } from '../abstract/expresion';
import { retorno } from '../tools/retorno';
import { tipos_dato } from '../tools/tipo';
import { tipo } from '../../abstract/valores';
import { nodoError } from '../../error/error';
export class suma extends expresion_c3d {
    constructor(left_, right_, linea_, columna_) {
        super(linea_, columna_);
        this.left_oper = left_;
        this.right_oper = right_;
    }
    traducir(env_, generador_, errores_) {
        const left_ = this.left_oper.traducir(env_, generador_, errores_);
        const right_ = this.right_oper.traducir(env_, generador_, errores_);
        const temp_ = generador_.new_temporal();
        const tipo_guia = this.determinar_tipo(left_.tipo_.tipo, right_.tipo_.tipo);
        console.log("vamos a traducir perro");
        console.log("tipo: ", tipo_guia);
        switch (tipo_guia) {
            case tipo.NUMBER:
            case tipo.BOOLEAN:
                let print_left = left_.get_valor();
                let print_right = right_.get_valor();
                generador_.add_expresion(temp_, print_left, print_right, '+');
                return new retorno(temp_, true, right_.tipo_.tipo == tipos_dato.NUMBER ? right_.tipo_ : left_.tipo_);
            case tipo.STRING:
                console.log("a ver que pes");
                const temp_aux = generador_.new_temporal();
                generador_.free_temp(temp_aux);
                generador_.add_expresion(temp_aux, 'p', env_.size + 1, '+');
                generador_.add_set_stack(temp_aux, left_.get_valor());
                generador_.add_expresion(temp_aux, temp_aux, '1', '+');
                generador_.add_set_stack(temp_aux, right_.get_valor());
                generador_.next_stack(env_.size);
                return new retorno(temp_, true, right_.tipo_.tipo == tipos_dato.STRING ? right_.tipo_ : left_.tipo_);
            default:
                console.log("como que un error que verga");
                errores_.push(new nodoError("Semántico", `No se puede sumar ${left_.tipo_.tipo} + ${right_.tipo_.tipo}`, this.linea_, this.columna_, "Suma"));
                break;
        }
    }
}
