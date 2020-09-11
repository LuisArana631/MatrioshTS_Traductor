import { tipo, retorno } from './valores';
import { ambiente } from '../herramientas/ambiente';
import { tipos } from '../herramientas/tablatipos';

export abstract class expresion{
    private _linea:number;
    private _columna:number;

    constructor(linea:number, columna:number){
        this._linea = linea;
        this._columna = columna;
    }

    public abstract ejecutar(environment:ambiente):retorno;

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

    public determinar_tipo(tipo_izquierdo:tipo, tipo_derecho:tipo):tipo{
        let tipo_retorno = tipos[tipo_izquierdo][tipo_derecho];
        return tipo_retorno;
    }
}