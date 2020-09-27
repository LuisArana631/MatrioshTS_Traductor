import { expresion } from '../abstract/expresion';
import { tipo } from '../abstract/valores';
export class dato_literal extends expresion {
    constructor(valor, tipo, linea, columna) {
        super(linea, columna);
        this.valor = valor;
        this.tipo = tipo;
    }
    ejecutar() {
        if (this.tipo == 0) {
            return {
                valor: Number(this.valor),
                tipo: tipo.NUMBER
            };
        }
        else if (this.tipo == 1) {
            return {
                valor: this.valor,
                tipo: tipo.STRING
            };
        }
        else if (this.tipo == 2) {
            return {
                valor: (this.valor == "true"),
                tipo: tipo.BOOLEAN
            };
        }
    }
}
