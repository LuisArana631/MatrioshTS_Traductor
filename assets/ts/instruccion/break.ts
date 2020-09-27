import { instruccion } from '../abstract/instruccion';
import { ambiente } from '../herramientas/ambiente';

export class break_ extends instruccion{
    constructor(linea:number, columna:number){
        super(linea, columna);
    }

    public ejecutar(environment:ambiente){
        return {
            linea: this.linea,
            columna: this.columna,
            type: 'Break'
        }
    }
}