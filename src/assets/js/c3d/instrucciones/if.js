import { instruccion_c3d } from '../abstract/instruccion';
import { nodoError } from '../../error/error';
import { tipos_dato } from '../tools/tipo';
export class if_c3d extends instruccion_c3d {
    constructor(condicion, instrucciones, elst, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
        this.elst = elst;
    }
    traducir(env_, generador_, errores_) {
        try {
            const condicion = this.condicion.traducir(env_, generador_, errores_);
            if (condicion.get_valor().charAt(0) == "t") {
                generador_.free_temp(condicion.get_valor());
            }
            if (condicion.tipo_.tipo != tipos_dato.BOOLEAN) {
                errores_.push(new nodoError("Semántico", "La condición debe ser tipo booleano", this.linea_, this.columna_, "Condición"));
                return null;
            }
            else {
                let exit_lbl;
                if (condicion.temp_) {
                    generador_.add_if(condicion.get_valor(), "1", "==", condicion.true_lbl);
                    generador_.add_goto(condicion.false_lbl);
                }
                generador_.add_label(condicion.true_lbl);
                this.instrucciones.traducir(env_, generador_, errores_);
                if (this.elst) {
                    exit_lbl = generador_.new_label();
                    generador_.add_goto(exit_lbl);
                }
                generador_.add_label(condicion.false_lbl);
                if (this.elst) {
                    this.elst.traducir(env_, generador_, errores_);
                    generador_.add_label(exit_lbl);
                }
            }
        }
        catch (error) {
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, "Desconocido"));
            return;
        }
    }
}
