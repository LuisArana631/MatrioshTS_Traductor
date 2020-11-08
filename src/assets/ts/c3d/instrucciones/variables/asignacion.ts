import { instruccion_c3d } from '../../abstract/instruccion';
import { expresion_c3d } from '../../abstract/expresion';
import { ambiente_c3d } from '../../tabla_simbolos/ambiente';
import { generador } from '../generador';
import { nodoError } from '../../../error/error';

export class asignar_ extends instruccion_c3d{
    constructor(private exp_:expresion_c3d, private id_receptor:string, linea_:number, columna_:number){
        super(linea_, columna_);
    }

    public traducir(env_:ambiente_c3d, generador_:generador, errores_:Array<nodoError>){
        try{
            let var_ = env_.get_variable(this.id_receptor.toLowerCase());

            if(var_ == null){
                errores_.push(new nodoError("Semántico", `No se encontró la variable ${this.id_receptor}.`, this.linea_, this.columna_, "No existe variable."));
                return;
            }

            if(var_.restr_ == 0 ){
                errores_.push(new nodoError("Semántico", `No se puede cambiar el valor de una variable constante: ${this.id_receptor}.`, this.linea_, this.columna_, "Const"));
                return;
            }

            const expre_ = this.exp_.traducir(env_, generador_, errores_);

            if(var_.tipo_.tipo != expre_.tipo_.tipo){
                errores_.push(new nodoError("Semántico", `El tipo de dato no es correcto ${this.id_receptor}.`, this.linea_, this.columna_, "Tipo de dato incorrecto"));
                return;
            }

            generador_.add_set_stack(expre_.get_valor(), var_.pos);
                    
        }catch(error){
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, `Desconocido en asignación ${this.id_receptor}`));
            return;
        }
    }
}