import { simbolo_atributo } from './simbolo_type';
import { simbolo_c3d } from './simbolo';
export class ambiente_c3d {
    constructor(anterior_ = null) {
        this.types_ = new Map();
        this.variables_ = new Map();
        this.prev_ = anterior_;
        this.size = (anterior_ === null || anterior_ === void 0 ? void 0 : anterior_.size) || 0;
        this.break_ = (anterior_ === null || anterior_ === void 0 ? void 0 : anterior_.break_) || null;
        this.continue_ = (anterior_ === null || anterior_ === void 0 ? void 0 : anterior_.continue_) || null;
        this.return_ = (anterior_ === null || anterior_ === void 0 ? void 0 : anterior_.return_) || null;
    }
    add_variable(rest_, id_, tipo_, const_, ref_, linea_, columna_) {
        id_ = id_.toLowerCase();
        if (this.variables_.get(id_) != undefined) {
            return null;
        }
        else {
            const new_variable = new simbolo_c3d(rest_, tipo_, id_, this.size++, const_, this.prev_ == null, ref_, linea_, columna_);
            this.variables_.set(id_, new_variable);
            return new_variable;
        }
    }
    add_types(id_, size_, params_) {
        if (this.types_.has(id_.toLocaleLowerCase())) {
            return false;
        }
        else {
            this.types_.set(id_.toLowerCase(), new simbolo_atributo(id_.toLowerCase(), size_, params_));
            return true;
        }
    }
    get_variable(id_) {
        let ambiente_ = this;
        id_ = id_.toLowerCase();
        while (ambiente_ != null) {
            const sym = ambiente_.variables_.get(id_);
            if (sym != undefined) {
                return sym;
            }
            ambiente_ = ambiente_.prev_;
        }
        return null;
    }
    get_variables() {
        let env_ = this;
        return env_.variables_.values();
    }
    existe_types(id_) {
        return this.types_.get(id_.toLowerCase());
    }
    look_types(id_) {
        let ambiente_ = this;
        id_ = id_.toLowerCase();
        while (ambiente_ != null) {
            const sym = ambiente_.types_.get(id_);
            if (sym != undefined) {
                return sym;
            }
            ambiente_ = ambiente_.prev_;
        }
        return null;
    }
}
