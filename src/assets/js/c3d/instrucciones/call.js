import { nodoError } from '../../error/error';
import { instruccion_c3d } from '../abstract/instruccion';
export class call_c3d extends instruccion_c3d {
    constructor(id_, parametros, linea_, columna_) {
        super(linea_, columna_);
        this.id_ = id_;
        this.parametros = parametros;
    }
    traducir(env_, generador_, errores_) {
        try {
            generador_.next_stack(env_.size + generador_.get_temporales().size);
            generador_.add_call(this.id_);
            generador_.prev_stack(env_.size + generador_.get_temporales().size);
        }
        catch (error) {
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, "Error en llamada de función"));
        }
    }
}
