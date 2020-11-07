import { instruccion_c3d } from '../abstract/instruccion';
export class return_c3d extends instruccion_c3d {
    constructor(expresion_, linea_, columna_) {
        super(linea_, columna_);
        this.expresion_ = expresion_;
    }
    traducir(env_, generador_, errores_) {
    }
}
