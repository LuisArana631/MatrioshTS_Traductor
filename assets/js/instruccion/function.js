import { instruccion } from '../abstract/instruccion';
export class function_ extends instruccion {
    constructor(id, instrucciones, parametros, linea, columna, tipo) {
        super(linea, columna);
        this.id = id;
        this.instrucciones = instrucciones;
        this.parametros = parametros;
        this.tipo = tipo;
    }
    ejecutar(environment) {
        environment.guardar_function(this.id, this);
    }
}
