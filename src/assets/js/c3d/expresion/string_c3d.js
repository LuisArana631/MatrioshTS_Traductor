import { expresion_c3d } from '../abstract/expresion';
import { retorno } from '../tools/retorno';
import { tipos_ } from '../tools/tipo';
export class string_c3d extends expresion_c3d {
    constructor(tipo_, valor_, linea_, columna_) {
        super(linea_, columna_);
        this.valor_ = valor_;
        this.tipo_ = tipo_;
    }
    traducir(env_, generador_, errores_) {
        const temporal_ = generador_.new_temporal();
        generador_.add_expresion(temporal_, 'h');
        const retorno_ = new retorno(temporal_, true, new tipos_(1));
        for (let i = 0; i < this.valor_.length; i++) {
            generador_.add_set_heap(this.valor_.charCodeAt(i), 'h');
            generador_.next_heap();
        }
        generador_.add_set_heap("-1", 'h');
        generador_.next_heap();
        return retorno_;
    }
}
