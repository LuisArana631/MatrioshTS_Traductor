import { instruccion } from '../abstract/instruccion';
import { tipo } from '../abstract/valores';
import { nodoError } from '../error/error';
import { errores } from '../error/errores';
export class declaracion extends instruccion {
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
        else if (tipo_ === "void") {
            this._tipo = tipo.VOID;
        }
        else if (tipo_ === "types") {
            this._tipo = tipo.TYPES;
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
        let valor;
        if (this._valor) {
            valor = this._valor.ejecutar(ambiente_);
        }
        else {
            valor = {
                valor: "",
                tipo: 4
            };
        }
        if (valor.valor == "" || valor == undefined || valor == null) {
            if (this._permiso == 0) {
                errores.addError(new nodoError("Semántico", "No se puede dejar con valor nulo una constante", this.linea, this.columna, "Constante"));
                return;
            }
        }
        if (this._tipo == valor.tipo) {
            ambiente_.guardar_variable(this._id, valor.valor, this._tipo, this._tipostr, this.linea, this.columna, this._permiso);
        }
        else if (this._tipo == null || this._tipo == undefined) {
            ambiente_.guardar_variable(this._id, valor.valor, valor.tipo, this.convert_string_num(valor.tipo), this.linea, this.columna, this._permiso);
        }
        else if ((this._tipo == null || this._tipo == undefined) && (valor.tipo == 4)) {
            ambiente_.guardar_variable(this._id, valor.valor, valor.tipo, this.convert_string_num(valor.tipo), this.linea, this.columna, this._permiso);
        }
        else {
            errores.addError(new nodoError("Semántico", "No se puede asignar el tipo: " + valor.tipo + " a un tipo: " + this._tipo, this.linea, this.columna, ""));
        }
    }
}
