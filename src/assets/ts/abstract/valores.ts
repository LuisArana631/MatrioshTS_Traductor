export enum tipo{
    NUMBER,
    STRING,
    BOOLEAN,
    ARRAY,
    VOID
}

export type retorno = {
    valor:any,
    tipo: tipo
}