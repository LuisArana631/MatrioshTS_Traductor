import { generador } from '../instrucciones/generador';

export class nativas_{
    public print_true(){
        let gen_ = generador.get_instance();
        gen_.add_void("print_true");
        gen_.print_("c", "116");
        gen_.print_("c", "114");
        gen_.print_("c", "117");
        gen_.print_("c", "101");
        gen_.add_end_void();
    }

    public print_false(){
        let gen_ = generador.get_instance();
        gen_.add_void("print_false");
        gen_.print_("c", "102");
        gen_.print_("c", "97");
        gen_.print_("c", "108");
        gen_.print_("c", "115");
        gen_.print_("c", "101");
        gen_.add_end_void();
    }   

    public print_str(){
        let gen_ = generador.get_instance();
        
        let index_aux = gen_.new_temporal();
        let mov_heap = gen_.new_temporal();
        let char_val = gen_.new_temporal();

        gen_.free_temp(index_aux);
        gen_.free_temp(mov_heap);
        gen_.free_temp(char_val);

        let while_ = gen_.new_label();
        let true_cond = gen_.new_label();
        let false_cond = gen_.new_label();

        gen_.add_void("print_str");      
        gen_.add_expresion(index_aux, "p", "1", "+");
        gen_.add_get_stack(mov_heap, index_aux);

        gen_.add_label(while_);
        gen_.add_get_heap(char_val, mov_heap);
        gen_.add_if(char_val, '-1', '!=',true_cond);
        gen_.add_goto(false_cond);

        gen_.add_label(true_cond);
        gen_.print_("c", char_val);
        gen_.add_expresion(mov_heap , mov_heap, '1', '+');
        gen_.add_goto(while_);

        gen_.add_label(false_cond);
        gen_.add_end_void();
    }

    public compare_str(){
        let gen_ = generador.get_instance();

        let var_1_index = gen_.new_temporal();
        let var_2_index = gen_.new_temporal();
        let aux_index = gen_.new_temporal();
        let temp_1 = gen_.new_temporal();
        let temp_2 = gen_.new_temporal();

        gen_.free_temp(var_1_index);
        gen_.free_temp(var_2_index);
        gen_.free_temp(aux_index);
        gen_.free_temp(temp_1);
        gen_.free_temp(temp_2);

        let lbl_loop = gen_.new_label();
        let lbl_true2 = gen_.new_label();
        let lbl_false2 = gen_.new_label();
        let lbl_true = gen_.new_label();
        let lbl_false = gen_.new_label();

        gen_.add_void("compare_str");
        gen_.add_expresion(aux_index, "p", "1", "+");
        gen_.add_get_stack(var_1_index, aux_index);
        gen_.add_expresion(aux_index, aux_index, '1', '+');
        gen_.add_get_stack(var_2_index, aux_index);

        gen_.add_label(lbl_loop);
        gen_.add_get_heap(temp_1, var_1_index);
        gen_.add_get_heap(temp_2, var_2_index);
        
        gen_.add_if(temp_1, temp_2, '!=', lbl_true);
        gen_.add_goto(lbl_false);

        gen_.add_label(lbl_true);
        gen_.add_set_stack('1', 'p');
        gen_.add_goto(lbl_false2);

        gen_.add_label(lbl_false);
        gen_.add_expresion(var_1_index, var_1_index, '1', '+');
        gen_.add_expresion(var_2_index, var_2_index, '1', '+');
        gen_.add_if(temp_1, temp_2, "==", lbl_true2);
        gen_.add_goto(lbl_loop);

        gen_.add_label(lbl_true2);
        gen_.add_set_stack('0', 'p');
        gen_.add_goto(lbl_false2);

        gen_.add_label(lbl_false2);
        gen_.add_end_void();
    }

