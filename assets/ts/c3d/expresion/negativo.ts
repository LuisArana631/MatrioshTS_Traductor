import { nodoError } from '../../error/error';
import { expresion_c3d } from '../abstract/expresion';
import { generador } from '../instrucciones/generador';
import { ambiente_c3d } from '../tabla_simbolos/ambiente';
import { retorno } from '../tools/retorno';
import { tipos_dato } from '../tools/tipo';

export class negativo_ extends expresion_c3d{
    private oper_: expresion_c3d;
    constructor(op_:expresion_c3d, linea_:number, columna_:number){
        super(linea_, columna_);
        this.oper_ = op_;
    }

    public traducir(env_:ambiente_c3d, generador_:generador, errores_:Array<nodoError>):retorno{
        try{
            const operacion = this.oper_.traducir(env_, generador_, errores_);

            if(operacion.get_valor().charAt(0) == "t"){
                generador_.free_temp(operacion.get_valor());
            }

            if(operacion.tipo_.tipo != tipos_dato.NUMBER){
                errores_.push(new nodoError("Semántico", "Solo se puede usar negativo con números", this.linea_, this.columna_, "No es número"));
                return;
            }

            const temp_ = generador_.new_temporal();

            generador_.add_expresion(temp_,"0", operacion.get_valor(), "-");

            return new retorno(temp_, true, operacion.tipo_, operacion.simbolo_);
        }catch(error){
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, "Error en negativo"));
            return;
        }
    }
}