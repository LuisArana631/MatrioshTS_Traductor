import { tipo } from '../abstract/valores';

export class simbolo{
    private _valor:any;
    private _id:string;
    private _tipo:tipo;

    constructor(valor:any, id:string, tipo:tipo){
        this._valor = valor;
        this._id = id;
        this._tipo = tipo;
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