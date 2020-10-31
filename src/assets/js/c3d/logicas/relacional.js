import { nodoError } from '../../error/error';
import { expresion_c3d } from '../abstract/expresion';
import { retorno } from '../tools/retorno';
import { tipos_ } from '../tools/tipo';
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
        const left_oper = this.left_.traducir(env_, generador_, errores_);
        const right_oper = this.righ_.traducir(env_, generador_, errores_);
        let retorno_ = new retorno('', false, new tipos_(2));
        this.true_lbl = this.true_lbl == '' ? generador_.new_label() : this.true_lbl;
        this.false_lbl = this.false_lbl == '' ? generador_.new_label() : this.false_lbl;
        retorno_.true_lbl = this.true_lbl;
        retorno_.false_lbl = this.false_lbl;
        if (this.tipo_ == oper_rel.IGUAL) {
            generador_.add_if(left_oper.get_valor(), right_oper.get_valor(), '==', this.true_lbl);
            generador_.add_goto(this.false_lbl);
            return retorno_;
        }
        else if (this.tipo_ == oper_rel.MAYOR) {
            generador_.add_if(left_oper.get_valor(), right_oper.get_valor(), '>', this.true_lbl);
            generador_.add_goto(this.false_lbl);
            return retorno_;
        }
        else if (this.tipo_ == oper_rel.MAYOR_IGUAL) {
            generador_.add_if(left_oper.get_valor(), right_oper.get_valor(), '>=', this.true_lbl);
            generador_.add_goto(this.false_lbl);
            return retorno_;
        }
        else if (this.tipo_ == oper_rel.MENOR) {
            generador_.add_if(left_oper.get_valor(), right_oper.get_valor(), '<', this.true_lbl);
            generador_.add_goto(this.false_lbl);
            return retorno_;
        }
        else if (this.tipo_ == oper_rel.MENOR_IGUAL) {
            generador_.add_if(left_oper.get_valor(), right_oper.get_valor(), '<=', this.true_lbl);
            generador_.add_goto(this.false_lbl);
            return retorno_;
        }
        else if (this.tipo_ == oper_rel.NO_IGUAL) {
            generador_.add_if(left_oper.get_valor(), right_oper.get_valor(), '!=', this.true_lbl);
            generador_.add_goto(this.false_lbl);
            return retorno_;
        }
        else {
            errores_.push(new nodoError("Semántico", "Operación relacional desconocida", this.linea_, this.columna_, "Desconocido"));
            return;
        }
    }
}
