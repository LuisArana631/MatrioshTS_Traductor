import { tipo } from '../abstract/valores';

export class nodoSimbolo{
    private _tipo:tipo;
    private _id:string;
    private _ambiente:string;
    private _instrucciones:any;
    private _linea:number;
    private _columna:number;
    private _valor:any;
    private _parametros:any;
    private _tipostr:string;

    constructor(tipo_:string, id:string, ambiente:string, instrucciones:any, parametros:any, valor:any, linea:number, columna:number){

        if(tipo_ === "string"){
            this._tipo = tipo.STRING;
        }else if(tipo_ === "number"){
            this._tipo = tipo.NUMBER;
        }else if(tipo_ === "boolean"){
            this._tipo = tipo.BOOLEAN;
        }else if(tipo_ === "void"){
            this._tipo = tipo.VOID;
        }else if(tipo_ === "types"){
            this._tipo = tipo.TYPES;
        }else if(tipo_ === ""){
            this._tipo = tipo.ANY;
        }
        
        this._tipostr = tipo_;
        this._id = id;
        this._ambiente = ambiente;
        this._instrucciones = instrucciones;
        this._valor = valor;
        this._parametros = parametros;
        this._linea = linea;
        this._columna = columna;
    }

    get Tipostr():string{
        return this._tipostr;
    }

    get Tipo():tipo{
        return this._tipo;
    }

    get Id():string{
        return this._id;
    }

    
    get Ambiente():string{
        return this._ambiente;
    }

    get Instrucciones():any{
        return this._instrucciones;
    }

    get Valor():any{
        return this._valor;
    }

    get Parametros():any{
        return this._parametros;
    }

    get Linea():number{
        return this._linea;
    }

    get Columna():number{
        return this._columna;
    }

    set Tipostr(_tipo:string){
        this._tipostr = _tipo;
    }

    set Tipo(tipo:tipo){
        this._tipo = tipo;
    }

    set Id(id:string){
        this._id = id;
    }

    set Ambiente(ambiente:string){
        this._ambiente = ambiente;
    }

    set Instrucciones(instrucciones:any){
        this._instrucciones = instrucciones;
    }

    set Valor(valor:any){
        this._valor = valor;
    }

    set Parametros(parametros:any){
        this._parametros = parametros;
    }

    set Linea(linea:number){
        this._linea = linea;
    }

    set Columna(columna:number){
        this._columna = columna;
    }

}