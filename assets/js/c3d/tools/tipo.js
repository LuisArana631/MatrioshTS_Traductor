export var tipos_dato;
(function (tipos_dato) {
    tipos_dato[tipos_dato["NUMBER"] = 0] = "NUMBER";
    tipos_dato[tipos_dato["STRING"] = 1] = "STRING";
    tipos_dato[tipos_dato["BOOLEAN"] = 2] = "BOOLEAN";
    tipos_dato[tipos_dato["VOID"] = 3] = "VOID";
    tipos_dato[tipos_dato["NULL"] = 4] = "NULL";
    tipos_dato[tipos_dato["TYPES"] = 5] = "TYPES";
    tipos_dato[tipos_dato["ARRAY"] = 6] = "ARRAY"; //6
})(tipos_dato || (tipos_dato = {}));
export class tipos_ {
    constructor(type, id_ = '', types_ = null) {
        this.tipo = type;
        this.id_tipo = id_;
        this.types = types_;
    }
}
