export class generador {
    constructor() {
        this.es_funcion = "";
        this.temporal_contador = this.label_ = 0;
        this.codigo_ = new Array();
        this.temp_strg = new Set();
    }
    static get_instance() {
        return this.generador_ || (this.generador_ = new this());
    }
    crear_encabezado() {
        let encabezado = "#include <stdio.h>\n";
        encabezado += "#include <math.h>\n";
        encabezado += "double heap[16384];\n";
        encabezado += "double stack[16384];\n";
        encabezado += "double p = 0;\n";
        encabezado += "double h = 0;\n";
        if (this.temporal_contador > 0) {
            let texto_ = "double ";
            for (let i = 0; i < this.temporal_contador; i++) {
                if (i > 0) {
                    texto_ += ", t" + i;
                }
                else {
                    texto_ += "t" + i;
                }
            }
            encabezado += texto_ + ";\n";
        }
        return encabezado;
    }
    print_(tipo_, valor) {
        if (this.temp_strg.has(valor)) {
            this.temp_strg.delete(valor);
        }
        if (valor.charCodeAt(0) != 116) {
            this.codigo_.push(`${this.es_funcion}printf("%${tipo_}", ${valor});`);
        }
        else {
            if (tipo_ === "d") {
                this.codigo_.push(`${this.es_funcion}printf("%${tipo_}",(int) ${valor});`);
            }
            else if (tipo_ === "f") {
                this.codigo_.push(`${this.es_funcion}printf("%${tipo_}",(float) ${valor});`);
            }
            else {
                this.codigo_.push(`${this.es_funcion}printf("%${tipo_}",(char) ${valor});`);
            }
        }
    }
    get_temporales() {
        return this.temp_strg;
    }
    limpiar_temporales() {
        this.temp_strg.clear();
    }
    set_temporales(temp_storage) {
        this.temp_strg = temp_storage;
    }
    limpiar_c3d() {
        this.temporal_contador = this.label_ = 0;
        this.codigo_ = new Array();
        this.temp_strg = new Set();
    }
    add_code(codigo_) {
        this.codigo_.push(this.es_funcion + codigo_);
    }
    get_code() {
        return this.codigo_.join('\n');
    }
    new_temporal() {
        const temp = 't' + this.temporal_contador++;
        this.temp_strg.add(temp);
        return temp;
    }
    new_label() {
        return 'L' + this.label_++;
    }
    add_label(label) {
        this.codigo_.push(`${this.es_funcion}${label}:`);
    }
    add_expresion(target, left_oper, right_oper = '', operador_ = '') {
        if (this.temp_strg.has(left_oper)) {
            this.temp_strg.delete(left_oper);
        }
        if (this.temp_strg.has(right_oper)) {
            this.temp_strg.delete(right_oper);
        }
        this.codigo_.push(`${this.es_funcion}${target} = ${left_oper} ${operador_} ${right_oper};`);
    }
    add_goto(label) {
        this.codigo_.push(`${this.es_funcion}goto ${label};`);
    }
    add_if(left_oper, right_oper, operador, label) {
        if (this.temp_strg.has(left_oper)) {
            this.temp_strg.delete(left_oper);
        }
        if (this.temp_strg.has(right_oper)) {
            this.temp_strg.delete(right_oper);
        }
        this.codigo_.push(`${this.es_funcion}if (${left_oper} ${operador} ${right_oper}) goto ${label};`);
    }
    next_heap() {
        this.codigo_.push(this.es_funcion + "h = h + 1;");
    }
    next_stack(size_) {
        this.codigo_.push(`${this.es_funcion}p = p + ${size_};`);
    }
    prev_stack(size_) {
        this.codigo_.push(`${this.es_funcion}p = p - ${size_};`);
    }
    add_get_heap(target_, index) {
        if (this.temp_strg.has(index)) {
            this.temp_strg.delete(index);
        }
        if (this.temp_strg.has(target_)) {
            this.temp_strg.delete(target_);
        }
        this.codigo_.push(`${this.es_funcion}${target_} = heap[(int) ${index}];`);
    }
    add_set_heap(valor_, index) {
        if (this.temp_strg.has(index)) {
            this.temp_strg.delete(index);
        }
        if (this.temp_strg.has(valor_)) {
            this.temp_strg.delete(valor_);
        }
        this.codigo_.push(`${this.es_funcion}heap[(int) ${index}] = ${valor_};`);
    }
    add_get_stack(target_, index) {
        if (this.temp_strg.has(index)) {
            this.temp_strg.delete(index);
        }
        if (this.temp_strg.has(target_)) {
            this.temp_strg.delete(target_);
        }
        this.codigo_.push(`${this.es_funcion}${target_} = stack[(int) ${index}];`);
    }
    add_set_stack(valor_, index) {
        if (this.temp_strg.has(index)) {
            this.temp_strg.delete(index);
        }
        if (this.temp_strg.has(valor_)) {
            this.temp_strg.delete(valor_);
        }
        this.codigo_.push(`${this.es_funcion}stack[(int) ${index}] = ${valor_};`);
    }
    add_call(id_) {
        this.codigo_.push(`${this.es_funcion}${id_}();`);
    }
    add_void(id_) {
        this.codigo_.push(`void ${id_}(){`);
        this.es_funcion = "     ";
    }
    add_end_void() {
        this.codigo_.push(`${this.es_funcion}return;\n}`);
        this.es_funcion = "";
    }
    free_temp(temp_) {
        if (this.temp_strg.has(temp_)) {
            this.temp_strg.delete(temp_);
        }
    }
    add_comentario(comment) {
        this.codigo_.push(`${this.es_funcion}${comment}`);
    }
    add_temp(temp_) {
        if (!this.temp_strg.has(temp_)) {
            this.temp_strg.add(temp_);
        }
    }
    save_temps(env_) {
        if (this.temp_strg.size > 0) {
            const temp_ = this.new_temporal();
            this.free_temp(temp_);
            let size = 0;
            this.add_expresion(temp_, 'p', env_.size, '+');
            this.temp_strg.forEach((valor) => {
                size++;
                this.add_set_stack(temp_, valor);
                if (size != this.temp_strg.size) {
                    this.add_expresion(temp_, temp_, '1', '+');
                }
            });
        }
        let puntero = env_.size;
        env_.size = puntero + this.temp_strg.size;
        return puntero;
    }
    recover_temps(env_, pos) {
        if (this.temp_strg.size > 0) {
            const temp_ = this.new_temporal();
            this.free_temp(temp_);
            let size = 0;
            this.add_expresion(temp_, "p", pos, "+");
            this.temp_strg.forEach((valor) => {
                size++;
                this.add_get_stack(valor, temp_);
                if (size != this.temp_strg.size) {
                    this.add_expresion(temp_, temp_, "1", "+");
                }
            });
            env_.size = pos;
        }
    }
}
