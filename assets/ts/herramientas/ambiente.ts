import { tipo } from '../abstract/valores';
import { simbolo } from '../herramientas/simbolo';

export class ambiente{
    private _variables:Map<string, simbolo>;
    
    constructor(public prev:ambiente|null){
        this._variables = new Map();
    }

    public guardar_variable(id:string, valor:any, tipo:tipo){
        let enviroment:ambiente|null = this;

        while(enviroment != null){
            if(enviroment._variables.has(id)){
                enviroment._variables.set(id, new simbolo(valor, id, tipo));
                return;
            }
            enviroment = enviroment.prev;
        }

        this._variables.set(id, new simbolo(valor, id, tipo));
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

    public get_global():ambiente {
        let enviroment:ambiente|null = this;

        while(enviroment?.prev != null){
            enviroment = enviroment.prev;
        }

        return enviroment;
    }
}