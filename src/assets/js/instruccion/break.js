import { instruccion } from '../abstract/instruccion';
export class break_ extends instruccion {
    constructor(linea, columna) {
        super(linea, columna);
    }
    ejecutar(environment) {
        return {
            linea: this.linea,
            columna: this.columna,
            type: 'Break'
        };
    }
}
