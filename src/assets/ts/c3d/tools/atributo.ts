import { tipos_ } from './tipo';

export class atributo{
    id_: string;
    tipo_: tipos_;

    constructor(id_:string, tipo_:tipos_){
        this.id_ = id_;
        this.tipo_ = tipo_;
    }

}