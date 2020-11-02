import { nodoError } from '../../error/error';
import { expresion_c3d } from '../abstract/expresion';
import { generador } from '../instrucciones/generador';
import { ambiente_c3d } from '../tabla_simbolos/ambiente';
import { retorno } from '../tools/retorno';
import { tipos_, tipos_dato } from '../tools/tipo';
import { tipo } from '../../abstract/valores';
import { errores } from '../../error/errores';


export enum oper_rel{
    IGUAL,
    NO_IGUAL,
    MENOR,
    MAYOR,
    MENOR_IGUAL,
    MAYOR_IGUAL
}

export class relacionales extends expresion_c3d{
    constructor(private left_:expresion_c3d, private righ_:expresion_c3d, private tipo_:oper_rel, linea_:number, columna_:number){
        super(linea_, columna_);
    }

    public traducir(env_: ambiente_c3d, generador_:generador, errores_:Array<nodoError>):retorno{
        try{
            const left_oper = this.left_.traducir(env_, generador_, errores_);
            const right_oper = this.righ_.traducir(env_, generador_, errores_);

            if(left_oper.get_valor().charAt(0) == "t"){
                generador_.free_temp(left_oper.get_valor());                
            }else if(right_oper.get_valor().charAt(0) == "t"){
                generador_.free_temp(right_oper.get_valor());
            }

            let retorno_ = new retorno('', false, new tipos_(2));

            this.true_lbl = this.true_lbl == '' ? generador_.new_label() : this.true_lbl;
            this.false_lbl = this.false_lbl == '' ? generador_.new_label() : this.false_lbl;

            retorno_.true_lbl = this.true_lbl;
            retorno_.false_lbl = this.false_lbl;

            let tipo_guia = this.determinar_tipo(left_oper.tipo_.tipo, right_oper.tipo_.tipo);

            if(this.tipo_ == oper_rel.IGUAL){
                if(tipo_guia == tipo.BOOLEAN || tipo_guia == tipo.NUMBER){
                    generador_.add_if(left_oper.get_valor(), right_oper.get_valor(), '==', this.true_lbl);
                    generador_.add_goto(this.false_lbl);
                }else if(tipo_guia == tipo.STRING){
                    if(left_oper.tipo_.tipo != tipos_dato.STRING || right_oper.tipo_.tipo != tipos_dato.STRING){
                        errores_.push(new nodoError("Semántico", "Solo se puede validar string == string", this.linea_, this.columna_, "String"));
                        return;
                    }else{
                        let temp_return = generador_.new_temporal();
                        generador_.free_temp(temp_return);

                        generador_.next_stack(env_.size);
                        generador_.add_call("compare_str");
                        generador_.add_get_stack(temp_return, "p");
                        generador_.prev_stack(env_.size);
                        generador_.add_if(temp_return, "0", "==", this.true_lbl);
                        generador_.add_goto(this.false_lbl);
                    }
                }else{
                    errores_.push(new nodoError("Semántico", "Solo se permite tipos de dato booleanom number y string en ==", this.linea_, this.columna_, "Tipo dato"));
                    return;
                }

                return retorno_;    
            }else if(this.tipo_ == oper_rel.MAYOR){
                if(tipo_guia == tipo.BOOLEAN || tipo_guia == tipo.NUMBER){
                    generador_.add_if(left_oper.get_valor(), right_oper.get_valor(), '>', this.true_lbl);
                    generador_.add_goto(this.false_lbl);
                }else{
                    errores_.push(new nodoError("Semántico", "Solo se permite tipos de dato booleano y number en >", this.linea_, this.columna_, "Tipo dato"));
                    return;
                }

                return retorno_;    
            }else if(this.tipo_ == oper_rel.MAYOR_IGUAL){
                if(tipo_guia == tipo.BOOLEAN || tipo_guia == tipo.NUMBER){
                    generador_.add_if(left_oper.get_valor(), right_oper.get_valor(), '>=', this.true_lbl);
                    generador_.add_goto(this.false_lbl);
                }else{
                    errores_.push(new nodoError("Semántico", "Solo se permite tipos de dato booleano y number en >=", this.linea_, this.columna_, "Tipo dato"));
                    return;
                }

                return retorno_;    
            }else if(this.tipo_ == oper_rel.MENOR){
                if(tipo_guia == tipo.BOOLEAN || tipo_guia == tipo.NUMBER){
                    generador_.add_if(left_oper.get_valor(), right_oper.get_valor(), '<', this.true_lbl);
                    generador_.add_goto(this.false_lbl);
                }else{
                    errores_.push(new nodoError("Semántico", "Solo se permite tipos de dato booleano y number en <", this.linea_, this.columna_, "Tipo dato"));
                    return;
                }

                return retorno_;    
            }else if(this.tipo_ == oper_rel.MENOR_IGUAL){
                if(tipo_guia == tipo.BOOLEAN || tipo_guia == tipo.NUMBER){
                    generador_.add_if(left_oper.get_valor(), right_oper.get_valor(), '<=', this.true_lbl);
                    generador_.add_goto(this.false_lbl);
                }else{
                    errores_.push(new nodoError("Semántico", "Solo se permite tipos de dato booleano y number en <", this.linea_, this.columna_, "Tipo dato"));
                    return;
                }

                return retorno_;    
            }else if(this.tipo_ == oper_rel.NO_IGUAL){
                if(tipo_guia == tipo.BOOLEAN || tipo_guia == tipo.NUMBER){
                    generador_.add_if(left_oper.get_valor(), right_oper.get_valor(), '!=', this.true_lbl);
                    generador_.add_goto(this.false_lbl);
                }else if(tipo_guia == tipo.STRING){
                    if(left_oper.tipo_.tipo != tipos_dato.STRING || right_oper.tipo_.tipo != tipos_dato.STRING){
                        errores_.push(new nodoError("Semántico", "Solo se puede validar string == string", this.linea_, this.columna_, "String"));
                        return;
                    }else{
                        let temp_return = generador_.new_temporal();
                        generador_.free_temp(temp_return);

                        generador_.next_stack(env_.size + generador_.get_temporales().size);
                        generador_.add_call("compare_str");
                        generador_.add_get_stack(temp_return, "p");
                        generador_.prev_stack(env_.size + generador_.get_temporales().size);
                        generador_.add_if(temp_return, "0", "!=", this.true_lbl);
                        generador_.add_goto(this.false_lbl);
                    }
                }else{
                    errores_.push(new nodoError("Semántico", "Solo se permite tipos de dato booleano, number y string en !=", this.linea_, this.columna_, "Tipo dato"));
                    return;
                }

                return retorno_;    
            }else{
                errores_.push(new nodoError("Semántico", "Operación relacional desconocida", this.linea_, this.columna_, "Desconocido"));
                return;
            }
        }catch (error){
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, "Desconocido"));
            return;
        }
    }
}