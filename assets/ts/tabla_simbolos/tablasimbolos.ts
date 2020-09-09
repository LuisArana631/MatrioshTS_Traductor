import { nodoSimbolo } from './nodosimbolo';

class tabla_simbolos extends Array<nodoSimbolo>{
    constructor(){
        super();
    }

    public static get_var(id:string):nodoSimbolo{
        this.prototype.forEach(nodo => {
            if(nodo.Id === id){
                return nodo;
            }
        });

        return undefined;
    }

    public static update_var(id:string, valor:any){
        this.prototype.forEach(nodo => {
            if(nodo.Id === id){
                nodo.Valor = valor;
            }
        });
    }

    public static push_simbolo(nodo:nodoSimbolo){
        this.prototype.push(nodo);
    }

    public static clear(){
        while(this.prototype.length > 0){
            this.prototype.pop();
        }
    }

    public static get_simbolos():Array<nodoSimbolo>{
        let array_return:Array<nodoSimbolo> = new Array;

        this.prototype.forEach(nodo => {
            array_return.push(nodo);
        });

        return array_return;
    }
}

export {tabla_simbolos};