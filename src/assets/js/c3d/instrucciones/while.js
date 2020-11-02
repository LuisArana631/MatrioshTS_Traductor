import { instruccion_c3d } from '../abstract/instruccion';
import { nodoError } from '../../error/error';
import { tipos_dato } from '../tools/tipo';
export class while_c3d extends instruccion_c3d {
    constructor(condicion_, instrucciones_, linea_, columna_) {
        super(linea_, columna_);
        this.condicion_ = condicion_;
        this.instrucciones_ = instrucciones_;
    }
    traducir(env_, generador_, errores_) {
        try {
            let temporal_loop = generador_.new_label();
            generador_.add_label(temporal_loop);
            const condicion = this.condicion_.traducir(env_, generador_, errores_);
            if (condicion.tipo_.tipo != tipos_dato.BOOLEAN) {
                errores_.push(new nodoError("Semántico", "La condición debe ser tipo booleano", this.linea_, this.columna_, "Condición"));
                return null;
            }
            else {
                generador_.add_label(condicion.true_lbl);
                this.instrucciones_.traducir(env_, generador_, errores_);
                generador_.add_goto(temporal_loop);
                generador_.add_label(condicion.false_lbl);
            }
        }
        catch (error) {
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, "Desconocido"));
            return;
        }
    }
}
