import { expresion_c3d } from '../abstract/expresion';
import { nodoError } from '../../error/error';
import { retorno } from '../tools/retorno';
import { tipos_ } from '../tools/tipo';
export class string_c3d extends expresion_c3d {
    constructor(tipo_, valor_, linea_, columna_) {
        super(linea_, columna_);
        this.valor_ = valor_;
        this.tipo_ = tipo_;
    }
    traducir(env_, generador_, errores_) {
        try {
            const temporal_ = generador_.new_temporal();
            generador_.free_temp(temporal_);
            generador_.add_code(`${temporal_} = h;`);
            const retorno_ = new retorno(temporal_, true, new tipos_(1));
            for (let i = 0; i < this.valor_.length; i++) {
                generador_.add_set_heap(this.valor_.charCodeAt(i), 'h');
                generador_.next_heap();
            }
            generador_.add_set_heap("-1", 'h');
            generador_.next_heap();
            if (env_.prev_ == null) {
                generador_.add_set_stack(temporal_, generador_.get_temporales().size + env_.size + 1);
            }
            else {
                let aux_index = generador_.new_temporal();
                generador_.free_temp(aux_index);
                generador_.add_expresion(aux_index, "p", generador_.get_temporales().size + env_.size + 1, "+");
                generador_.add_set_stack(temporal_, aux_index);
            }
            return retorno_;
        }
        catch (error) {
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, "Desconocido"));
            return;
        }
    }
}
