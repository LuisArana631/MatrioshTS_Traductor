import { instruccion_c3d } from '../abstract/instruccion';
import { expresion_c3d } from '../abstract/expresion';
import { ambiente_c3d } from '../tabla_simbolos/ambiente';
import { generador } from './generador';
import { nodoError } from '../../error/error';
import { acceso_ } from './variables/acceder';
import { retorno } from '../tools/retorno';
import { tipos_dato } from '../tools/tipo';

export class for_c3d extends instruccion_c3d{
    constructor(private condicion_:expresion_c3d, private operacion_control:expresion_c3d, private id_oper:expresion_c3d, private instrucciones_:instruccion_c3d, private id_:string, linea_:number, columna_:number){
        super(linea_, columna_);
    }

    public traducir(env_:ambiente_c3d, generador_:generador, errores_:Array<nodoError>){
        try{
            /* MANEJAR VARIABLE DE INICIO */
            let id_aux:retorno;

            if(this.id_oper != null){
                id_aux = this.id_oper.traducir(env_, generador_, errores_);
            }else{
                let aux_acceso:acceso_ = new acceso_(this.id_, this.linea_, this.columna_);
                id_aux = aux_acceso.traducir(env_, generador_, errores_);
            }            

            if(id_aux instanceof expresion_c3d){
                if(id_aux.get_valor().charAt(0) == "t"){
                    generador_.free_temp(id_aux.get_valor());
                }
    
            }
            
            /* LOOP DEL FOR */
            let loop_lbl = generador_.new_label();

            generador_.add_label(loop_lbl);
            const condi_ = this.condicion_.traducir(env_, generador_, errores_);

            env_.break_ = condi_.false_lbl;
            env_.continue_ = loop_lbl;

            if(condi_.get_valor().charAt(0) == "t"){
                generador_.free_temp(id_aux.get_valor());
            }

            if(condi_.tipo_.tipo !=  tipos_dato.BOOLEAN){
                errores_.push(new nodoError("Semántico", "Se debe insertar una condición booleana", this.linea_, this.columna_, "Condición incorrecta"));
                return;
            }

            /* CODIGO DE CONDICION CORRECTA */
            generador_.add_label(condi_.true_lbl);
            
            this.instrucciones_.traducir(env_, generador_, errores_);

            let control = this.operacion_control.traducir(env_, generador_, errores_);

            if(control.get_valor().charAt(0) == "t"){
                generador_.free_temp(control.get_valor());
            }

            if(control.tipo_.tipo != tipos_dato.NUMBER){
                errores_.push(new nodoError("Semántico", "Solo puedes controlar el for con valores numericos", this.linea_, this.columna_, "Error en condición"));
            }

            generador_.add_goto(loop_lbl);
            /* SALIDA DEL FOR */
            generador_.add_label(condi_.false_lbl);

        }catch(error){
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, "Error en For"));
        }
    }
}