import { simbolo_atributo } from './simbolo_type';
import { simbolo_c3d } from './simbolo';
import { tipos_ } from '../tools/tipo';
import { atributo } from '../tools/atributo';
import { function_c3d } from '../instrucciones/function';

export class ambiente_c3d{
    types_: Map<string, simbolo_atributo>;
    variables_: Map<string, simbolo_c3d>;
    funciones_: Map<string, function_c3d>;
    prev_: ambiente_c3d|null;
    size: number;
    break_: string|null;
    continue_: string|null;
    return_: string|null;

    constructor(anterior_:ambiente_c3d|null = null){
        this.types_ = new Map();
        this.variables_ = new Map();
        this.funciones_ = new Map();
        this.prev_ = anterior_;
        this.size = anterior_?.size || 0;
        this.break_ = anterior_?.break_ || null;
        this.continue_ = anterior_?.continue_ || null;
        this.return_ = anterior_?.return_ || null;
    }

    public limpiar_types(){
        this.types_.clear();
    }

    public limpiar_variables(){
        this.variables_.clear();
    }

    public add_variable(rest_:number, id_:string, tipo_:tipos_, const_:boolean, ref_: boolean, linea_:number, columna_:number):simbolo_c3d|null{
        id_ = id_.toLowerCase();
        if(this.variables_.get(id_) != undefined){
            return null;
        }else{
            const new_variable = new simbolo_c3d(rest_, tipo_, id_, this.size++, const_, this.prev_ == null, ref_, linea_, columna_);
            this.variables_.set(id_, new_variable);
            return new_variable;
        }
    }

    public add_function(id:string, func:function_c3d){
        id = id.toLowerCase();

        if(this.variables_.get(id)  != undefined){
            return null;
        }else{
            this.funciones_.set(id, func);
        }        
    }

    public add_types(id_:string, size_:number, params_:Array<atributo>):boolean{
        if(this.types_.has(id_.toLocaleLowerCase())){
            return false;
        }else{
            this.types_.set(id_.toLowerCase(), new simbolo_atributo(id_.toLowerCase(), size_, params_));
            return true;
        }
    }

    public get_variable(id_:string):simbolo_c3d|null{
        let ambiente_: ambiente_c3d|null = this;
        id_ = id_.toLowerCase();

        while(ambiente_ != null){
            const sym = ambiente_.variables_.get(id_);
            if(sym != undefined){
                return sym;
            }

            ambiente_ = ambiente_.prev_;
        }

        return null;
    }

    public get_function(id:string):function_c3d|undefined|null{
        let env_:ambiente_c3d|null = this;

        while(env_ != null){
            if(env_.funciones_.has(id)){
                return env_.funciones_.get(id);
            }

            env_ = env_.prev_;
        }

        return undefined;
    }

    public get_variables():any{
        let env_:ambiente_c3d|null = this;
        return env_.variables_.values();
    }

    public get_functions():any{
        let env_:ambiente_c3d|null = this;
        return env_.funciones_.values();
    }

    public existe_types(id_:string){
        return this.types_.get(id_.toLowerCase());
    }

    public look_types(id_:string):simbolo_atributo|null{
        let ambiente_:ambiente_c3d|null = this;
        id_ = id_.toLowerCase();

        while(ambiente_ != null){
            const sym = ambiente_.types_.get(id_);

            if(sym != undefined ){
                return sym;
            }

            ambiente_ = ambiente_.prev_;
        }

        return null;
    }
}