import { tipo } from '../abstract/valores';
export class nodoSimbolo {
    constructor(tipo_, id, ambiente, instrucciones, parametros, valor, linea, columna) {
        if (tipo_ === "string") {
            this._tipo = tipo.STRING;
        }
        else if (tipo_ === "number") {
            this._tipo = tipo.NUMBER;
        }
        else if (tipo_ === "boolean") {
            this._tipo = tipo.BOOLEAN;
        }
        else if (tipo_ === "void") {
            this._tipo = tipo.VOID;
        }
        else if (tipo_ === "types") {
            this._tipo = tipo.TYPES;
        }
        else if (tipo_ === "") {
            this._tipo = tipo.ANY;
        }
        this._tipostr = tipo_;
        this._id = id;
        this._ambiente = ambiente;
        this._instrucciones = instrucciones;
        this._valor = valor;
        this._parametros = parametros;
        this._linea = linea;
        this._columna = columna;
    }
    get Tipostr() {
        return this._tipostr;
    }
    get Tipo() {
        return this._tipo;
    }
    get Id() {
        return this._id;
    }
    get Ambiente() {
        return this._ambiente;
    }
    get Instrucciones() {
        return this._instrucciones;
    }
    get Valor() {
        return this._valor;
    }
    get Parametros() {
        return this._parametros;
    }
    get Linea() {
        return this._linea;
    }
    get Columna() {
        return this._columna;
    }
    set Tipostr(_tipo) {
        this._tipostr = _tipo;
    }
    set Tipo(tipo) {
        this._tipo = tipo;
    }
    set Id(id) {
        this._id = id;
    }
    set Ambiente(ambiente) {
        this._ambiente = ambiente;
    }
    set Instrucciones(instrucciones) {
        this._instrucciones = instrucciones;
    }
    set Valor(valor) {
        this._valor = valor;
    }
    set Parametros(parametros) {
        this._parametros = parametros;
    }
    set Linea(linea) {
        this._linea = linea;
    }
    set Columna(columna) {
        this._columna = columna;
    }
}
