import { tipos_dato, tipos_ } from "../tools/tipo";
export class types_ extends tipos_ {
    constructor(id_, atributos) {
        super(tipos_dato.TYPES, id_);
        this.atributos_ = atributos;
        this.size = this.atributos_.size;
    }
}
