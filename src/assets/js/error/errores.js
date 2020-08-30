class errores extends Array {
    constructor() {
        super();
    }
    static addError(error) {
        this.prototype.push(error);
    }
    static clear() {
        while (this.prototype.length > 0) {
            this.prototype.pop();
        }
    }
    static getErrores() {
        var array_return = new Array;
        this.prototype.forEach(er => {
            array_return.push(er);
        });
        array_return.pop();
        return array_return;
    }
}
export { errores };
