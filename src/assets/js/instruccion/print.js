import { instruccion } from '../abstract/instruccion';
export class print extends instruccion {
    constructor(valor, linea, columna) {
        super(linea, columna);
        this.valor = valor;
    }
    ejecutar(environment) {
        const value = this.valor.ejecutar(environment);
        return value;
    }
}
