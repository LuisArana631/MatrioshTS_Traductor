export class simbolo_atributo {
    constructor(id_, size_, atributos_) {
        this.id_ = id_;
        this.size_ = size_;
        this.atributos_ = atributos_;
    }
    get_atributo(id_) {
        for (let i = 0; i < this.atributos_.length; i++) {
            const valor = this.atributos_[i];
            if (valor.id_ = id_) {
                return {
                    index: i,
                    valor: valor
                };
            }
        }
        return {
            index: -1,
            valor: null
        };
    }
}
