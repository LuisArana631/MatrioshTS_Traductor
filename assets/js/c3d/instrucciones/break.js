import { instruccion_c3d } from '../abstract/instruccion';
export class break_c3d extends instruccion_c3d {
    constructor(linea_, columna_) {
        super(linea_, columna_);
    }
    traducir(env_, generador_, errores_) {
    }
}
