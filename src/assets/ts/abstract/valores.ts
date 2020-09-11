export enum tipo{
    NUMBER, //0
    STRING, //1
    BOOLEAN,    //2
    VOID,   //3
    NULL,   //4
    TYPES,  //5
    ARRAY   //6
}

export type retorno = {
    valor:any,
    tipo: tipo
}

