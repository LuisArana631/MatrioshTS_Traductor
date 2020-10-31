import { nodoError } from '../../error/error';
import { expresion_c3d } from '../abstract/expresion';
import { generador } from '../instrucciones/generador';
import { ambiente_c3d } from '../tabla_simbolos/ambiente';
import { retorno } from '../tools/retorno';
import { tipos_ } from '../tools/tipo';


export enum oper_rel{
    IGUAL,
    NO_IGUAL,
    MENOR,
    MAYOR,
    MENOR_IGUAL,
    MAYOR_IGUAL
}

export class relacionales extends expresion_c3d{
    constructor(private left_:expresion_c3d, private righ_:expresion_c3d, private tipo_:oper_rel, linea_:number, columna_:number){
        super(linea_, columna_);
    }

    public traducir(env_: ambiente_c3d, generador_:generador, errores_:Array<nodoError>):retorno{
        const left_oper = this.left_.traducir(env_, generador_, errores_);
        const right_oper = this.righ_.traducir(env_, generador_, errores_);

        let retorno_ = new retorno('', false, new tipos_(2));

        this.true_lbl = this.true_lbl == '' ? generador_.new_label() : this.true_lbl;
        this.false_lbl = this.false_lbl == '' ? generador_.new_label() : this.false_lbl;

        retorno_.true_lbl = this.true_lbl;
        retorno_.false_lbl = this.false_lbl;

        if(this.tipo_ == oper_rel.IGUAL){
            generador_.add_if(left_oper.get_valor(), right_oper.get_valor(), '==', this.true_lbl);
            generador_.add_goto(this.false_lbl);

            return retorno_;    
        }else if(this.tipo_ == oper_rel.MAYOR){
            generador_.add_if(left_oper.get_valor(), right_oper.get_valor(), '>', this.true_lbl);
            generador_.add_goto(this.false_lbl);

            return retorno_;    
        }else if(this.tipo_ == oper_rel.MAYOR_IGUAL){
            generador_.add_if(left_oper.get_valor(), right_oper.get_valor(), '>=', this.true_lbl);
            generador_.add_goto(this.false_lbl);

            return retorno_;    
        }else if(this.tipo_ == oper_rel.MENOR){
            generador_.add_if(left_oper.get_valor(), right_oper.get_valor(), '<', this.true_lbl);
            generador_.add_goto(this.false_lbl);

            return retorno_;    
        }else if(this.tipo_ == oper_rel.MENOR_IGUAL){
            generador_.add_if(left_oper.get_valor(), right_oper.get_valor(), '<=', this.true_lbl);
            generador_.add_goto(this.false_lbl);

            return retorno_;    
        }else if(this.tipo_ == oper_rel.NO_IGUAL){
            generador_.add_if(left_oper.get_valor(), right_oper.get_valor(), '!=', this.true_lbl);
            generador_.add_goto(this.false_lbl);

            return retorno_;    
        }else{
            errores_.push(new nodoError("Semántico", "Operación relacional desconocida", this.linea_, this.columna_, "Desconocido"));
            return;
        }
    }

}