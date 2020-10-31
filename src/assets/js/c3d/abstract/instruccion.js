import { tipos_dato } from '../tools/tipo';
export class instruccion_c3d {
    constructor(linea_, columna_) {
        this.linea_ = linea_;
        this.columna_ = columna_;
    }
    mismo_tipo(t1, t2) {
        if (t1.tipo == t2.tipo) {
            if (t1.tipo == tipos_dato.TYPES) {
                return t1.id_tipo.toLocaleLowerCase() === t2.id_tipo.toLocaleLowerCase();
            }
            return true;
        }
        else if (t1.tipo == tipos_dato.TYPES || t2.tipo == tipos_dato.TYPES) {
            if (t1.tipo == tipos_dato.NULL || t2.tipo == tipos_dato.NULL) {
                return true;
            }
        }
        else {
            return false;
        }
    }
}
