import { nodoError } from '../../error/error';
import { instruccion_c3d } from '../abstract/instruccion';
import { ambiente_c3d } from '../tabla_simbolos/ambiente';
import { generador } from './generador';
import { statement_ } from './statement';
import { tipos_, tipos_dato } from '../tools/tipo';

export class function_c3d extends instruccion_c3d{
    constructor(public id_:string, public instrucciones_:statement_, public parametros:Array<any>, public tipo_:tipos_, linea_:number, columna_:number){
        super(linea_, columna_)
    }

    public traducir(env_:ambiente_c3d, generador_:generador, errores_:Array<nodoError>){
        try{
            let nuevo_env = new ambiente_c3d(env_);
            let fin_ = generador_.new_label();            
            nuevo_env.return_= fin_;

            this.validar_params(env_, errores_);
            this.validar_type_func(env_, errores_);

            if(!env_.add_function(this.id_, this)){
                errores_.push(new nodoError("Semántico", `Ya existe una función llamada ${this.id_}`, this.linea_, this.columna_, "Function Existente"));
                return;
            }
            
            
            generador_.add_void(this.id_);
            generador_.limpiar_temporales();
            generador_.es_funcion = " ";

            if(this.parametros.length > 0){/*
                let indice_ = generador_.new_temporal();
                generador_.free_temp(indice_);
                generador_.add_expresion(indice_, "p", "1", "+");*/

                this.parametros.forEach(param_ => {/*
                    if(param_.tipo.tipo == tipos_dato.ARRAY || param_.tipo.tipo == tipos_dato.TYPES){
                        // ARRAY - TYPES                         
                    }else{
                        let temp_valor = generador_.new_temporal();
                        generador_.free_temp(temp_valor);                        
                        generador_.add_get_stack(temp_valor, indice_);
                    }

                    if(!(param_ === this.parametros[this.parametros.length - 1])){
                        generador_.add_expresion(indice_, indice_, "1", "+");
                    }*/

                    nuevo_env.add_variable(1, param_.id, param_.tipo, false, false, this.linea_, this.columna_);                                        
                });
            }
            this.instrucciones_.traducir(nuevo_env, generador_, errores_);  
            
            generador_.add_label(fin_);
            generador_.es_funcion = "";
            generador_.add_end_void();
            generador_.limpiar_temporales();
        }catch(error){
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, `Error en función ${this.id_}`));
        }        
    }

    private validar_params(env_:ambiente_c3d, errores_:Array<nodoError>){
        const set_params = new Set<string>();

        this.parametros.forEach((param_) => {
            if(set_params.has(param_.id.toLowerCase())){
                errores_.push(new nodoError("Semántico", `Parametro duplicado ${param_.id}`, this.linea_, this.columna_, "Parametro"));
                return;
            }

            if(param_.tipo.tipo == tipos_dato.TYPES){
                const type_param = env_.existe_types(param_.tipo.id_tipo);
                if(!type_param){
                    errores_.push(new nodoError("Sémantico", `No existe un type ${param_.tipo.id_tipo}`, this.linea_, this.columna_, "Type no existe"));
                    return;
                }

                param_.tipo = type_param;
            }

            set_params.add(param_.id.toLowerCase()); 
        });
    }

    private validar_type_func(env_:ambiente_c3d, errores_:Array<nodoError>){
        if(this.tipo_.tipo == tipos_dato.TYPES){
            const type_ = env_.existe_types(this.tipo_.id_tipo);

            if(!type_){
                errores_.push(new nodoError("Semántico", `Type no existe ${this.tipo_.id_tipo}`, this.linea_, this.columna_, "Type no existe"));
                return;
            }

            this.tipo_.types = type_;       
        }
    }
}