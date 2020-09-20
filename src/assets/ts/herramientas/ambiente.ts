import { tipo } from '../abstract/valores';
import { simbolo } from '../herramientas/simbolo';

export class ambiente{
    private _variables:Map<string, simbolo>;
    
    constructor(public prev:ambiente|null){
        this._variables = new Map();
    }

    public guardar_variable(id:string, valor:any, tipo:tipo, tipostr:string, linea:number, columna:number){
        let enviroment:ambiente|null = this;

        while(enviroment != null){
            if(enviroment._variables.has(id)){
                enviroment._variables.set(id, new simbolo(valor, id, tipo, tipostr, linea, columna));
                return;
            }
            enviroment = enviroment.prev;
        }

        this._variables.set(id, new simbolo(valor, id, tipo, tipostr, linea, columna));
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

    public get_variables():any{
        let enviroment:ambiente|null = this;

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