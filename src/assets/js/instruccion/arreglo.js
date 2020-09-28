import { instruccion } from '../abstract/instruccion';
import { tipo } from '../abstract/valores';
import { nodoError } from '../error/error';
import { errores } from '../error/errores';
export class arreglo extends instruccion {
    constructor(id, valor, linea, columna, tipo_, permiso) {
        super(linea, columna);
        this._id = id;
        this._valor = valor;
        this._tipostr = tipo_;
        if (tipo_ === "string") {
            this._tipo = tipo.STRING;
        }
        else if (tipo_ === "number") {
            this._tipo = tipo.NUMBER;
        }
        else if (tipo_ === "boolean") {
            this._tipo = tipo.BOOLEAN;
        }
        else if (tipo_ === "types") {
            this._tipo = tipo.TYPES;
        }
        else if (tipo_ === "void") {
            this._tipo = tipo.VOID;
        }
        else if (tipo_ === "") {
            this._tipo = tipo.NULL;
        }
        if (permiso === "let") {
            this._permiso = 1;
        }
        else {
            this._permiso = 0;
        }
    }
    convert_string_num(tipo) {
        if (tipo == 0) {
            return "number";
        }
        else if (tipo == 1) {
            return "string";
        }
        else if (tipo == 2) {
            return "boolean";
        }
        else if (tipo == 3) {
            return "void";
        }
        else if (tipo == 4) {
            return "null";
        }
        else if (tipo == 5) {
            return "type";
        }
        else if (tipo == 6) {
            return "array";
        }
    }
    ejecutar(ambiente_) {
        let valores = new Array();
        if (this._valor) {
            for (let item of this._valor) {
                try {
                    valores.push(item.nodo.ejecutar(ambiente_));
                }
                catch (error) {
                    errores.addError(new nodoError("Semantico", error, this.linea, this.columna, "Error"));
                }
            }
        }
        try {
            ambiente_.guardar_variable(this._id, valores, this._tipo, this._tipostr, this.linea, this.columna, this._permiso);
        }
        catch (error) {
            errores.addError(new nodoError("Semántico", error, this.linea, this.columna, "Error"));
        }
    }
}
