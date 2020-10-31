import { expresion_c3d } from '../abstract/expresion';
import { retorno } from '../tools/retorno';
import { nodoError } from '../../error/error';
import { tipos_, tipos_dato } from '../tools/tipo';
export var oper_logica;
(function (oper_logica) {
    oper_logica[oper_logica["OR"] = 0] = "OR";
    oper_logica[oper_logica["AND"] = 1] = "AND";
    oper_logica[oper_logica["NEGAR"] = 2] = "NEGAR";
})(oper_logica || (oper_logica = {}));
export class logicas_ extends expresion_c3d {
    constructor(izquierda, derecha, tipo_, linea_, columna_) {
        super(linea_, columna_);
        this.izquierda = izquierda;
        this.derecha = derecha;
        this.tipo_ = tipo_;
    }
    traducir(env_, generador_, errores_) {
        let left_oper = null;
        let right_oper = null;
        if (this.izquierda) {
            left_oper = this.izquierda.traducir(env_, generador_, errores_);
        }
        let tipo_guia = left_oper.tipo_.tipo;
        if (tipo_guia != tipos_dato.BOOLEAN) {
            errores_.push(new nodoError("Semántico", `Operación de tipo invalido.`, this.linea_, this.columna_, "Operacion incorrecta"));
            return;
        }
        let retorno_ = new retorno('', false, new tipos_(2));
        if (this.tipo_ == oper_logica.AND) {
            generador_.add_label(left_oper.true_lbl);
            if (this.derecha) {
                right_oper = this.derecha.traducir(env_, generador_, errores_);
            }
            retorno_.false_lbl = left_oper.false_lbl + ": " + right_oper.false_lbl;
            retorno_.true_lbl = right_oper.true_lbl;
            return retorno_;
        }
        else if (this.tipo_ == oper_logica.OR) {
            generador_.add_label(left_oper.false_lbl);
            if (this.derecha) {
                right_oper = this.derecha.traducir(env_, generador_, errores_);
            }
            retorno_.false_lbl = right_oper.false_lbl;
            retorno_.true_lbl = left_oper.true_lbl + ": " + right_oper.true_lbl;
            return retorno_;
        }
        else if (this.tipo_ == oper_logica.NEGAR) {
            retorno_.false_lbl = left_oper.true_lbl;
            retorno_.true_lbl = left_oper.false_lbl;
            return retorno_;
        }
        else {
            errores_.push(new nodoError("Semántico", `Operación lógica desconocida`, this.linea_, this.columna_, "Desconocido"));
            return;
        }
    }
}
