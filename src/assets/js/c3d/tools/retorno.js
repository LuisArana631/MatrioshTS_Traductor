import { generador } from '../instrucciones/generador';
export class retorno {
    constructor(valor_, temp_, tipo_, simbolo_ = null) {
        this.valor_ = valor_;
        this.temp_ = temp_;
        this.tipo_ = tipo_;
        this.simbolo_ = simbolo_;
        this.false_lbl = this.true_lbl = "";
    }
    get_valor() {
        generador.get_instance().free_temp(this.valor_);
        return this.valor_;
    }
}
