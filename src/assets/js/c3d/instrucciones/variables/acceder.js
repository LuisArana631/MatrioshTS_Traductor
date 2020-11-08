import { expresion_c3d } from '../../abstract/expresion';
import { nodoError } from 'src/assets/ts/error/error';
import { retorno } from '../../tools/retorno';
import { tipos_dato } from '../../tools/tipo';
export class acceso_ extends expresion_c3d {
    constructor(id_, linea_, columna_) {
        super(linea_, columna_);
        this.id_ = id_;
    }
    traducir(env_, generador_, errores_) {
        try {
            /* EXTRAER VALOR EN UN TEMPORAL */
            //if(env_.prev_ != null){
            //}else{
            let variable_ = env_.get_variable(this.id_.toLowerCase());
            if (variable_ == null) {
                errores_.push(new nodoError("Semántico", `Variable ${this.id_} no encontrada`, this.linea_, this.columna_, "No se encontro la variable"));
            }
            let temporal_ = generador_.new_temporal();
            if (variable_.global_) {
                generador_.add_get_stack(temporal_, variable_.pos);
                const retorno_ = new retorno(temporal_, true, variable_.tipo_);
                if (variable_.tipo_.tipo == tipos_dato.BOOLEAN) {
                    retorno_.true_lbl = generador_.new_label();
                    retorno_.false_lbl = generador_.new_label();
                }
                return retorno_;
            }
            else {
                let aux_temp = generador_.new_temporal();
                generador_.add_expresion(aux_temp, "p", variable_.pos + 1, "+");
                generador_.add_get_stack(temporal_, aux_temp);
                const retorno_ = new retorno(temporal_, true, variable_.tipo_);
                if (variable_.tipo_.tipo == tipos_dato.BOOLEAN) {
                    retorno_.true_lbl = generador_.new_label();
                    retorno_.false_lbl = generador_.new_label();
                }
                return retorno_;
            }
            //}
        }
        catch (error) {
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, "Desconocido"));
            return null;
        }
    }
}
