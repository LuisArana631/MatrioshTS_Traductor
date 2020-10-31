import { tipo } from '../abstract/valores';

export const tipos= [
    //NUMBER - STRING - BOOLEAN - VOID - NULL - TYPES - ARRAY
    [ tipo.NUMBER, tipo.STRING, tipo.NUMBER, tipo.NULL, tipo.NULL, tipo.NULL, tipo.NULL ],    //NUMBER
    [ tipo.STRING, tipo.STRING, tipo.STRING, tipo.NULL, tipo.NULL, tipo.NULL, tipo.NULL ],    //STRING
    [ tipo.NUMBER, tipo.STRING, tipo.BOOLEAN, tipo.NULL, tipo.NULL, tipo.NULL, tipo.NULL ],   //BOOLEAN
    [ tipo.NULL, tipo.NULL, tipo.NULL, tipo.NULL, tipo.NULL, tipo.NULL, tipo.NULL ],    //VOID
    [ tipo.NULL, tipo.NULL, tipo.NULL, tipo.NULL, tipo.NULL, tipo.NULL, tipo.NULL ],    //NULL
    [ tipo.NULL, tipo.NULL, tipo.NULL, tipo.NULL, tipo.NULL, tipo.NULL, tipo.NULL ],    //TYPES
    [ tipo.NULL, tipo.NULL, tipo.NULL, tipo.NULL, tipo.NULL, tipo.NULL, tipo.ARRAY ] //ARRAY
]