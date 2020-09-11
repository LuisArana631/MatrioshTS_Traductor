import { instruccion } from '../abstract/instruccion';
import { expresion } from '../abstract/expresion';
import { ambiente } from '../herramientas/ambiente';

export class declaracion extends instruccion{
    private _id:string;
    private _valor:expresion;

    constructor(id:string, valor:expresion, linea:number, columna:number){
        super(linea, columna);
        this._id = id;
        this._valor = valor;
    }

    public ejecutar(ambiente_:ambiente){
        let valor;

        if(this._valor){
            valor = this._valor.ejecutar(ambiente_);
        }else{
            valor = {
                valor: "",
                tipo: 4
            }
        }   

        ambiente_.guardar_variable(this._id, valor.valor, valor.tipo);
    }
}