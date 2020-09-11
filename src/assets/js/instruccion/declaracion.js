import { instruccion } from '../abstract/instruccion';
export class declaracion extends instruccion {
    constructor(id, valor, linea, columna) {
        super(linea, columna);
        this._id = id;
        this._valor = valor;
    }
    ejecutar(ambiente_) {
        let valor;
        if (this._valor) {
            valor = this._valor.ejecutar(ambiente_);
        }
        else {
            valor = {
                valor: "",
                tipo: 4
            };
        }
        ambiente_.guardar_variable(this._id, valor.valor, valor.tipo);
    }
}
