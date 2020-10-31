import { tipos_ } from './tipo';
import { simbolo_c3d } from '../tabla_simbolos/simbolo';
import { generador } from '../instrucciones/generador';

export class retorno{
    private valor_: string;
    temp_: boolean;
    tipo_: tipos_;
    true_lbl: string;
    false_lbl: string;
    simbolo_: simbolo_c3d;
    data_:any;

    constructor(valor_:string, temp_:boolean, tipo_:tipos_, simbolo_:simbolo_c3d|null = null){
        this.valor_ = valor_;
        this.temp_ = temp_;
        this.tipo_ = tipo_;
        this.simbolo_ = simbolo_;
        this.false_lbl = this.true_lbl = "";
    }

    public get_valor(){
        generador.get_instance().free_temp(this.valor_);
        return this.valor_;
    }    
}