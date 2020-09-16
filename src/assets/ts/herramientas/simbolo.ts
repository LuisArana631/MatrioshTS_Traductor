import { tipo } from '../abstract/valores';
import { tipos } from './tablatipos';

export class simbolo{
    private _valor:any;
    private _id:string;
    private _tipo:tipo;
    private _tipostr:string;
    private _linea:number;
    private _columna:number;

    constructor(valor:any, id:string, tipo:tipo, tipostr:string, linea:number, columna:number){
        this._valor = valor;
        this._id = id;
        this._tipo = tipo;
        this._tipostr = tipostr;
        this._linea = linea;
        this._columna = columna;
    }

    get valor():any{
        return this._valor;
    }

    get id():string{
        return this._id;
    }

    get tipo():tipo{
        return this._tipo;
    }

    set valor(valor:any){
        this._valor = valor;
    }

    set id(id:string){
        this._id = id;
    }

    set tipo(tipo:tipo){
        this._tipo = tipo;
    }
}