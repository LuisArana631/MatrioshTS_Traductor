import { expresion_c3d } from '../abstract/expresion';
import { retorno } from '../tools/retorno';
import { tipos_, tipos_dato } from '../tools/tipo';
import { tipo } from '../../abstract/valores';
import { nodoError } from '../../error/error';
export class suma extends expresion_c3d {
    constructor(left_, right_, linea_, columna_) {
        super(linea_, columna_);
        this.left_oper = left_;
        this.right_oper = right_;
    }
    traducir(env_, generador_, errores_) {
        try {
            const left_ = this.left_oper.traducir(env_, generador_, errores_);
            const right_ = this.right_oper.traducir(env_, generador_, errores_);
            if (left_.get_valor().charAt(0) == "t") {
                generador_.free_temp(left_.get_valor());
            }
            if (right_.get_valor().charAt(0) == "t") {
                generador_.free_temp(right_.get_valor());
            }
            const temp_ = generador_.new_temporal();
            generador_.free_temp(temp_);
            const tipo_guia = this.determinar_tipo(left_.tipo_.tipo, right_.tipo_.tipo);
            switch (tipo_guia) {
                case tipo.NUMBER:
                case tipo.BOOLEAN:
                    let print_left = left_.get_valor();
                    let print_right = right_.get_valor();
                    if (left_.true_lbl) {
                        generador_.add_label(left_.true_lbl);
                    }
                    else if (left_.false_lbl) {
                        generador_.add_label(left_.false_lbl);
                    }
                    else if (right_.true_lbl) {
                        generador_.add_label(right_.true_lbl);
                    }
                    else if (left_.false_lbl) {
                        generador_.add_label(right_.false_lbl);
                    }
                    generador_.add_expresion(temp_, print_left, print_right, '+');
                    return new retorno(temp_, true, new tipos_(tipos_dato.NUMBER));
                case tipo.STRING:
                    if (left_.tipo_.tipo == tipos_dato.BOOLEAN) {
                        let temp_aux = generador_.new_temporal();
                        let temp_aux2 = generador_.new_temporal();
                        generador_.free_temp(temp_aux);
                        generador_.free_temp(temp_aux2);
                        /* COLOCAR VALOR DEL BOOLEAN */
                        if (left_.get_valor() == "1") {
                            generador_.add_label(left_.true_lbl);
                        }
                        else {
                            generador_.add_label(left_.false_lbl);
                        }
                        /* PASAR BOOLEAN A STRING */
                        /* CONCATENAR STRINGS */
                        generador_.next_stack(env_.size + generador_.get_temporales().size);
                        generador_.add_call("concat_str");
                        generador_.add_code(`${temp_aux} = p;`);
                        generador_.prev_stack(env_.size + generador_.get_temporales().size);
                        generador_.add_get_stack(temp_aux2, temp_aux);
                        generador_.add_expresion(temp_aux, temp_aux, "1", "+");
                        generador_.add_set_stack(temp_aux2, temp_aux);
                    }
                    else if (right_.tipo_.tipo == tipos_dato.BOOLEAN) {
                        let temp_aux = generador_.new_temporal();
                        let temp_aux2 = generador_.new_temporal();
                        generador_.free_temp(temp_aux);
                        generador_.free_temp(temp_aux2);
                        /* PASAR BOOLEAN A STRING */
                        /* CONCATENAR STRINGS */
                        generador_.next_stack(env_.size + generador_.get_temporales().size);
                        generador_.add_call("concat_str");
                        generador_.add_code(`${temp_aux} = p;`);
                        generador_.prev_stack(env_.size + generador_.get_temporales().size);
                        generador_.add_get_stack(temp_aux2, temp_aux);
                        generador_.add_expresion(temp_aux, temp_aux, "1", "+");
                        generador_.add_set_stack(temp_aux2, temp_aux);
                    }
                    else if (left_.tipo_.tipo == tipos_dato.NUMBER) {
                        let temp_aux = generador_.new_temporal();
                        let temp_aux2 = generador_.new_temporal();
                        generador_.free_temp(temp_aux);
                        generador_.free_temp(temp_aux2);
                        /* PASAR NUMERO A STRING */
                        /* CONCATENAR STRINGS */
                        generador_.next_stack(env_.size + generador_.get_temporales().size);
                        generador_.add_call("concat_str");
                        generador_.add_code(`${temp_aux} = p;`);
                        generador_.prev_stack(env_.size + generador_.get_temporales().size);
                        generador_.add_get_stack(temp_aux2, temp_aux);
                        generador_.add_expresion(temp_aux, temp_aux, "1", "+");
                        generador_.add_set_stack(temp_aux2, temp_aux);
                    }
                    else if (right_.tipo_.tipo == tipos_dato.NUMBER) {
                        let temp_aux = generador_.new_temporal();
                        let temp_aux2 = generador_.new_temporal();
                        generador_.free_temp(temp_aux);
                        generador_.free_temp(temp_aux2);
                        /* PASAR NUMERO A STRING */
                        /* CONCATENAR STRINGS */
                        generador_.next_stack(env_.size + generador_.get_temporales().size);
                        generador_.add_call("concat_str");
                        generador_.add_code(`${temp_aux} = p;`);
                        generador_.prev_stack(env_.size + generador_.get_temporales().size);
                        generador_.add_get_stack(temp_aux2, temp_aux);
                        generador_.add_expresion(temp_aux, temp_aux, "1", "+");
                        generador_.add_set_stack(temp_aux2, temp_aux);
                    }
                    else {
                        let temp_aux = generador_.new_temporal();
                        let temp_aux2 = generador_.new_temporal();
                        generador_.free_temp(temp_aux);
                        generador_.free_temp(temp_aux2);
                        generador_.next_stack(env_.size + generador_.get_temporales().size);
                        generador_.add_call("concat_str");
                        generador_.add_code(`${temp_aux} = p;`);
                        generador_.prev_stack(env_.size + generador_.get_temporales().size);
                        generador_.add_get_stack(temp_aux2, temp_aux);
                        generador_.add_expresion(temp_aux, temp_aux, "1", "+");
                        generador_.add_set_stack(temp_aux2, temp_aux);
                    }
                    return new retorno(temp_, true, new tipos_(tipos_dato.STRING));
                default:
                    errores_.push(new nodoError("Semántico", `No se puede sumar ${left_.tipo_.tipo} + ${right_.tipo_.tipo}`, this.linea_, this.columna_, "Suma"));
                    break;
            }
        }
        catch (error) {
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, "Desconocido"));
            return;
        }
    }
}
