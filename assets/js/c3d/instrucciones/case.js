import { instruccion_c3d } from '../abstract/instruccion';
import { nodoError } from '../../error/error';
export class case_c3d extends instruccion_c3d {
    constructor(condicion_, instr_, linea_, columna_) {
        super(linea_, columna_);
        this.condicion_ = condicion_;
        this.instr_ = instr_;
    }
    traducir(env_, generador_, errores_) {
        try {
            this.instr_.traducir(env_, generador_, errores_);
        }
        catch (error) {
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, "Error en case"));
            return;
        }
    }
}
