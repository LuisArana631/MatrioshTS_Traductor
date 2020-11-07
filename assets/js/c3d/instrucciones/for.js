import { instruccion_c3d } from '../abstract/instruccion';
import { expresion_c3d } from '../abstract/expresion';
import { nodoError } from '../../error/error';
import { acceso_ } from './variables/acceder';
import { tipos_dato } from '../tools/tipo';
export class for_c3d extends instruccion_c3d {
    constructor(condicion_, operacion_control, id_oper, instrucciones_, id_, linea_, columna_) {
        super(linea_, columna_);
        this.condicion_ = condicion_;
        this.operacion_control = operacion_control;
        this.id_oper = id_oper;
        this.instrucciones_ = instrucciones_;
        this.id_ = id_;
    }
    traducir(env_, generador_, errores_) {
        try {
            /* MANEJAR VARIABLE DE INICIO */
            let id_aux;
            if (this.id_oper != null) {
                id_aux = this.id_oper.traducir(env_, generador_, errores_);
            }
            else {
                let aux_acceso = new acceso_(this.id_, this.linea_, this.columna_);
                id_aux = aux_acceso.traducir(env_, generador_, errores_);
            }
            console.log(id_aux);
            if (id_aux instanceof expresion_c3d) {
                if (id_aux.get_valor().charAt(0) == "t") {
                    generador_.free_temp(id_aux.get_valor());
                }
            }
            /* LOOP DEL FOR */
            let loop_lbl = generador_.new_label();
            generador_.add_label(loop_lbl);
            const condi_ = this.condicion_.traducir(env_, generador_, errores_);
            if (condi_.get_valor().charAt(0) == "t") {
                generador_.free_temp(id_aux.get_valor());
            }
            if (condi_.tipo_.tipo != tipos_dato.BOOLEAN) {
                errores_.push(new nodoError("Semántico", "Se debe insertar una condición booleana", this.linea_, this.columna_, "Condición incorrecta"));
                return;
            }
            /* CODIGO DE CONDICION CORRECTA */
            generador_.add_label(condi_.true_lbl);
            this.instrucciones_.traducir(env_, generador_, errores_);
            let control = this.operacion_control.traducir(env_, generador_, errores_);
            if (control.get_valor().charAt(0) == "t") {
                generador_.free_temp(control.get_valor());
            }
            if (control.tipo_.tipo != tipos_dato.NUMBER) {
                errores_.push(new nodoError("Semántico", "Solo puedes controlar el for con valores numericos", this.linea_, this.columna_, "Error en condición"));
            }
            generador_.add_goto(loop_lbl);
            /* SALIDA DEL FOR */
            generador_.add_label(condi_.false_lbl);
        }
        catch (error) {
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, "Error en For"));
        }
    }
}
