export class nodoError {
    constructor(tipo, descripcion, linea, columna, valor) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
    }
    get Tipo() {
        return this.tipo;
    }
    get Descripcion() {
        return this.descripcion;
    }
    get Linea() {
        return this.linea;
    }
    get Columna() {
        return this.columna;
    }
    get Valor() {
        return this.valor;
    }
}
