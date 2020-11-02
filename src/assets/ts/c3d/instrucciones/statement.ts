import { nodoError } from '../../error/error';
import { instruccion_c3d } from '../abstract/instruccion';
import { ambiente_c3d } from '../tabla_simbolos/ambiente';
import { generador } from './generador';

export class statement_ extends instruccion_c3d{
    constructor(private code_:Array<any>, linea_:number, columna_:number){
        super(linea_, columna_);
    }

    public traducir(env_:ambiente_c3d, generador_:generador, errores_:Array<nodoError>){
        try{
            const new_env = new ambiente_c3d(env_);

            for(const instr of this.code_){
                try{
                    instr.nodo.traducir(new_env, generador_, errores_);
                }catch(error){
                    errores_.push(new nodoError("Semántico", error, instr.linea_, instr.columna_, "error"));
                }
            }
        }catch(error){
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, "Desconocido"));
            return;
        }
    }
}