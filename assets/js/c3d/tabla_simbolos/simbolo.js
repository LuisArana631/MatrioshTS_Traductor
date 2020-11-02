import { tipos_dato } from "../tools/tipo";
export class simbolo_c3d {
    constructor(rest_, tipo_, id_, pos, const_, global_, heap_ = false, linea_, columna_) {
        this.tipo_ = tipo_;
        this.id_ = id_;
        this.pos = pos;
        this.const_ = const_;
        this.global_ = global_;
        this.heap_ = heap_;
        this.restr_ = rest_;
        this.linea_ = linea_;
        this.columna_ = columna_;
        switch (this.tipo_.tipo) {
            case tipos_dato.BOOLEAN:
                this.tipo_str = "boolean";
                break;
            case tipos_dato.NUMBER:
                this.tipo_str = "number";
                break;
            case tipos_dato.STRING:
                this.tipo_str = "string";
                break;
            case tipos_dato.VOID:
                this.tipo_str = "void";
                break;
            default:
                this.tipo_str = "any";
        }
    }
}
