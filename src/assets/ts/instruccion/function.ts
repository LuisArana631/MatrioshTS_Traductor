import { instruccion } from '../abstract/instruccion';
import { ambiente } from '../herramientas/ambiente';
import { instrucciones_ } from '../instruccion/instrucciones';

export class function_ extends instruccion{
    constructor(public id:string, public instrucciones:instrucciones_, public parametros:Array<any>, linea:number, columna:number,public tipo:string){
        super(linea, columna);
    }

    public ejecutar(environment:ambiente){
        environment.guardar_function(this.id, this)        
    }
}