    public concat_str(){
        let gen_ = generador.get_instance();

        let var_1_index = gen_.new_temporal();
        let var_2_index = gen_.new_temporal();
        let aux_index = gen_.new_temporal();
        let puntero_ = gen_.new_temporal();
        let temp_ = gen_.new_temporal();

        gen_.free_temp(var_1_index);
        gen_.free_temp(var_2_index);
        gen_.free_temp(aux_index);
        gen_.free_temp(puntero_);
        gen_.free_temp(temp_);

        let lbl_loop = gen_.new_label();
        let lbl_true = gen_.new_label();
        let lbl_false = gen_.new_label();
        let lbl_false2 = gen_.new_label();
        let lbl_endloop = gen_.new_label();
        
        gen_.add_void("concat_str");
        gen_.add_expresion(aux_index, "p", "1", "+");
        gen_.add_get_stack(var_1_index, aux_index);
        gen_.add_expresion(aux_index, aux_index, '1', '+');
        gen_.add_get_stack(var_2_index, aux_index);

        gen_.add_code(`${puntero_} = h;`);
        gen_.add_label(lbl_loop);
        gen_.add_get_heap(temp_, var_1_index);
        gen_.add_if(temp_, "-1", "==", lbl_true);
        gen_.add_goto(lbl_false);
        
        gen_.add_label(lbl_false);
        gen_.add_set_heap(temp_, 'h');
        gen_.next_heap();
        gen_.add_expresion(var_1_index, var_1_index, "1", "+");
        gen_.add_goto(lbl_loop);

        gen_.add_label(lbl_true);
        gen_.add_get_heap(temp_, var_2_index);
        gen_.add_if(temp_, "-1", "==",lbl_endloop);
        gen_.add_goto(lbl_false2);

        gen_.add_label(lbl_false2);
        gen_.add_set_heap(temp_, "h");
        gen_.next_heap();
        gen_.add_expresion(var_2_index, var_2_index, "1", "+");
        gen_.add_goto(lbl_true);

        gen_.add_label(lbl_endloop);
        gen_.add_set_heap("-1", "h");
        gen_.next_heap();
        gen_.add_set_stack(puntero_, "p");
        gen_.add_end_void();
    }

    public int_toStr(){
        let gen_ = generador.get_instance();

        let var_1 = gen_.new_temporal();
        let var_2 = gen_.new_temporal();
        let index = gen_.new_temporal();
        let aux_1 = gen_.new_temporal();
        let aux_2 = gen_.new_temporal();
        let aux_3 = gen_.new_temporal();
        let aux_4 = gen_.new_temporal();
        let aux_5 = gen_.new_temporal();
        let ret_ = gen_.new_temporal();
        
        gen_.free_temp(index);
        gen_.free_temp(var_1);
        gen_.free_temp(var_2);
        gen_.free_temp(aux_1);
        gen_.free_temp(aux_2);
        gen_.free_temp(aux_3);
        gen_.free_temp(aux_4);
        gen_.free_temp(aux_5);
        gen_.free_temp(ret_);

        let lbl_true = gen_.new_label();
        let lbl_false = gen_.new_label();
        let lbl_true2 = gen_.new_label();
        let lbl_false2 = gen_.new_label();
        let lbl_true3 = gen_.new_label();
        let lbl_false3 = gen_.new_label();        
        let lbl_escape = gen_.new_label();
        let aux_lbl = gen_.new_label();

        gen_.add_void("num_toStr");
        gen_.add_expresion(index, "p", "1", "+");
        gen_.add_get_stack(var_1, index);
        gen_.add_code(`${var_2} = h;`);
        gen_.add_if(var_1, "0", "==", lbl_true);
        gen_.add_goto(lbl_false);

        gen_.add_label(lbl_true);
        gen_.add_set_heap("48", "h");
        gen_.next_heap();
        gen_.add_goto(lbl_escape);

        gen_.add_label(lbl_false);
        gen_.add_code(`${aux_1} = 10;`);
        gen_.add_if(var_1, "0", ">", lbl_true2);
        gen_.add_goto(lbl_false2);

        gen_.add_label(lbl_true2);
        gen_.add_expresion(aux_2, var_1, aux_1, "/");
        gen_.add_if(var_1, "1", "<", lbl_true3);
        gen_.add_goto(lbl_false3);

        gen_.add_label(lbl_false2);
        gen_.add_set_heap("45", "h");
        gen_.next_heap();
        gen_.add_expresion(var_1, var_1, "-1", "*");
        gen_.add_goto(lbl_true2);

        gen_.add_label(lbl_true3);
        gen_.add_expresion(aux_1, aux_1, "10", "/");
        gen_.add_goto(aux_lbl);

        gen_.add_label(lbl_false3);
        gen_.add_expresion(aux_1, aux_1, "10", "*");
        gen_.add_goto(lbl_true2);

        gen_.add_label(aux_lbl);
        gen_.add_expresion(aux_2, var_1, aux_1, "/");
        gen_.add_code(`${aux_3} = fmod(${aux_2}, 1);`);
        gen_.add_expresion(aux_4, aux_2, aux_3, "-");
        gen_.add_expresion(aux_5, aux_4, aux_1, "*");
        gen_.add_expresion(var_1, var_1, aux_5, "-");
        gen_.add_expresion(ret_, "p", "1", "+");
        gen_.add_set_stack(aux_4, ret_);
        gen_.add_call("num_toChar");
        gen_.add_get_stack(ret_, "p");
        gen_.add_set_heap(ret_, "h");
        gen_.next_heap();
        gen_.add_if(aux_1, "1", "==", lbl_escape);
        gen_.add_expresion(aux_1, aux_1, "10", "/");
        gen_.add_goto(aux_lbl);

        gen_.add_label(lbl_escape);
        gen_.add_set_heap("-1", "h");
        gen_.next_heap();
        gen_.add_set_stack(var_2, "p");

        gen_.add_end_void();
    }

