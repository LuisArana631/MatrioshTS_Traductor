export class instruccion {
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
}
