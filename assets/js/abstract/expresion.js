import { tipos } from '../herramientas/tablatipos';
export class expresion {
    constructor(linea, columna) {
        this._linea = linea;
        this._columna = columna;
    }
    get linea() {
        return this._linea;
    }
    get columna() {
        return this._columna;
    }
    set linea(linea) {
        this._linea = linea;
    }
    set columna(columna) {
        this._columna = columna;
    }
    determinar_tipo(tipo_izquierdo, tipo_derecho) {
        let tipo_retorno = tipos[tipo_izquierdo][tipo_derecho];
        return tipo_retorno;
    }
}