    public dec_toStr(){

    }

    public int_toChar(){
        let gen_ = generador.get_instance();

        let temp1 = gen_.new_temporal();
        let index = gen_.new_temporal();

        gen_.free_temp(temp1);
        gen_.free_temp(index);

        let lbltrue = gen_.new_label();
        let lblescape = gen_.new_label();
        let lblnext = gen_.new_label();

        gen_.add_void("num_toChar");
        gen_.add_expresion(index, "p", "1", "+");
        gen_.add_get_stack(temp1, index);
        
        for(let i=0; i<10; i++){
            if(i!=0){
                if(i!=9){
                    gen_.add_label(lblnext);
                    lblnext = gen_.new_label();
                    gen_.add_if(temp1, i, "!=", lblnext);
                }else{
                    gen_.add_label(lblnext);
                    gen_.add_if(temp1, i, "!=", lbltrue);
                }
            }else{
                gen_.add_if(temp1, i, "!=", lblnext);
            }
            gen_.add_code(`${temp1} = ${i + 48};`);
            gen_.add_goto(lblescape);
        }

        gen_.add_label(lbltrue);
        gen_.add_code(`${temp1} = ${48};`);
        gen_.add_label(lblescape);
        gen_.add_set_stack(temp1, "p");
        gen_.add_end_void();
    }

    public bool_toStr(){
        let gen_ = generador.get_instance();

        let index = gen_.new_temporal();
        let temp_1 = gen_.new_temporal();
        let temp_2 = gen_.new_temporal();

        gen_.free_temp(index);
        gen_.free_temp(temp_1);
        gen_.free_temp(temp_2);

        let lbl_true = gen_.new_label();
        let lbl_false = gen_.new_label();
        let lbl_end = gen_.new_label();

        gen_.add_void("bool_toStr");
        gen_.add_expresion(index, "p", "1", "+");
        gen_.add_get_stack(temp_1, index);
        gen_.add_code(`${temp_2} = h;`);
        gen_.add_if(temp_1, "1", "==", lbl_true);
        gen_.add_goto(lbl_false);

        gen_.add_label(lbl_true);
        gen_.add_set_heap("116", "h");
        gen_.next_heap();
        gen_.add_set_heap("114", "h");
        gen_.next_heap();
        gen_.add_set_heap("117", "h");
        gen_.next_heap();
        gen_.add_set_heap("101", "h");
        gen_.next_heap();
        gen_.add_goto(lbl_end);

        gen_.add_label(lbl_false);
        gen_.add_set_heap("102", "h");
        gen_.next_heap();
        gen_.add_set_heap("97", "h");
        gen_.next_heap();
        gen_.add_set_heap("108", "h");
        gen_.next_heap();
        gen_.add_set_heap("115", "h");
        gen_.next_heap();
        gen_.add_set_heap("101", "h");
        gen_.next_heap();
        gen_.add_goto(lbl_end);

        gen_.add_label(lbl_end);
        gen_.add_set_heap("-1", "h");
        gen_.next_heap();
        gen_.add_set_stack("p", "h");
        gen_.add_end_void();
    }

    public potencia_(){
        let gen_ = generador.get_instance();

        gen_.add_void("potencia_");

        gen_.add_end_void();
    }
}