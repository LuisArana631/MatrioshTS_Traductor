import { instruccion_c3d } from '../abstract/instruccion';
export class continue_c3d extends instruccion_c3d {
    constructor(linea_, columna_) {
        super(linea_, columna_);
    }
    traducir(env_, generador_, errores_) {
    }
}
