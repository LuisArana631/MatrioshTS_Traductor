import { tipo } from '../abstract/valores';
import { simbolo } from '../herramientas/simbolo';
import { function_ } from '../instruccion/function';    

export class ambiente{
    private _variables:Map<string, simbolo>;
    private _funciones:Map<string, function_>
    
    constructor(public prev:ambiente|null){
        this._variables = new Map();
        this._funciones = new Map();
    }

    public guardar_function(id:string, funcion:function_){
        this._funciones.set(id, funcion);
    }

    public guardar_variable(id:string, valor:any, tipo:tipo, tipostr:string, linea:number, columna:number, permiso:number){
        let enviroment:ambiente|null = this;

        while(enviroment != null){
            if(enviroment._variables.has(id)){
                enviroment._variables.set(id, new simbolo(valor, id, tipo, tipostr, linea, columna, permiso));
                return;
            }
            enviroment = enviroment.prev;  
        }

        this._variables.set(id, new simbolo(valor, id, tipo, tipostr, linea, columna, permiso));
    }

    public get_function(id:string):function_|undefined|null{
        let env:ambiente|null = this;

        while(env != null){
            if(env._funciones.has(id)){
                return env._funciones.get(id);
            }
            env = env.prev;
        }

        return undefined;
    }

    public get_variable(id:string):simbolo|undefined|null{
        let enviroment:ambiente|null = this;

        while(enviroment != null){
            if(enviroment._variables.has(id)){
                return enviroment._variables.get(id);
            }
            enviroment = enviroment.prev;
        }

        return null;
    }

    public get_padre(id:string):simbolo|undefined|null{
        let enviroment:ambiente|null = this;
        let padre:ambiente;

        while(enviroment != null){
            if(enviroment._variables.has(id)){
                console.log(enviroment);
                //padre = enviroment;
                return null;
            }

            enviroment = enviroment.prev;
        }

        return null;
    }

    public update_variable(id:string, valor:any){
        let environment:ambiente|null = this;

        while(environment != null){
            if(environment._variables.has(id)){
                let aux_var = environment._variables.get(id);

                aux_var.valor = valor;
            }

            environment = environment.prev;
        }
    }

    public get_funciones():any{
        let env:ambiente|null = this;

        return env._funciones.values();
    }

    public get_variables():any{
        let enviroment:ambiente|null = this;
        this.get_padre("x");
        return enviroment._variables.values();
    }

    public get_global():ambiente {
        let enviroment:ambiente|null = this;

        while(enviroment?.prev != null){
            enviroment = enviroment.prev;
        }

        return enviroment;
    }
}