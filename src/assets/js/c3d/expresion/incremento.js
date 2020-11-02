import { expresion_c3d } from '../abstract/expresion';
import { retorno } from '../tools/retorno';
import { tipos_, tipos_dato } from '../tools/tipo';
import { nodoError } from '../../error/error';
export class incremento extends expresion_c3d {
    constructor(right_, linea_, columna_) {
        super(linea_, columna_);
        this.right_oper = right_;
    }
    traducir(env_, generador_, errores_) {
        try {
            const right_ = this.right_oper.traducir(env_, generador_, errores_);
            const temp_ = generador_.new_temporal();
            if (right_.get_valor().charAt(0) == "t") {
                generador_.free_temp(right_.get_valor());
            }
            switch (right_.tipo_.tipo) {
                case tipos_dato.NUMBER:
                    generador_.add_expresion(temp_, 1, +right_.get_valor(), '+');
                    return new retorno(temp_, true, new tipos_(tipos_dato.NUMBER));
                default:
                    errores_.push(new nodoError("Semántico", `No se puede incrementar ${right_.tipo_.tipo}`, this.linea_, this.columna_, "Incremento"));
                    break;
            }
        }
        catch (error) {
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, "Desconocido"));
            return;
        }
    }
}
