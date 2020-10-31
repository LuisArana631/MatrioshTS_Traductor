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
        this.codigo_.push("#include <stdio.h>");
        this.codigo_.push("float heap[16384];");
        this.codigo_.push("float stack[16384];");
        this.codigo_.push("float p = 0;");
        this.codigo_.push("float h = 0;");
    }
    print_(tipo_, valor) {
        this.codigo_.push(`printf("%${tipo_}", ${valor});`);
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
        this.codigo_.push(`${this.es_funcion}${target} = ${left_oper} ${operador_} ${right_oper};`);
    }
    add_goto(label) {
        this.codigo_.push(`${this.es_funcion}goto ${label};`);
    }
    add_if(left_oper, right_oper, operador, label) {
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
        this.codigo_.push(`${this.es_funcion}${target_} = heap[${index}];`);
    }
    add_set_heap(valor_, index) {
        this.codigo_.push(`${this.es_funcion}heap[${index}] = ${valor_};`);
    }
    add_get_stack(target_, index) {
        this.codigo_.push(`${this.es_funcion}$[${target_}] = stack[${index}];`);
    }
    add_set_stack(valor_, index) {
        this.codigo_.push(`${this.es_funcion}stack[${index}] = ${valor_};`);
    }
    add_call(id_) {
        this.codigo_.push(`${this.es_funcion}call ${id_};`);
    }
    add_void(id_) {
        this.codigo_.push(`void ${id_}(){`);
        this.es_funcion = "     ";
    }
    add_end_void() {
        this.es_funcion = "";
        this.codigo_.push(`}`);
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
}
