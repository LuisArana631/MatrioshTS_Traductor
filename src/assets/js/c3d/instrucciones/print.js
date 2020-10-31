import { instruccion_c3d } from '../abstract/instruccion';
export class print_ extends instruccion_c3d {
    constructor(valor_, linea_, columna_) {
        super(linea_, columna_);
    }
    traducir(env_, generador_, errores_) {
    }
}
