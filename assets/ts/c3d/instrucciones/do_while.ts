import { instruccion_c3d } from '../abstract/instruccion';
import { expresion_c3d } from '../abstract/expresion';
import { ambiente_c3d } from '../tabla_simbolos/ambiente';
import { generador } from './generador';
import { nodoError } from '../../error/error';
import { tipos_dato } from '../tools/tipo';

export class do_while_c3d extends instruccion_c3d{
    constructor(private condicion_:expresion_c3d, private instrucciones:instruccion_c3d, linea:number, columna:number){
        super(linea, columna);
    }

    public traducir(env_:ambiente_c3d, generador_:generador, errores_:Array<nodoError>){
        try{
            let lbl_true = generador_.new_label();
            this.condicion_.true_lbl = lbl_true;
            generador_.add_label(lbl_true);

            this.instrucciones.traducir(env_, generador_, errores_);

            const condicion = this.condicion_.traducir(env_, generador_, errores_);    

            if(condicion.tipo_.tipo != tipos_dato.BOOLEAN){
                errores_.push(new nodoError("Semántico", "La condición debe ser tipo booleano", this.linea_, this.columna_, "Condicion"));
                return null;
            }

            generador_.add_label(condicion.false_lbl);
        }catch(error){
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, "Desconocido"));
            return;
        }
    }
}
