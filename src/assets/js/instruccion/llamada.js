import { instruccion } from '../abstract/instruccion';
import { ambiente } from '../herramientas/ambiente';
export class llamada_ extends instruccion {
    constructor(id, parametros, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.parametros = parametros;
    }
    ejecutar(environmet) {
        const f = environmet.get_function(this.id);
        if (f != undefined) {
            const new_env = new ambiente(environmet.get_global());
            for (let i = 0; i < this.parametros.length; i++) {
                const valor = this.parametros[i].nodo.ejecutar(environmet);
                new_env.guardar_variable(f.parametros[i].id, valor.valor, valor.tipo, f.parametros[i].tipo, f.linea, f.columna, 1);
            }
            let str_salida = f.instrucciones.ejecutar(new_env, 5);
            return str_salida;
        }
    }
}
