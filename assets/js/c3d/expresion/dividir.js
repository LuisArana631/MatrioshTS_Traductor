import { expresion_c3d } from '../abstract/expresion';
import { retorno } from '../tools/retorno';
import { tipos_, tipos_dato } from '../tools/tipo';
import { tipo } from '../../abstract/valores';
import { nodoError } from '../../error/error';
export class dividir extends expresion_c3d {
    constructor(left_, right_, linea_, columna_) {
        super(linea_, columna_);
        this.left_oper = left_;
        this.right_oper = right_;
    }
    traducir(env_, generador_, errores_) {
        try {
            const left_ = this.left_oper.traducir(env_, generador_, errores_);
            const right_ = this.right_oper.traducir(env_, generador_, errores_);
            const temp_ = generador_.new_temporal();
            if (left_.get_valor().charAt(0) == "t") {
                generador_.free_temp(left_.get_valor());
            }
            if (right_.get_valor().charAt(0) == "t") {
                generador_.free_temp(right_.get_valor());
            }
            const tipo_guia = this.determinar_tipo(left_.tipo_.tipo, right_.tipo_.tipo);
            switch (tipo_guia) {
                case tipo.NUMBER:
                    if (+right_.get_valor() == 0) {
                        errores_.push(new nodoError("Semántico", "No se puede dividir en 0", this.linea_, this.columna_, "Dividir"));
                        break;
                    }
                    generador_.add_expresion(temp_, left_.get_valor(), right_.get_valor(), '/');
                    return new retorno(temp_, true, new tipos_(tipos_dato.NUMBER));
                default:
                    errores_.push(new nodoError("Semántico", `No se puede dividir ${left_.tipo_.tipo} / ${right_.tipo_.tipo}`, this.linea_, this.columna_, "División"));
                    break;
            }
        }
        catch (error) {
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, "Desconocido"));
            return;
        }
    }
}
