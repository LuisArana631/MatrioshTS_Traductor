import { instruccion_c3d } from '../../abstract/instruccion';
import { tipos_, tipos_dato } from '../../tools/tipo';
import { expresion_c3d } from '../../abstract/expresion';
import { ambiente_c3d } from '../../tabla_simbolos/ambiente';
import { generador } from '../generador';

import { nodoError } from 'src/assets/ts/error/error';
import { retorno } from '../../tools/retorno';

export class declaracion_ extends instruccion_c3d{
    private tipo:tipos_;
    private id_:string;
    private valor:expresion_c3d;
    private rest_:number;

    constructor(tipo_:tipos_, id_:string, rest_:string, valor:expresion_c3d, linea_:number, columna_:number){
        super(linea_, columna_);
        this.tipo = tipo_;
        this.id_ = id_;
        this.valor = valor;

        if(rest_ == "let"){
            this.rest_ = 1;
        }else{
            this.rest_ = 0;
        }
    }

    public traducir(env_:ambiente_c3d, generador_:generador, errores_:Array<nodoError>):void{
        try{
            let valor_:retorno;

            if(this.valor == null){
                if(this.rest_ == 0){
                    errores_.push(new nodoError("Semántico", `No se puede dejar una constante (${this.id_}) sin valor`, this.linea_, this.columna_, "Const"));
                    return;
                }

                if(this.tipo.tipo == tipos_dato.NUMBER){
                    valor_ = new retorno('0', false, new tipos_(tipos_dato.NUMBER));
                }else if(this.tipo.tipo == tipos_dato.BOOLEAN){
                    valor_ = new retorno('', false, new tipos_(tipos_dato.BOOLEAN));
                }
            }else{
                valor_ = this.valor.traducir(env_, generador_, errores_);
            }

            if(valor_.get_valor().charAt(0) == "t"){
                generador_.free_temp(valor_.get_valor());
            }

            if(!this.mismo_tipo(this.tipo, valor_.tipo_)){
                errores_.push(new nodoError("Semántico", `No puedes insertar ${valor_.tipo_} en ${this.tipo.tipo}`, this.linea_, this.columna_, "Datos No Iguales"));
                return;
            }

            /*
            if(!this.validar_tipo(env_)){
                return;
            }*/

            const new_var = env_.add_variable(this.rest_, this.id_, valor_.tipo_.tipo == tipos_dato.NULL ? this.tipo  : valor_.tipo_, false, false, this.linea_, this.columna_);
            if(!new_var){
                errores_.push(new nodoError("Semántico", `La variable ${this.id_} ya existe.`, this.linea_, this.columna_, "Variable Repetida"));
                return;
            }else{
                if(new_var.global_){
                    if(this.tipo.tipo == tipos_dato.BOOLEAN){
                        const temporal_ = generador_.new_label();
                        generador_.add_label(valor_.true_lbl);
                        generador_.add_set_stack('1', new_var.pos+1);
                        generador_.add_goto(temporal_);
                        generador_.add_label(valor_.false_lbl);
                        generador_.add_set_stack('0', new_var.pos+1);
                        generador_.add_label(temporal_);
                    }else{
                        generador_.add_set_stack(valor_.get_valor(), new_var.pos+1 + generador_.get_temporales().size);
                    }
                }else{
                    const temp_ = generador_.new_temporal();
                    generador_.free_temp(temp_);
                    generador_.add_expresion(temp_, 'p', new_var.pos+1 + generador_.get_temporales().size, '+');
                    if(this.tipo.tipo == tipos_dato.BOOLEAN){
                        const temp_lbl = generador_.new_label();
                        generador_.add_label(valor_.true_lbl);
                        generador_.add_set_stack('1', temp_);
                        generador_.add_goto(temp_lbl);
                        generador_.add_label(valor_.false_lbl);
                        generador_.add_set_stack('0', temp_);
                        generador_.add_label(temp_lbl);
                    }else{
                        generador_.add_set_stack(valor_.get_valor(),temp_);
                    }
                }
            }
        }catch(error){
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, "Desconocido"));
            return;
        }
    }

    private validar_tipo(env_:ambiente_c3d, errores_:Array<nodoError>):boolean{
        if(this.tipo.tipo == tipos_dato.TYPES){
            const aux_types = env_.look_types(this.tipo.id_tipo);

            if(!aux_types){
                errores_.push(new nodoError("Semántico", `No existe el type ${this.tipo.id_tipo}`, this.linea_, this.columna_, "Desconocido"));
                return false;
            }

            this.tipo.types = aux_types;
            return true;
        }
    }
}