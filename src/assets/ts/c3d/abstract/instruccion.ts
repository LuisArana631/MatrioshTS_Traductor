import { ambiente_c3d } from '../tabla_simbolos/ambiente';
import { tipos_, tipos_dato } from '../tools/tipo';
import { generador } from '../instrucciones/generador';
import { nodoError } from '../../error/error';

export abstract class instruccion_c3d{
    linea_: number;
    columna_: number;

    constructor(linea_:number, columna_:number){
        this.linea_ = linea_;
        this.columna_ = columna_;
    }

    public abstract traducir(env:ambiente_c3d, generador_:generador, errores_:Array<nodoError>):any;

    public mismo_tipo(t1:tipos_, t2:tipos_):boolean{
        if(t1.tipo == t2.tipo){
            if(t1.tipo == tipos_dato.TYPES){
                return t1.id_tipo.toLocaleLowerCase() === t2.id_tipo.toLocaleLowerCase();
            }
            return true;
        }else if(t1.tipo == tipos_dato.TYPES || t2.tipo == tipos_dato.TYPES){
            if(t1.tipo == tipos_dato.NULL || t2.tipo == tipos_dato.NULL){
                return true;
            }
        }else{
            return false;
        }
    }   
}