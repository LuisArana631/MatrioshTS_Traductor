import { simbolo_atributo } from '../tabla_simbolos/simbolo_type';

export enum tipos_dato{
    NUMBER, //0
    STRING, //1
    BOOLEAN,    //2
    VOID,   //3
    NULL,   //4
    TYPES,  //5
    ARRAY   //6
}

export class tipos_{
    tipo: tipos_dato;
    id_tipo: string;
    types: simbolo_atributo|null;

    constructor(type: tipos_dato, id_: string ='', types_: simbolo_atributo|null = null){
        this.tipo = type;
        this.id_tipo = id_;
        this.types = types_;
    }
}

