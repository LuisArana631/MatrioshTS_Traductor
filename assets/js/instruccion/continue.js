import { instruccion } from '../abstract/instruccion';
export class continue_ extends instruccion {
    constructor(linea, columna) {
        super(linea, columna);
    }
    ejecutar(environment) {
        return {
            linea: this.linea,
            columna: this.columna,
            type: 'Continue'
        };
    }
}
