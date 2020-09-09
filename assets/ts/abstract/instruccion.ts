import { ambiente } from '../herramientas/ambiente';

export abstract class instruccion{
    private _linea:number;
    private _columna:number;

    constructor(linea:number, columna:number){
        this._linea = linea;
        this._columna = columna;
    }

    get linea():number{
        return this._linea;
    }

    get columna():number{
        return this._columna;
    }

    set linea(linea:number){
        this._linea = linea;
    }

    set columna(columna:number){
        this._columna = columna;
    }   

    public abstract ejecutar(environment:ambiente):any;    
}