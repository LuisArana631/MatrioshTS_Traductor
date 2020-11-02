import { ambiente_c3d } from '../tabla_simbolos/ambiente';
import { retorno } from '../tools/retorno';
import { tipos_dato } from '../tools/tipo';
import { tipos } from '../../herramientas/tablatipos';
import { generador } from '../instrucciones/generador';
import { nodoError } from '../../error/error';

export abstract class expresion_c3d{
    true_lbl: string;
    false_lbl: string;
    linea_: number;
    columna_: number;

    constructor(linea_:number, columna_:number){
        this.true_lbl = this.false_lbl = "";
        this.linea_ = linea_;
        this.columna_ = columna_;
    }

    public abstract traducir(env:ambiente_c3d, generador_:generador, errores_:Array<nodoError>):retorno;

    public determinar_tipo(tipo_izq:tipos_dato, tipo_der:tipos_dato){
        return tipos[tipo_izq][tipo_der];
    }
}