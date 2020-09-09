class tabla_simbolos extends Array {
    constructor() {
        super();
    }
    static get_var(id) {
        this.prototype.forEach(nodo => {
            if (nodo.Id === id) {
                return nodo;
            }
        });
        return undefined;
    }
    static update_var(id, valor) {
        this.prototype.forEach(nodo => {
            if (nodo.Id === id) {
                nodo.Valor = valor;
            }
        });
    }
    static push_simbolo(nodo) {
        this.prototype.push(nodo);
    }
    static clear() {
        while (this.prototype.length > 0) {
            this.prototype.pop();
        }
    }
    static get_simbolos() {
        let array_return = new Array;
        this.prototype.forEach(nodo => {
            array_return.push(nodo);
        });
        return array_return;
    }
}
export { tabla_simbolos };
