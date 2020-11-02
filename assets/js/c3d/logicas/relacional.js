import { nodoError } from '../../error/error';
import { expresion_c3d } from '../abstract/expresion';
import { retorno } from '../tools/retorno';
import { tipos_, tipos_dato } from '../tools/tipo';
import { tipo } from '../../abstract/valores';
export var oper_rel;
(function (oper_rel) {
    oper_rel[oper_rel["IGUAL"] = 0] = "IGUAL";
    oper_rel[oper_rel["NO_IGUAL"] = 1] = "NO_IGUAL";
    oper_rel[oper_rel["MENOR"] = 2] = "MENOR";
    oper_rel[oper_rel["MAYOR"] = 3] = "MAYOR";
    oper_rel[oper_rel["MENOR_IGUAL"] = 4] = "MENOR_IGUAL";
    oper_rel[oper_rel["MAYOR_IGUAL"] = 5] = "MAYOR_IGUAL";
})(oper_rel || (oper_rel = {}));
export class relacionales extends expresion_c3d {
    constructor(left_, righ_, tipo_, linea_, columna_) {
        super(linea_, columna_);
        this.left_ = left_;
        this.righ_ = righ_;
        this.tipo_ = tipo_;
    }
    traducir(env_, generador_, errores_) {
        try {
            const left_oper = this.left_.traducir(env_, generador_, errores_);
            const right_oper = this.righ_.traducir(env_, generador_, errores_);
            let retorno_ = new retorno('', false, new tipos_(2));
            this.true_lbl = this.true_lbl == '' ? generador_.new_label() : this.true_lbl;
            this.false_lbl = this.false_lbl == '' ? generador_.new_label() : this.false_lbl;
            retorno_.true_lbl = this.true_lbl;
            retorno_.false_lbl = this.false_lbl;
            let tipo_guia = this.determinar_tipo(left_oper.tipo_.tipo, right_oper.tipo_.tipo);
            if (this.tipo_ == oper_rel.IGUAL) {
                if (tipo_guia == tipo.BOOLEAN || tipo_guia == tipo.NUMBER) {
                    generador_.add_if(left_oper.get_valor(), right_oper.get_valor(), '==', this.true_lbl);
                    generador_.add_goto(this.false_lbl);
                }
                else if (tipo_guia == tipo.STRING) {
                    if (left_oper.tipo_.tipo != tipos_dato.STRING || right_oper.tipo_.tipo != tipos_dato.STRING) {
                        errores_.push(new nodoError("Semántico", "Solo se puede validar string == string", this.linea_, this.columna_, "String"));
                        return;
                    }
                    else {
                        let temp_return = generador_.new_temporal();
                        generador_.next_stack(env_.size);
                        generador_.add_call("compare_str");
                        generador_.add_get_stack(temp_return, "p");
                        generador_.prev_stack(env_.size);
                        generador_.add_if(temp_return, "0", "==", this.true_lbl);
                        generador_.add_goto(this.false_lbl);
                    }
                }
                else {
                    errores_.push(new nodoError("Semántico", "Solo se permite tipos de dato booleanom number y string en ==", this.linea_, this.columna_, "Tipo dato"));
                    return;
                }
                return retorno_;
            }
            else if (this.tipo_ == oper_rel.MAYOR) {
                if (tipo_guia == tipo.BOOLEAN || tipo_guia == tipo.NUMBER) {
                    generador_.add_if(left_oper.get_valor(), right_oper.get_valor(), '>', this.true_lbl);
                    generador_.add_goto(this.false_lbl);
                }
                else {
                    errores_.push(new nodoError("Semántico", "Solo se permite tipos de dato booleano y number en >", this.linea_, this.columna_, "Tipo dato"));
                    return;
                }
                return retorno_;
            }
            else if (this.tipo_ == oper_rel.MAYOR_IGUAL) {
                if (tipo_guia == tipo.BOOLEAN || tipo_guia == tipo.NUMBER) {
                    generador_.add_if(left_oper.get_valor(), right_oper.get_valor(), '>=', this.true_lbl);
                    generador_.add_goto(this.false_lbl);
                }
                else {
                    errores_.push(new nodoError("Semántico", "Solo se permite tipos de dato booleano y number en >=", this.linea_, this.columna_, "Tipo dato"));
                    return;
                }
                return retorno_;
            }
            else if (this.tipo_ == oper_rel.MENOR) {
                if (tipo_guia == tipo.BOOLEAN || tipo_guia == tipo.NUMBER) {
                    generador_.add_if(left_oper.get_valor(), right_oper.get_valor(), '<', this.true_lbl);
                    generador_.add_goto(this.false_lbl);
                }
                else {
                    errores_.push(new nodoError("Semántico", "Solo se permite tipos de dato booleano y number en <", this.linea_, this.columna_, "Tipo dato"));
                    return;
                }
                return retorno_;
            }
            else if (this.tipo_ == oper_rel.MENOR_IGUAL) {
                if (tipo_guia == tipo.BOOLEAN || tipo_guia == tipo.NUMBER) {
                    generador_.add_if(left_oper.get_valor(), right_oper.get_valor(), '<=', this.true_lbl);
                    generador_.add_goto(this.false_lbl);
                }
                else {
                    errores_.push(new nodoError("Semántico", "Solo se permite tipos de dato booleano y number en <", this.linea_, this.columna_, "Tipo dato"));
                    return;
                }
                return retorno_;
            }
            else if (this.tipo_ == oper_rel.NO_IGUAL) {
                if (tipo_guia == tipo.BOOLEAN || tipo_guia == tipo.NUMBER) {
                    generador_.add_if(left_oper.get_valor(), right_oper.get_valor(), '!=', this.true_lbl);
                    generador_.add_goto(this.false_lbl);
                }
                else if (tipo_guia == tipo.STRING) {
                    if (left_oper.tipo_.tipo != tipos_dato.STRING || right_oper.tipo_.tipo != tipos_dato.STRING) {
                        errores_.push(new nodoError("Semántico", "Solo se puede validar string == string", this.linea_, this.columna_, "String"));
                        return;
                    }
                    else {
                        let temp_return = generador_.new_temporal();
                        generador_.next_stack(env_.size + generador_.get_temporales().size);
                        generador_.add_call("compare_str");
                        generador_.add_get_stack(temp_return, "p");
                        generador_.prev_stack(env_.size + generador_.get_temporales().size);
                        generador_.add_if(temp_return, "0", "!=", this.true_lbl);
                        generador_.add_goto(this.false_lbl);
                    }
                }
                else {
                    errores_.push(new nodoError("Semántico", "Solo se permite tipos de dato booleano, number y string en !=", this.linea_, this.columna_, "Tipo dato"));
                    return;
                }
                return retorno_;
            }
            else {
                errores_.push(new nodoError("Semántico", "Operación relacional desconocida", this.linea_, this.columna_, "Desconocido"));
                return;
            }
        }
        catch (error) {
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, "Desconocido"));
            return;
        }
    }
}
