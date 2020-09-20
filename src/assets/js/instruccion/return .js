import { instruccion } from '../abstract/instruccion';
export class return_ extends instruccion {
    constructor(exp, linea, columna) {
        super(linea, columna);
        this.exp = exp;
    }
    ejecutar(environment) {
        let val_return = null;
        if (this.exp)
            val_return = this.exp.ejecutar(environment);
        return val_return;
    }
}
