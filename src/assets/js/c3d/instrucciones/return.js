import { instruccion_c3d } from '../abstract/instruccion';
import { nodoError } from '../../error/error';
export class return_c3d extends instruccion_c3d {
    constructor(expresion_, linea_, columna_) {
        super(linea_, columna_);
        this.expresion_ = expresion_;
    }
    traducir(env_, generador_, errores_) {
        try {
            if (env_.return_ == null) {
                errores_.push(new nodoError("Semántico", "Sentencia return en un ambito incorrecto", this.linea_, this.columna_, "Error de ámbito"));
            }
            else {
                let return_val;
                if (this.expresion_ != null) {
                    return_val = this.expresion_.traducir(env_, generador_, errores_);
                    generador_.add_set_stack(return_val.get_valor(), "p");
                }
                generador_.add_goto(env_.return_);
                return return_val;
            }
        }
        catch (error) {
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, "Error en return"));
        }
    }
}
