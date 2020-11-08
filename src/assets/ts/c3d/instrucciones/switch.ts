import { instruccion_c3d } from '../abstract/instruccion';
import { ambiente_c3d } from '../tabla_simbolos/ambiente';
import { generador } from './generador';
import { nodoError } from '../../error/error';
import { expresion_c3d } from '../abstract/expresion';
import { case_c3d } from './case';
import { oper_rel, relacionales } from '../logicas/relacional';

export class switch_c3d extends instruccion_c3d{
    constructor(private exp_:expresion_c3d, private cases:Array<any>, linea_:number, columna_:number){
        super(linea_, columna_);
    }

    public traducir(env_:ambiente_c3d, generador_:generador, errores_:Array<nodoError>){
        try{
            let fin_ = generador_.new_label();
            let ctr_default = generador_.new_label();
            let inicio_ = generador_.new_label();

            env_.break_ = fin_;
            env_.continue_ = inicio_;

            let aux_default:string|undefined = "-1";

            let coincidir = generador_.new_temporal();
            let desactivar = generador_.new_temporal();

            generador_.free_temp(coincidir);
            generador_.free_temp(desactivar);

            let stack_bloques:Array<string> = new Array();
            let stack_label:Array<string> = new Array();

            generador_.add_label(inicio_);

            if(this.cases.length == 1){ //SOLO TENEMOS UN CASE
                let case_aux:case_c3d = this.cases[0].nodo;

                if(case_aux.condicion_ == null){    //DEFAULT
                    case_aux.traducir(env_, generador_, errores_);
                    generador_.add_goto(fin_);
                }else{
                    let lbl_exit = generador_.new_label();
                    let resultado_ = generador_.new_temporal();

                    generador_.free_temp(resultado_);

                    let expre_ = new relacionales(this.exp_, case_aux.condicion_, oper_rel.IGUAL, this.linea_, this.columna_);
                    let result = expre_.traducir(env_, generador_, errores_);

                    generador_.add_label(result.false_lbl);
                    generador_.add_code(`${resultado_} = 0;`);
                    generador_.add_goto(lbl_exit);

                    generador_.add_label(result.true_lbl);
                    generador_.add_code(`${resultado_} = 1;`);
                    generador_.add_goto(lbl_exit);

                    generador_.add_label(lbl_exit);
                    generador_.add_if(resultado_, "0", "==", fin_);
                    case_aux.traducir(env_, generador_, errores_);
                    generador_.add_goto(fin_);
                }
            }else{
                generador_.add_code(`${ coincidir } = 0;`);
                generador_.add_code(`${ desactivar } = 0;`);

                for(let i=0; i<this.cases.length; i++){
                    let aux_case:case_c3d = this.cases[i].nodo;

                    if(i == 0){ //PRIMER CASE
                        if(aux_case.condicion_ == null){    //DEFAULT
                            aux_default = generador_.new_label();
                            let next_true = generador_.new_label();
                            let next_false = generador_.new_label();

                            stack_label.push(next_false);
                            stack_bloques.push(next_true);

                            generador_.add_goto(next_false);
                            generador_.add_label(aux_default);
                            aux_case.traducir(env_, generador_, errores_);
                            generador_.add_goto(fin_);
                        }else{
                            let lbl_exit = generador_.new_label();
                            let resultado_ = generador_.new_temporal();

                            generador_.free_temp(resultado_);

                            let expre_ = new relacionales(this.exp_, aux_case.condicion_, oper_rel.IGUAL, this.linea_, this.columna_);
                            let result = expre_.traducir(env_, generador_, errores_);   

                            generador_.add_label(result.false_lbl);
                            generador_.add_code(`${resultado_} = 0;`);
                            generador_.add_goto(lbl_exit);

                            generador_.add_label(result.true_lbl);
                            generador_.add_code(`${resultado_} = 1;`);
                            generador_.add_goto(lbl_exit);

                            let next_true = generador_.new_label();
                            let next_false = generador_.new_label();

                            stack_label.push(next_false);
                            stack_bloques.push(next_true);

                            generador_.add_label(lbl_exit);
                            generador_.add_if(resultado_, "0", "==", next_false);                            
                            generador_.add_code(`${coincidir} = 1;`);
                            aux_case.traducir(env_, generador_, errores_);
                            generador_.add_goto(next_false);
                        }
                    }else if(i+1 == this.cases.length){ //ULTIMO CASE
                        let next_false = stack_label.pop();
                        let next_true = stack_bloques.pop();

                        generador_.add_label(next_false);
                        generador_.add_if(coincidir, "1", "==", next_true);

                        if(aux_case.condicion_ != null){
                            let lbl_exit = generador_.new_label();
                            let resultado_ = generador_.new_temporal();

                            generador_.free_temp(resultado_);

                            let expres_ = new relacionales(this.exp_, aux_case.condicion_, oper_rel.IGUAL, this.exp_.linea_, this.exp_.columna_);
                            let result = expres_.traducir(env_, generador_, errores_);

                            generador_.add_label(result.false_lbl);
                            generador_.add_code(`${resultado_} = 0;`);
                            generador_.add_goto(lbl_exit);

                            generador_.add_label(result.true_lbl);
                            generador_.add_code(`${resultado_} = 1;`);
                            generador_.add_goto(lbl_exit);

                            generador_.add_label(lbl_exit);
                            generador_.add_if(resultado_, "0", "==", ctr_default);
                        }else{
                            aux_default = next_true;
                            generador_.add_goto(next_true);
                        }

                        generador_.add_label(next_true);
                        aux_case.traducir(env_, generador_, errores_);
                        generador_.add_goto(fin_);
                    }else{  //CASE INTERMEDIO
                        let next_false = stack_label.pop();
                        let next_true = stack_bloques.pop();

                        let new_next_false = generador_.new_label();
                        let new_next_true = generador_.new_label();

                        stack_label.push(new_next_false);
                        stack_bloques.push(new_next_true);

                        generador_.add_label(next_false);
                        generador_.add_if(coincidir, "1", "==", next_true);
                        if(aux_case.condicion_ !=null){
                            let lbl_exit = generador_.new_label();
                            let resultado_ = generador_.new_temporal();

                            generador_.free_temp(resultado_);

                            let expres_ = new relacionales(this.exp_, aux_case.condicion_, oper_rel.IGUAL, this.exp_.linea_, this.exp_.columna_);
                            let result = expres_.traducir(env_, generador_, errores_);

                            generador_.add_label(result.false_lbl);
                            generador_.add_code(`${resultado_} = 0;`);
                            generador_.add_goto(lbl_exit);

                            generador_.add_label(result.true_lbl);
                            generador_.add_code(`${resultado_} = 1;`);
                            generador_.add_goto(lbl_exit);

                            generador_.add_label(lbl_exit);
                            generador_.add_if(resultado_, "0", "==", new_next_false);
                            generador_.add_code(`${coincidir} = 1;`);
                        }else{
                            aux_default = next_true;
                            generador_.add_goto(new_next_false);
                        }

                        generador_.add_label(next_true);
                        aux_case.traducir(env_, generador_, errores_);

                        if(aux_case.condicion_ == null){
                            generador_.add_if(desactivar, "1", "==", fin_);
                            generador_.add_goto(new_next_false);
                        }else{
                            generador_.add_goto(new_next_false);
                        }
                    }
                }
            }
            generador_.add_label(ctr_default);
            if(aux_default?.localeCompare("-1") == 1){
                generador_.add_code(`${desactivar} = 1;`);
                generador_.add_goto(aux_default);
            }else{
                generador_.add_goto(fin_);
            }
            generador_.add_label(fin_);
        }catch(error){
            errores_.push(new nodoError("Semántico", error, this.linea_, this.columna_, "Error en switch"));
        }
    }
}