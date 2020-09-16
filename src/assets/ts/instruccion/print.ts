import { instruccion } from '../abstract/instruccion';
import { expresion } from '../abstract/expresion';
import { ambiente } from '../herramientas/ambiente';

export class print extends instruccion{
    constructor(private valor:expresion, linea:number, columna:number){
        super(linea, columna);
    }

    public ejecutar(environment:ambiente){
        const value = this.valor.ejecutar(environment);
        return value;
    }
}