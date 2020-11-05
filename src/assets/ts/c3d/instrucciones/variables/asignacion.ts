import { instruccion_c3d } from '../../abstract/instruccion';
import { expresion_c3d } from '../../abstract/expresion';
import { ambiente_c3d } from '../../tabla_simbolos/ambiente';
import { generador } from '../generador';
import { errores } from 'src/assets/ts/error/errores';

export class asignar_ extends instruccion_c3d{
    constructor(private exp_:expresion_c3d, private id_receptor:string, linea_:number, columna_:number){
        super(linea_, columna_);
    }

    public traducir(env_:ambiente_c3d, generador_:generador, errores_:errores){
        
    }
}