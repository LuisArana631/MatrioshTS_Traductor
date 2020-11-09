import { nodoError } from '../../error/error';
import { instruccion_c3d } from '../abstract/instruccion';
import { retorno } from '../tools/retorno';
export class call_c3d extends instruccion_c3d {
    constructor(id_, parametros, linea_, columna_) {
        super(linea_, columna_);
        this.id_ = id_;
        this.parametros = parametros;
    }
    traducir(env_, generador_, errores_) {
        try {
            let temporal_ = generador_.new_temporal();
            let func_ = env_.get_function(this.id_);
            if (!func_) {
                errores_.push(new nodoError("Semántico", `La función ${this.id_} no se encuentra`, this.linea_, this.columna_, "No existe la función"));
                return;
            }
            let arr_valores = new Array();
            if (env_.prev_ != null) {
                generador_.add_expresion(temporal_, "p", env_.size + generador_.get_temporales().size + 1, "+");
            }
            else {
                generador_.add_expresion(temporal_, "p", env_.size + generador_.get_temporales().size, "+");
            }
            let val_param;
            this.parametros.forEach((param_) => {
                val_param = param_.nodo.traducir(env_, generador_, errores_);
                arr_valores.push(val_param);
            });
            arr_valores.forEach((val) => {
                generador_.add_set_stack(val.get_valor(), temporal_);
                if (!(val === arr_valores[arr_valores.length - 1])) {
                    generador_.add_expresion(temporal_, temporal_, "1", "+");
                }
            });
            /*
                        generador_.add_code("printf(\"%c\", 10);");
                        generador_.add_code("printf(\"%c\", 10);");
                        generador_.add_code("printf(\"%c\", 10);");
                        generador_.add_code("printf(\"%f\", (float) stack[0]);");
                        generador_.add_code("printf(\"%c\", 10);");
                        generador_.add_code("printf(\"%f\", (float) stack[1]);");
                        generador_.add_code("printf(\"%c\", 10);");
                        generador_.add_code("printf(\"%f\", (float) stack[2]);");
                        generador_.add_code("printf(\"%c\", 10);");
                        generador_.add_code("printf(\"%f\", (float) stack[3]);");
                        generador_.add_code("printf(\"%c\", 10);");
                        generador_.add_code("printf(\"%f\", (float) stack[4]);");
                        generador_.add_code("printf(\"%c\", 10);");
                        generador_.add_code("printf(\"%f\", (float) stack[5]);");
                        generador_.add_code("printf(\"%c\", 10);");
                        generador_.add_code("printf(\"%f\", (float) stack[6]);");
                        generador_.add_code("printf(\"%c\", 10);");
                        generador_.add_code("printf(\"%f\", (float) stack[7]);");
                        generador_.add_code("printf(\"%c\", 10);");
                        generador_.add_code("printf(\"%f\", (float) stack[8]);");
                        generador_.add_code("printf(\"%c\", 10);");
                        generador_.add_code("printf(\"%f\", (float) stack[9]);");
                        generador_.add_code("printf(\"%c\", 10);");
                        generador_.add_code("printf(\"%f\", (float) stack[10]);");
                        generador_.add_code("printf(\"%c\", 10);");
                        generador_.add_code("printf(\"%c\", 10);");
                        generador_.add_code("printf(\"%c\", 10);");*/
            console.log("--------------------------------------------");
            console.log("tamaño de size: " + env_.size);
            console.log(env_);
            console.log("--------------------------------------------");
            console.log("tamaño de variables temporales: " + generador_.get_temporales().size);
            console.log(generador_.get_temporales());
            console.log("--------------------------------------------");
            let t_ = generador_.new_temporal();
            generador_.free_temp(t_);
            if (env_.prev_ != null) {
                generador_.next_stack(env_.size + generador_.get_temporales().size + 1);
                generador_.add_call(this.id_);
                generador_.add_get_stack(t_, "p");
                generador_.prev_stack(env_.size + generador_.get_temporales().size + 1);
            }
            else {
                generador_.next_stack(env_.size + generador_.get_temporales().size);
                generador_.add_call(this.id_);
                generador_.add_get_stack(t_, "p");
                generador_.prev_stack(env_.size + generador_.get_temporales().size);
            }
            return new retorno(t_, false, func_.tipo_);
        }
        catch (error) {
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, "Error en llamada de función"));
        }
    }
}
