import { instruccion } from '../abstract/instruccion';
import { ambiente } from '../herramientas/ambiente';

import { errores } from '../error/errores';
import { nodoError } from '../error/error';

export class instrucciones_ extends instruccion{
    constructor(private codigo:Array<any>, linea:number, columna:number){
        super(linea, columna);
    }

    //VALORES PERMITIDOS FUNC_PADRE
    // 0 -> DOWHILE
    // 1 -> FOR
    // 2 -> IF
    // 3 -> WHILE
    // 4 -> SWITCH

    public ejecutar(environment:ambiente, func_padre:number){
        const nuevo_ambiente = new ambiente(environment);
        let elemento_str:string = "";

        for(const instr of this.codigo){
            try{
                const elemento = instr.nodo.ejecutar(nuevo_ambiente);

                if(elemento.type == "Break"){
                    if(func_padre == 0){    //DOWHILE

                    }else if(func_padre == 1){  //FOR

                    }else if(func_padre == 2){  //IF
                        
                    }else if(func_padre == 3){  //WHILE

                    }else if(func_padre == 4){  //SWITCH
                        
                    }
                }else if(elemento.type == "Continue"){
                    if(func_padre == 0){    //DOWHILE
                        
                    }else if(func_padre == 1){  //FOR

                    }else if(func_padre == 2){  //IF
                        
                    }else if(func_padre == 3){  //WHILE

                    }else if(func_padre == 4){  //SWITCH
                        
                    }
                }

                if(elemento.valor != undefined){
                    elemento_str += elemento.valor + "\n";
                }
            }catch(error){
                errores.addError(new nodoError("Semántico", error, instr.linea, instr.columna, "error"));
            }
        }

        return {
            valor: elemento_str,
            tipo: 1
        };
    }
}