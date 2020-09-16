import { simbolo } from '../herramientas/simbolo';
export class ambiente {
    constructor(prev) {
        this.prev = prev;
        this._variables = new Map();
    }
    guardar_variable(id, valor, tipo, tipostr, linea, columna) {
        let enviroment = this;
        while (enviroment != null) {
            if (enviroment._variables.has(id)) {
                enviroment._variables.set(id, new simbolo(valor, id, tipo, tipostr, linea, columna));
                return;
            }
            enviroment = enviroment.prev;
        }
        this._variables.set(id, new simbolo(valor, id, tipo, tipostr, linea, columna));
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
    get_variables() {
        let enviroment = this;
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
