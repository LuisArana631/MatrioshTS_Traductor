import { instruccion } from '../abstract/instruccion';
import { expresion } from '../abstract/expresion';
import { ambiente } from '../herramientas/ambiente';

export class return_ extends instruccion{
    constructor(private exp:expresion, linea:number, columna:number){
        super(linea, columna);
    }

    public ejecutar(environment:ambiente){
        let val_return:any = null;
        if(this.exp)
             val_return = this.exp.ejecutar(environment);
        return val_return;
    }
}



