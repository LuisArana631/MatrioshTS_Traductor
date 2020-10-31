import { nodoError } from '../../error/error';
import { instruccion_c3d } from '../abstract/instruccion';
import { ambiente_c3d } from '../tabla_simbolos/ambiente';
export class statement_ extends instruccion_c3d {
    constructor(code_, linea_, columna_) {
        super(linea_, columna_);
        this.code_ = code_;
    }
    traducir(env_, generador_, errores_) {
        const new_env = new ambiente_c3d(env_);
        for (const instr of this.code_) {
            try {
                instr.nodo.traducir(new_env, generador_, errores_);
            }
            catch (error) {
                errores_.push(new nodoError("Semántico", error, instr.linea_, instr.columna_, "error"));
            }
        }
    }
}
