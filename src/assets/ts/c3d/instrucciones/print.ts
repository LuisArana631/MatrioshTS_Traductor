import { nodoError } from '../../error/error';
import { instruccion_c3d } from '../abstract/instruccion';
import { generador } from './generador';
import { ambiente_c3d } from '../tabla_simbolos/ambiente';
import { expresion_c3d } from '../abstract/expresion';

export class print_ extends instruccion_c3d{
    constructor(valor_:expresion_c3d, linea_:number, columna_:number){
        super(linea_, columna_);
    }

    public traducir(env_:ambiente_c3d, generador_:generador, errores_:Array<nodoError>){

    }
}