import { nodoError } from './error';

class errores extends Array<nodoError>{
    constructor(){
        super();
    }

    public static addError(error:nodoError){
        this.prototype.push(error);
    }

    public static clear(){
        while(this.prototype.length > 0){
            this.prototype.pop();
        }
    }

    public static getErrores():Array<nodoError>{
        var array_return:Array<nodoError> = new Array;

        this.prototype.forEach(er => {
            array_return.push(er);
        });
        return array_return;
    }
}

export {errores};