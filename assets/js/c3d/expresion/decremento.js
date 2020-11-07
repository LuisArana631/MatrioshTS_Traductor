import { expresion_c3d } from '../abstract/expresion';
import { retorno } from '../tools/retorno';
import { tipos_dato } from '../tools/tipo';
import { nodoError } from '../../error/error';
export class decremento extends expresion_c3d {
    constructor(right_, id_, linea_, columna_) {
        super(linea_, columna_);
        this.id_ = id_;
        this.right_oper = right_;
    }
    traducir(env_, generador_, errores_) {
        try {
            const right_ = this.right_oper.traducir(env_, generador_, errores_);
            if (right_.get_valor().charAt(0) == "t") {
                generador_.free_temp(right_.get_valor());
            }
            let var_ = env_.get_variable(this.id_);
            if (var_ == null) {
                errores_.push(new nodoError("Semántico", `No se encontro la variable ${this.id_}`, this.linea_, this.columna_, "No es número"));
                return;
            }
            if (var_.tipo_.tipo != tipos_dato.NUMBER) {
                errores_.push(new nodoError("Semántico", "Solo se puede decrementar variables numericas", this.linea_, this.columna_, "No es número"));
                return;
            }
            generador_.add_expresion(right_.get_valor(), right_.get_valor(), "1", "-");
            generador_.add_set_stack(right_.get_valor(), var_.pos);
            return new retorno("", false, right_.tipo_, right_.simbolo_);
        }
        catch (error) {
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, "Desconocido"));
            return;
        }
    }
}
