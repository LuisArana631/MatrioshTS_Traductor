import { expresion } from '../abstract/expresion';
import { ambiente } from '../herramientas/ambiente';
import { retorno } from '../abstract/valores';

import { nodoError } from '../error/error';
import { errores } from '../error/errores';

export class acceso extends expresion{
    constructor(private id:string, linea:number, columna:number){
        super(linea, columna);
    }

    public ejecutar(environment:ambiente):retorno{
        const value = environment.get_variable(this.id);

        if(value == null){
            errores.addError(new nodoError("Semántico", "No se encontró dicha variable ó es una variable sin inicializar", this.linea, this.columna, "variable"));
        }

        return  {
            valor: value.valor,
            tipo: value.tipo
        }
    }
}