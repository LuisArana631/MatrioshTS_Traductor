import { instruccion_c3d } from '../abstract/instruccion';
import { nodoError } from '../../error/error';
export class for_c3d extends instruccion_c3d {
    constructor(condicion_, var_, variable_, instruccion_, id_, linea_, columna_) {
        super(linea_, columna_);
        this.condicion_ = condicion_;
        this.var_ = var_;
        this.variable_ = variable_;
        this.instruccion_ = instruccion_;
        this.id_ = id_;
    }
    traducir(env_, generador_, errores_) {
        try {
            let lbl_loop = generador_.new_label();
        }
        catch (error) {
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, "Desconocido"));
        }
    }
}
