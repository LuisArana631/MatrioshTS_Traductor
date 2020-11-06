import { expresion_c3d } from '../abstract/expresion';
import { ambiente_c3d } from '../tabla_simbolos/ambiente';
import { retorno } from '../tools/retorno';
import { generador } from '../instrucciones/generador';
import { tipos_dato } from '../tools/tipo';
import { nodoError } from '../../error/error';

export class incremento extends expresion_c3d{
    private right_oper: expresion_c3d;

    constructor(right_: expresion_c3d, private id_:string, linea_:number, columna_:number){
        super(linea_, columna_);
        this.right_oper = right_;
    }

    public traducir(env_: ambiente_c3d, generador_:generador, errores_:Array<nodoError>):retorno{
        try{
            const right_ = this.right_oper.traducir(env_, generador_, errores_);
            
            if(right_.get_valor().charAt(0) == "t"){
                generador_.free_temp(right_.get_valor());
            }

            let var_ = env_.get_variable(this.id_);

            if(var_ == null){
                errores_.push(new nodoError("Semántico", `No se encontro la variable: ${this.id_}`, this.linea_, this.columna_, "No es variable"));
                return;
            }
            
            if(var_.tipo_.tipo != tipos_dato.NUMBER){
                errores_.push(new nodoError("Semántico", "Solo se puede incrementar variables numericas", this.linea_, this.columna_, "No es numero"));
                return;
            }

            generador_.add_expresion(right_.get_valor(), right_.get_valor(), "1", "+");
            generador_.add_set_stack(right_.get_valor(), var_.pos);

        }catch(error){
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, "Desconocido"));
            return;
        }
    }
}