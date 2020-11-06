import { expresion_c3d } from '../abstract/expresion';
import { ambiente_c3d } from '../tabla_simbolos/ambiente';
import { generador } from '../instrucciones/generador';
import { retorno } from '../tools/retorno';
import { nodoError } from '../../error/error';
import { tipos_, tipos_dato } from '../tools/tipo';

export enum oper_logica{
    OR,
    AND,
    NEGAR
}

export class logicas_ extends expresion_c3d{
    constructor(private izquierda:expresion_c3d, private derecha:expresion_c3d, private tipo_:oper_logica, linea_:number, columna_:number){
        super(linea_, columna_);
    }

    public traducir(env_: ambiente_c3d, generador_:generador, errores_:Array<nodoError>):retorno{
        try{
            let left_oper:retorno = null;
            let right_oper:retorno = null;

            if(this.izquierda){
                left_oper = this.izquierda.traducir(env_, generador_, errores_);            
            }
            
            if(left_oper.get_valor().charAt(0) == "t"){
                generador_.free_temp(left_oper.get_valor());                
            }

            let tipo_guia:any = left_oper.tipo_.tipo;
            if(tipo_guia != tipos_dato.BOOLEAN){
                errores_.push(new nodoError("Semántico", `Operación de tipo invalido. Necesitas Boolean`, this.linea_, this.columna_, "Operacion incorrecta"));
                return;
            }
            let retorno_ = new retorno('', false, new tipos_(2));
            
            if(this.tipo_ == oper_logica.AND){
                generador_.add_label(left_oper.true_lbl);

                if(this.derecha){
                    right_oper = this.derecha.traducir(env_, generador_, errores_);
                }

                if(right_oper.get_valor().charAt(0) == "t"){
                    generador_.free_temp(right_oper.get_valor());
                }

                tipo_guia = this.determinar_tipo(left_oper.tipo_.tipo, right_oper.tipo_.tipo);
                if(tipo_guia != tipos_dato.BOOLEAN){
                    errores_.push(new nodoError("Semántico", `Operación de tipo invalido. Necesitas Boolean`, this.linea_, this.columna_, "Operacion incorrecta"));
                    return;
                }

                retorno_.false_lbl = left_oper.false_lbl + ": " + right_oper.false_lbl;
                retorno_.true_lbl = right_oper.true_lbl;
                return retorno_;
            }else if(this.tipo_ == oper_logica.OR){
                generador_.add_label(left_oper.false_lbl);

                if(this.derecha){
                    right_oper = this.derecha.traducir(env_, generador_, errores_);
                }

                if(right_oper.get_valor().charAt(0) == "t"){
                    generador_.free_temp(right_oper.get_valor());
                }

                tipo_guia = this.determinar_tipo(left_oper.tipo_.tipo, right_oper.tipo_.tipo);
                if(tipo_guia != tipos_dato.BOOLEAN){
                    errores_.push(new nodoError("Semántico", `Operación de tipo invalido. Necesitas Boolean`, this.linea_, this.columna_, "Operacion incorrecta"));
                    return;
                }

                retorno_.false_lbl = right_oper.false_lbl;
                retorno_.true_lbl = left_oper.true_lbl + ": " + right_oper.true_lbl;
                return retorno_;
            }else if(this.tipo_ == oper_logica.NEGAR){
                retorno_.false_lbl = left_oper.true_lbl;
                retorno_.true_lbl = left_oper.false_lbl;
                return retorno_;
            }else{
                errores_.push(new nodoError("Semántico", `Operación lógica desconocida`, this.linea_, this.columna_, "Desconocido"));
                return;
            }
        }catch(error){
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, "Desconocido"));
            return;
        }
    }
}