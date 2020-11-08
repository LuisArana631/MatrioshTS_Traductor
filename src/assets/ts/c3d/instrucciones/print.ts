import { nodoError } from '../../error/error';
import { instruccion_c3d } from '../abstract/instruccion';
import { generador } from './generador';
import { ambiente_c3d } from '../tabla_simbolos/ambiente';
import { expresion_c3d } from '../abstract/expresion';
import { tipos_dato } from '../tools/tipo';

export class print_ extends instruccion_c3d{
    constructor(private valor_:expresion_c3d, linea_:number, columna_:number){
        super(linea_, columna_);
    }

    public traducir(env_:ambiente_c3d, generador_:generador, errores_:Array<nodoError>){
        try{
            const valor = this.valor_.traducir(env_, generador_, errores_);        
            
            if(valor.get_valor().charAt(0) == "t"){
                generador_.free_temp(valor.get_valor());
            }

            switch (valor.tipo_.tipo){
                case tipos_dato.BOOLEAN:                
                    if(valor.get_valor() == "1"){
                        generador_.add_label(valor.true_lbl);
                        generador_.add_call("print_true");
                    }else{
                        generador_.add_label(valor.false_lbl);
                        generador_.add_call("print_false");
                    }
                    break;
                case tipos_dato.NUMBER:
                    if (+valor.get_valor() - Math.floor(+valor.get_valor()) == 0){
                        generador_.print_("d", valor.get_valor());
                    }else{
                        generador_.print_("f", valor.get_valor());
                    }             
                    break;
                case tipos_dato.STRING:
                    generador_.next_stack(env_.size + generador_.get_temporales().size);
                    generador_.add_call("print_str");
                    generador_.prev_stack(env_.size + generador_.get_temporales().size);
                    break;
                default:
                    errores_.push(new nodoError("Semántico", "Solo se puede hacer print de number, string y boolean", this.linea_, this.columna_, "Tipo incorrecto"));
                    return;
            }
        }catch(error){
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, "Desconocido en console.log"));
            return;
        }
    }
}