import { tipos_, tipos_dato } from "../tools/tipo";

export class simbolo_c3d {
    tipo_: tipos_;
    id_: string;
    pos: number;
    const_: boolean;
    global_: boolean;
    heap_: boolean;
    restr_: number;
    linea_: number;
    columna_: number;
    tipo_str: string;

    constructor(rest_:number, tipo_: tipos_, id_: string, pos: number, const_: boolean, global_: boolean, heap_: boolean = false, linea_:number, columna_:number){
        this.tipo_ = tipo_;
        this.id_ =  id_;
        this.pos = pos;
        this.const_ = const_;
        this.global_ = global_;
        this.heap_ = heap_;
        this.restr_ = rest_;
        this.linea_ = linea_;
        this.columna_ = columna_;

        switch(this.tipo_.tipo){
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