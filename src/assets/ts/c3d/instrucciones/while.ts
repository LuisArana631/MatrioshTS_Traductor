import { instruccion_c3d } from '../abstract/instruccion';
import { expresion_c3d } from '../abstract/expresion';
import { ambiente_c3d } from '../tabla_simbolos/ambiente';
import { generador } from './generador';
import { nodoError } from '../../error/error';
import { tipos_dato } from '../tools/tipo';

export class while_c3d extends instruccion_c3d{
    constructor(private condicion_:expresion_c3d, private instrucciones_:instruccion_c3d, linea_:number, columna_:number){
        super(linea_, columna_);
    }

    public traducir(env_:ambiente_c3d, generador_:generador, errores_:Array<nodoError>){
        let temporal_loop = generador_.new_label();
        generador_.add_label(temporal_loop);
        const condicion = this.condicion_.traducir(env_, generador_, errores_);

        if(condicion.tipo_.tipo != tipos_dato.BOOLEAN){
            errores_.push(new nodoError("Semántico", "La condición debe ser tipo booleano", this.linea_, this.columna_, "Condición"));
            return null;
        }else{
            generador_.add_label(condicion.true_lbl);
            this.instrucciones_.traducir(env_, generador_, errores_);
            generador_.add_goto(temporal_loop);
            generador_.add_label(condicion.false_lbl);
        }
    }
}