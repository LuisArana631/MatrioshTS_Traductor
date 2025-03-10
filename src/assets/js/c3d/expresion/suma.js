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
            let aux_temporal_left_bool;
            let aux_temporal_right_bool;
            let aux_temporal_left_num;
            let aux_temporal_right_num;
            const left_ = this.left_oper.traducir(env_, generador_, errores_);
            /* SI ES BOOLEANO */
            if (left_.true_lbl != "" && left_.false_lbl != "") {
                if (left_.get_valor().charAt(0) == "t") {
                    generador_.free_temp(left_.get_valor());
                }
                if (left_.get_valor() == "1") {
                    aux_temporal_left_bool = generador_.new_temporal();
                    generador_.add_label(left_.true_lbl);
                }
                else if (left_.get_valor() == "0") {
                    aux_temporal_left_bool = generador_.new_temporal();
                    generador_.add_label(left_.false_lbl);
                }
            }
            /* SI ES NUMERO */
            if (left_.tipo_.tipo == tipos_dato.NUMBER) {
                if (left_.get_valor().charAt(0) == "t") {
                    generador_.free_temp(left_.get_valor());
                }
                aux_temporal_left_num = generador_.new_temporal();
                if (env_.prev_ == null) {
                    generador_.add_set_stack(left_.get_valor(), env_.size + generador_.get_temporales().size);
                }
                else {
                    let aux_index = generador_.new_temporal();
                    generador_.free_temp(aux_index);
                    generador_.add_expresion(aux_index, "p", generador_.get_temporales().size + env_.size, "+");
                    generador_.add_set_stack(left_.get_valor(), aux_index);
                }
            }
            const right_ = this.right_oper.traducir(env_, generador_, errores_);
            /* SI ES BOOLEANO */
            if (right_.true_lbl != "" && right_.false_lbl != "") {
                if (right_.get_valor().charAt(0) == "t") {
                    generador_.free_temp(right_.get_valor());
                }
                if (right_.get_valor() == "1") {
                    aux_temporal_right_bool = generador_.new_temporal();
                    generador_.add_label(right_.true_lbl);
                }
                else if (right_.get_valor() == "0") {
                    aux_temporal_right_bool = generador_.new_temporal();
                    generador_.add_label(right_.false_lbl);
                }
            }
            /* SI ES NUMERO */
            if (right_.tipo_.tipo == tipos_dato.NUMBER) {
                if (right_.get_valor().charAt(0) == "t") {
                    generador_.free_temp(right_.get_valor());
                }
                aux_temporal_right_num = generador_.new_temporal();
                if (env_.prev_ == null) {
                    generador_.add_set_stack(right_.get_valor(), env_.size + generador_.get_temporales().size);
                }
                else {
                    let aux_index = generador_.new_temporal();
                    generador_.free_temp(aux_index);
                    generador_.add_expresion(aux_index, "p", generador_.get_temporales().size + env_.size, "+");
                    generador_.add_set_stack(right_.get_valor(), aux_index);
                }
            }
            if (left_.get_valor().charAt(0) == "t") {
                generador_.free_temp(left_.get_valor());
            }
            if (right_.get_valor().charAt(0) == "t") {
                generador_.free_temp(right_.get_valor());
            }
            const temp_ = generador_.new_temporal();
            generador_.free_temp(aux_temporal_left_bool);
            generador_.free_temp(aux_temporal_left_num);
            generador_.free_temp(aux_temporal_right_bool);
            generador_.free_temp(aux_temporal_right_num);
            const tipo_guia = this.determinar_tipo(left_.tipo_.tipo, right_.tipo_.tipo);
            switch (tipo_guia) {
                case tipo.NUMBER:
                case tipo.BOOLEAN:
                    let print_left = left_.get_valor();
                    let print_right = right_.get_valor();
                    generador_.add_expresion(temp_, print_left, print_right, '+');
                    return new retorno(temp_, true, new tipos_(tipos_dato.NUMBER));
                case tipo.STRING:
                    if (left_.tipo_.tipo == tipos_dato.BOOLEAN) {
                        let temp_aux = generador_.new_temporal();
                        generador_.free_temp(temp_aux);
                        /* COLOCAR VALOR DEL BOOLEAN */
                        if (env_.prev_ == null) {
                            if (left_.get_valor() == "1") {
                                generador_.add_set_stack("1", env_.size + generador_.get_temporales().size);
                            }
                            else {
                                generador_.add_set_stack("0", env_.size + generador_.get_temporales().size);
                            }
                        }
                        else {
                            let aux_index = generador_.new_temporal();
                            generador_.free_temp(aux_index);
                            if (left_.get_valor() == "1") {
                                generador_.add_expresion(aux_index, "p", generador_.get_temporales().size + env_.size, "+");
                                generador_.add_set_stack("1", aux_index);
                            }
                            else {
                                generador_.add_expresion(aux_index, "p", generador_.get_temporales().size + env_.size, "+");
                                generador_.add_set_stack("0", aux_index);
                            }
                        }
                        /* PASAR BOOLEAN A STRING */
                        generador_.next_stack(env_.size + generador_.get_temporales().size - 1);
                        generador_.add_call("bool_toStr");
                        generador_.add_code(`${temp_aux} = p;`);
                        generador_.prev_stack(env_.size + generador_.get_temporales().size - 1);
                        generador_.add_get_stack(temp_, temp_aux); //OBTENEMOS EL VALOR DEL RETURN
                        generador_.add_expresion(temp_aux, temp_aux, "1", "+"); //NOS POSICIONAMOS EN LA POSICIÓN DONDE ESTABA EL VALOR BOOLEANO
                        generador_.add_set_stack(temp_, temp_aux); //ASIGNAMOS EL NUEVO VALOR RETORNADO
                        /* CONCATENAR STRINGS */
                        generador_.next_stack(env_.size + generador_.get_temporales().size - 1);
                        generador_.add_call("concat_str");
                        generador_.add_code(`${temp_aux} = p;`);
                        generador_.prev_stack(env_.size + generador_.get_temporales().size - 1);
                        generador_.add_get_stack(temp_, temp_aux);
                        generador_.add_expresion(temp_aux, temp_aux, "1", "+");
                        generador_.add_set_stack(temp_, temp_aux);
                    }
                    else if (right_.tipo_.tipo == tipos_dato.BOOLEAN) {
                        let temp_aux = generador_.new_temporal();
                        generador_.free_temp(temp_aux);
                        /* COLOCAR VALOR DEL BOOLEAN */
                        if (env_.prev_ == null) {
                            if (right_.get_valor() == "1") {
                                generador_.add_set_stack("1", env_.size + generador_.get_temporales().size + 1);
                            }
                            else {
                                generador_.add_set_stack("0", env_.size + generador_.get_temporales().size + 1);
                            }
                        }
                        else {
                            let aux_index = generador_.new_temporal();
                            generador_.free_temp(aux_index);
                            if (right_.get_valor() == "1") {
                                generador_.add_expresion(aux_index, "p", generador_.get_temporales().size + env_.size, "+");
                                generador_.add_set_stack("1", aux_index);
                            }
                            else {
                                generador_.add_expresion(aux_index, "p", generador_.get_temporales().size + env_.size, "+");
                                generador_.add_set_stack("0", aux_index);
                            }
                        }
                        /* PASAR BOOLEAN A STRING */
                        generador_.add_get_stack(temp_aux, env_.size + generador_.get_temporales().size + 1);
                        generador_.add_set_stack(temp_aux, env_.size + generador_.get_temporales().size + 2);
                        generador_.next_stack(env_.size + generador_.get_temporales().size + 1);
                        generador_.add_call("bool_toStr");
                        generador_.add_code(`${temp_aux} = p;`);
                        generador_.prev_stack(env_.size + generador_.get_temporales().size + 1);
                        /* CONCATENAR STRINGS */
                        generador_.next_stack(env_.size + generador_.get_temporales().size - 1);
                        generador_.add_call("concat_str");
                        generador_.add_code(`${temp_aux} = p;`);
                        generador_.prev_stack(env_.size + generador_.get_temporales().size - 1);
                        generador_.add_get_stack(temp_, temp_aux);
                        generador_.add_expresion(temp_aux, temp_aux, "1", "+");
                        generador_.add_set_stack(temp_, temp_aux);
                    }
                    else if (left_.tipo_.tipo == tipos_dato.NUMBER) {
                        let temp_aux = generador_.new_temporal();
                        generador_.free_temp(temp_aux);
                        /* PASAR NUMERO A STRING */
                        generador_.next_stack(env_.size + generador_.get_temporales().size - 1);
                        generador_.add_call("dec_toStr");
                        generador_.add_code(`${temp_aux} = p;`);
                        generador_.prev_stack(env_.size + generador_.get_temporales().size - 1);
                        generador_.add_get_stack(temp_, temp_aux); //OBTENEMOS EL VALOR DEL RETURN
                        generador_.add_expresion(temp_aux, temp_aux, "1", "+"); //NOS POSICIONAMOS EN LA POSICIÓN DONDE ESTABA EL VALOR BOOLEANO
                        generador_.add_set_stack(temp_, temp_aux); //ASIGNAMOS EL NUEVO VALOR RETORNADO
                        /* CONCATENAR STRINGS */
                        generador_.next_stack(env_.size + generador_.get_temporales().size - 1);
                        generador_.add_call("concat_str");
                        generador_.add_code(`${temp_aux} = p;`);
                        generador_.prev_stack(env_.size + generador_.get_temporales().size - 1);
                        generador_.add_get_stack(temp_, temp_aux);
                        generador_.add_expresion(temp_aux, temp_aux, "1", "+");
                        generador_.add_set_stack(temp_, temp_aux);
                    }
                    else if (right_.tipo_.tipo == tipos_dato.NUMBER) {
                        let temp_aux = generador_.new_temporal();
                        generador_.free_temp(temp_aux);
                        /* PASAR NUMERO A STRING */
                        if (env_.prev_ == null) {
                            generador_.add_get_stack(temp_aux, env_.size + generador_.get_temporales().size + 1);
                            generador_.add_set_stack(temp_aux, env_.size + generador_.get_temporales().size + 2);
                        }
                        else {
                            let aux_index = generador_.new_temporal();
                            generador_.free_temp(aux_index);
                            generador_.add_expresion(aux_index, "p", generador_.get_temporales().size + env_.size + 1, "+");
                            generador_.add_get_stack(temp_aux, aux_index);
                            generador_.add_expresion(aux_index, "p", generador_.get_temporales().size + env_.size + 2, "+");
                            generador_.add_set_stack(temp_aux, aux_index);
                        }
                        generador_.next_stack(env_.size + generador_.get_temporales().size + 1);
                        generador_.add_call("dec_toStr");
                        generador_.add_code(`${temp_aux} = p;`);
                        generador_.prev_stack(env_.size + generador_.get_temporales().size + 1);
                        generador_.add_get_stack(temp_, temp_aux); //OBTENEMOS EL VALOR DEL RETURN
                        generador_.add_expresion(temp_aux, temp_aux, "1", "+"); //NOS POSICIONAMOS EN LA POSICIÓN DONDE ESTABA EL VALOR BOOLEANO
                        generador_.add_set_stack(temp_, temp_aux); //ASIGNAMOS EL NUEVO VALOR RETORNADO
                        /* CONCATENAR STRINGS */
                        generador_.next_stack(env_.size + generador_.get_temporales().size - 1);
                        generador_.add_call("concat_str");
                        generador_.add_code(`${temp_aux} = p;`);
                        generador_.prev_stack(env_.size + generador_.get_temporales().size - 1);
                        generador_.add_get_stack(temp_, temp_aux);
                        generador_.add_expresion(temp_aux, temp_aux, "1", "+");
                        generador_.add_set_stack(temp_, temp_aux);
                    }
                    else {
                        let temp_aux = generador_.new_temporal();
                        generador_.free_temp(temp_aux);
                        generador_.next_stack(env_.size + generador_.get_temporales().size - 1);
                        generador_.add_call("concat_str");
                        generador_.add_code(`${temp_aux} = p;`);
                        generador_.prev_stack(env_.size + generador_.get_temporales().size - 1);
                        generador_.add_get_stack(temp_, temp_aux);
                        generador_.add_expresion(temp_aux, temp_aux, "1", "+");
                        generador_.add_set_stack(temp_, temp_aux);
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
