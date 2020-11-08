import { nodoError } from '../../error/error';
import { instruccion_c3d } from '../abstract/instruccion';
export class function_c3d extends instruccion_c3d {
    constructor(id_, instrucciones_, parametros, linea_, columna_) {
        super(linea_, columna_);
        this.id_ = id_;
        this.instrucciones_ = instrucciones_;
        this.parametros = parametros;
    }
    traducir(env_, generador_, errores_) {
        try {
            let fin_ = generador_.new_label();
            generador_.add_void(this.id_);
            this.instrucciones_.traducir(env_, generador_, errores_);
            generador_.add_label(fin_);
            generador_.add_end_void();
        }
        catch (error) {
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, `Error en función ${this.id_}`));
        }
    }
}
