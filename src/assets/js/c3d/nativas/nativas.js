import { generador } from '../instrucciones/generador';
export class nativas_ {
    print_true() {
        let gen_ = generador.get_instance();
        gen_.add_void("print_true");
        gen_.print_("c", "116");
        gen_.print_("c", "114");
        gen_.print_("c", "117");
        gen_.print_("c", "101");
        gen_.add_end_void();
    }
    print_false() {
        let gen_ = generador.get_instance();
        gen_.add_void("print_false");
        gen_.print_("c", "102");
        gen_.print_("c", "97");
        gen_.print_("c", "108");
        gen_.print_("c", "115");
        gen_.print_("c", "101");
        gen_.add_end_void();
    }
    print_str() {
        let gen_ = generador.get_instance();
        let index_aux = gen_.new_temporal();
        let mov_heap = gen_.new_temporal();
        let char_val = gen_.new_temporal();
        let while_ = gen_.new_label();
        let true_cond = gen_.new_label();
        let false_cond = gen_.new_label();
        gen_.add_void("print_str");
        gen_.add_expresion(index_aux, "p", "1", "+");
        gen_.add_get_stack(mov_heap, index_aux);
        gen_.add_label(while_);
        gen_.add_get_heap(char_val, mov_heap);
        gen_.add_if(char_val, '-1', '==', true_cond);
        gen_.add_goto(false_cond);
        gen_.add_label(true_cond);
        gen_.print_("c", char_val);
        gen_.add_expresion(mov_heap, mov_heap, '1', '+');
        gen_.add_goto(while_);
        gen_.add_label(false_cond);
        gen_.add_end_void();
    }
    concat_str() {
        let gen_ = generador.get_instance();
        gen_.add_void("concat_str");
        gen_.add_end_void();
    }
}
