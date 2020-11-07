import { expresion_c3d } from '../abstract/expresion';
import { nodoError } from '../../error/error';
import { retorno } from '../tools/retorno';
import { tipo } from '../../abstract/valores';
import { tipos_, tipos_dato } from '../tools/tipo';
export class potencia_ extends expresion_c3d {
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
            const tipo_guia = this.determinar_tipo(left_.tipo_.tipo, right_.tipo_.tipo);
            switch (tipo_guia) {
                case tipo.NUMBER:
                    if (env_.prev_ == null) {
                        generador_.add_set_stack(left_.get_valor(), env_.size + generador_.get_temporales().size);
                        generador_.add_set_stack(right_.get_valor(), env_.size + generador_.get_temporales().size + 1);
                    }
                    else {
                        let aux_index = generador_.new_temporal();
                        generador_.free_temp(aux_index);
                        generador_.add_expresion(aux_index, "p", generador_.get_temporales().size + env_.size, "+");
                        generador_.add_set_stack(left_.get_valor(), aux_index);
                        generador_.add_expresion(aux_index, "p", generador_.get_temporales().size + env_.size + 1, "+");
                        generador_.add_set_stack(right_.get_valor(), aux_index);
                    }
                    generador_.next_stack(env_.size + generador_.get_temporales().size - 1);
                    generador_.add_call("potencia_");
                    generador_.add_get_stack(temp_, "p");
                    generador_.next_stack(env_.size + generador_.get_temporales().size - 1);
                    return new retorno(temp_, true, new tipos_(tipos_dato.NUMBER));
                default:
                    errores_.push(new nodoError("Semántico", `No se puede realizar la potencia ${left_.tipo_.tipo}**${right_.tipo_.tipo}`, this.linea_, this.columna_, "Tipos de datos no compatibles."));
                    break;
            }
        }
        catch (error) {
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, "Error en potencia"));
        }
    }
}
