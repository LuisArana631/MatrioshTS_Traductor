import { expresion_c3d } from '../abstract/expresion';
import { tipos_dato, tipos_ } from '../tools/tipo';
import { retorno } from '../tools/retorno';
import { nodoError } from '../../error/error';
export class primitivo_ extends expresion_c3d {
    constructor(tipo_, valor_, linea_, columna_) {
        super(linea_, columna_);
        this.tipo_ = tipo_;
        this.valor_ = valor_;
    }
    traducir(env_, generador_, errores_) {
        try {
            switch (this.tipo_) {
                case tipos_dato.NUMBER:
                    return new retorno(this.valor_, false, new tipos_(this.tipo_));
                case tipos_dato.BOOLEAN:
                    let retorno_ = new retorno(this.valor_ ? '1' : '0', false, new tipos_(this.tipo_));
                    this.true_lbl = this.true_lbl == '' ? generador_.new_label() : this.true_lbl;
                    this.false_lbl = this.false_lbl == '' ? generador_.new_label() : this.false_lbl;
                    generador_.add_goto(this.valor_ ? this.true_lbl : this.false_lbl);
                    retorno_.true_lbl = this.true_lbl;
                    retorno_.false_lbl = this.false_lbl;
                    return retorno_;
                case tipos_dato.NULL:
                    return new retorno('-1', false, new tipos_(this.tipo_));
                default:
                    errores_.push(new nodoError("Semántico", "Tipo de dato no reconocido", this.linea_, this.columna_, "Desconocido"));
                    break;
            }
        }
        catch (error) {
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, "Desconocido"));
            return;
        }
    }
}
