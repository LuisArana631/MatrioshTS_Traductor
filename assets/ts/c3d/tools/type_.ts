import { tipos_dato, tipos_ } from "../tools/tipo";

export class types_ extends tipos_{
    atributos_ : Map<string, any>
    size: number;

    constructor(id_:string, atributos: Map<string, any>){
        super(tipos_dato.TYPES, id_);
        this.atributos_ = atributos;
        this.size = this.atributos_.size;
    }
}