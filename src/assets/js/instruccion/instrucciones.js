import { instruccion } from '../abstract/instruccion';
import { ambiente } from '../herramientas/ambiente';
import { errores } from '../error/errores';
import { nodoError } from '../error/error';
export class instrucciones_ extends instruccion {
    constructor(codigo, linea, columna) {
        super(linea, columna);
        this.codigo = codigo;
    }
    //VALORES PERMITIDOS FUNC_PADRE
    // 0 -> DOWHILE
    // 1 -> FOR
    // 2 -> IF
    // 3 -> WHILE
    // 4 -> SWITCH
    ejecutar(environment, func_padre) {
        const nuevo_ambiente = new ambiente(environment);
        let elemento_str = "";
        for (const instr of this.codigo) {
            try {
                const elemento = instr.nodo.ejecutar(nuevo_ambiente);
                if (elemento.valor != undefined) {
                    elemento_str += elemento.valor + "\n";
                }
            }
            catch (error) {
                errores.addError(new nodoError("Semántico", error, instr.linea, instr.columna, "error"));
            }
        }
        return {
            valor: elemento_str,
            tipo: 1
        };
    }
}
