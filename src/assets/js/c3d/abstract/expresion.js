import { tipos } from '../../herramientas/tablatipos';
export class expresion_c3d {
    constructor(linea_, columna_) {
        this.true_lbl = this.false_lbl = "";
        this.linea_ = linea_;
        this.columna_ = columna_;
    }
    determinar_tipo(tipo_izq, tipo_der) {
        return tipos[tipo_izq][tipo_der];
    }
}
