export class simbolo {
    constructor(valor, id, tipo, tipostr, linea, columna) {
        this._valor = valor;
        this._id = id;
        this._tipo = tipo;
        this._tipostr = tipostr;
        this._linea = linea;
        this._columna = columna;
    }
    get valor() {
        return this._valor;
    }
    get id() {
        return this._id;
    }
    get tipo() {
        return this._tipo;
    }
    set valor(valor) {
        this._valor = valor;
    }
    set id(id) {
        this._id = id;
    }
    set tipo(tipo) {
        this._tipo = tipo;
    }
}
