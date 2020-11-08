import { nodoError } from '../../error/error';
import { instruccion_c3d } from '../abstract/instruccion';
export class continue_c3d extends instruccion_c3d {
    constructor(linea_, columna_) {
        super(linea_, columna_);
    }
    traducir(env_, generador_, errores_) {
        try {
            if (env_.continue_ == null) {
                errores_.push(new nodoError("Semántico", "Sentencia break en un ambito incorrecto", this.linea_, this.columna_, "Error de ámbito"));
            }
            else {
                generador_.add_goto(env_.continue_);
            }
        }
        catch (error) {
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, "Error en continue"));
        }
    }
}
