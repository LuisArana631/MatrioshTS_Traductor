import { expresion_c3d } from '../abstract/expresion';
import { statement_ } from './statement';
import { instruccion_c3d } from '../abstract/instruccion';
import { ambiente_c3d } from '../tabla_simbolos/ambiente';
import { generador } from './generador';
import { nodoError } from '../../error/error';
import { tipos_dato } from '../tools/tipo';

export class if_c3d extends instruccion_c3d{
    constructor(private condicion:expresion_c3d, private instrucciones:statement_, private elst:statement_|null, linea:number, columna:number){
        super(linea, columna);
    }

    public traducir(env_:ambiente_c3d, generador_:generador, errores_:Array<nodoError>){
        const condicion = this.condicion.traducir(env_, generador_, errores_);

        if(condicion.tipo_.tipo != tipos_dato.BOOLEAN){
            errores_.push(new nodoError("Semántico", "La condición debe ser tipo booleano", this.linea_, this.columna_, "Condición"));
            return null;
        }else{
            let exit_lbl;
            generador_.add_label(condicion.true_lbl);
            this.instrucciones.traducir(env_, generador_, errores_);
            if(this.elst){
                exit_lbl = generador_.new_label();
                generador_.add_goto(exit_lbl);
            }
            generador_.add_label(condicion.false_lbl);
            if(this.elst){
                this.elst.traducir(env_, generador_, errores_);
                generador_.add_label(exit_lbl);
            }
        }
    }
}