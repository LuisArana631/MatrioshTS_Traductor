import { instruccion_c3d } from '../../abstract/instruccion';
export class asignar_ extends instruccion_c3d {
    constructor(exp_, id_receptor, linea_, columna_) {
        super(linea_, columna_);
        this.exp_ = exp_;
        this.id_receptor = id_receptor;
    }
    traducir(env_, generador_, errores_) {
    }
}
