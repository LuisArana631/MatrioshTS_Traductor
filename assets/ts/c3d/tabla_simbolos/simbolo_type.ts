import { atributo } from '../tools/atributo';

export class simbolo_atributo{
    id_:string;
    size_: number;
    atributos_: Array<atributo>;

    constructor(id_:string, size_:number, atributos_:Array<atributo>){
        this.id_ = id_;
        this.size_ = size_;
        this.atributos_ = atributos_;
    }

    get_atributo(id_: string):any{
        for(let i=0; i<this.atributos_.length; i++){
            const valor = this.atributos_[i];
            if(valor.id_ = id_){
                return {
                    index: i,
                    valor: valor
                }
            }
        }

        return {
            index: -1,
            valor: null
        }
    }
}