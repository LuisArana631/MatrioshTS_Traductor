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
        gen_.add_void("print_str");
        
    }
}