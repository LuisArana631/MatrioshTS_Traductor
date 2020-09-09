export var tipo;
(function (tipo) {
    tipo[tipo["NUMBER"] = 0] = "NUMBER";
    tipo[tipo["STRING"] = 1] = "STRING";
    tipo[tipo["BOOLEAN"] = 2] = "BOOLEAN";
    tipo[tipo["ARRAY"] = 3] = "ARRAY";
    tipo[tipo["VOID"] = 4] = "VOID";
    tipo[tipo["NULL"] = 5] = "NULL";
    tipo[tipo["TYPES"] = 6] = "TYPES";
    tipo[tipo["ANY"] = 7] = "ANY";
})(tipo || (tipo = {}));
