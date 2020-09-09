export enum tipo{
    NUMBER,
    STRING,
    BOOLEAN,
    ARRAY,
    VOID,
    NULL,
    TYPES,
    ANY
}

export type retorno = {
    valor:any,
    tipo: tipo
}

