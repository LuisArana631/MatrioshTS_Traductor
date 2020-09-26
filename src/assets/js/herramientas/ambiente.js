import { simbolo } from '../herramientas/simbolo';
export class ambiente {
    constructor(prev) {
        this.prev = prev;
        this._variables = new Map();
        this._funciones = new Map();
    }
    guardar_function(id, funcion) {
        this._funciones.set(id, funcion);
    }
    guardar_variable(id, valor, tipo, tipostr, linea, columna, permiso) {
        let enviroment = this;
        while (enviroment != null) {
            if (enviroment._variables.has(id)) {
                enviroment._variables.set(id, new simbolo(valor, id, tipo, tipostr, linea, columna, permiso));
                return;
            }
            enviroment = enviroment.prev;
        }
        this._variables.set(id, new simbolo(valor, id, tipo, tipostr, linea, columna, permiso));
    }
    get_function(id) {
        let env = this;
        while (env != null) {
            if (env._funciones.has(id)) {
                return env._funciones.get(id);
            }
            env = env.prev;
        }
        return undefined;
    }
    get_variable(id) {
        let enviroment = this;
        while (enviroment != null) {
            if (enviroment._variables.has(id)) {
                return enviroment._variables.get(id);
            }
            enviroment = enviroment.prev;
        }
        return null;
    }
    get_padre(id) {
        let enviroment = this;
        let padre;
        while (enviroment != null) {
            if (enviroment._variables.has(id)) {
                console.log(enviroment);
                //padre = enviroment;
                return null;
            }
            enviroment = enviroment.prev;
        }
        return null;
    }
    update_variable(id, valor) {
        let environment = this;
        while (environment != null) {
            if (environment._variables.has(id)) {
                let aux_var = environment._variables.get(id);
                aux_var.valor = valor;
            }
            environment = environment.prev;
        }
    }
    get_funciones() {
        let env = this;
        return env._funciones.values();
    }
    get_variables() {
        let enviroment = this;
        this.get_padre("x");
        return enviroment._variables.values();
    }
    get_global() {
        let enviroment = this;
        while ((enviroment === null || enviroment === void 0 ? void 0 : enviroment.prev) != null) {
            enviroment = enviroment.prev;
        }
        return enviroment;
    }
}
