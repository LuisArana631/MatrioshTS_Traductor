
export class generador{
    private static generador_: generador;
    private temporal_contador: number;
    private label_: number;
    private codigo_: string[];
    private temp_strg: Set<string>;
    es_funcion = "";
    
    private constructor(){
        this.temporal_contador = this.label_ = 0;
        this.codigo_ = new Array();
        this.temp_strg = new Set();
    }

    public static get_instance(){
        return this.generador_ || (this.generador_ = new this());
    }

    public crear_encabezado(){
        this.codigo_.push("#include <stdio.h>");
        this.codigo_.push("float heap[16384];");
        this.codigo_.push("float stack[16384];");
        this.codigo_.push("float p = 0;");
        this.codigo_.push("float h = 0;");
    }

    public print_(tipo_:string, valor:string){
        this.codigo_.push(`printf("%${tipo_}", ${valor});`);
    }

    public get_temporales(){
        return this.temp_strg;
    }

    public limpiar_temporales(){
        this.temp_strg.clear();
    }

    public set_temporales(temp_storage: Set<string>){
        this.temp_strg = temp_storage;
    }

    public limpiar_c3d(){
        this.temporal_contador = this.label_ = 0;
        this.codigo_ = new Array();
        this.temp_strg = new Set();
    }

    public add_code(codigo_: string){
        this.codigo_.push(this.es_funcion + codigo_);
    }

    public get_code():string{
        return this.codigo_.join('\n');
    }

    public new_temporal():string{
        const temp = 't' + this.temporal_contador++;
        this.temp_strg.add(temp);
        return temp;
    }

    public new_label():string{
        return 'L' + this.label_++;
    }

    public add_label(label:string){
        this.codigo_.push(`${this.es_funcion}${label}:`);
    }

    public add_expresion(target:string, left_oper:any, right_oper:any = '', operador_:string = ''){
        this.codigo_.push(`${this.es_funcion}${target} = ${left_oper} ${operador_} ${right_oper};`);
    }

    public add_goto(label:string){
        this.codigo_.push(`${this.es_funcion}goto ${label};`);
    }

    public add_if(left_oper:any, right_oper:any, operador:string, label:string){
        this.codigo_.push(`${this.es_funcion}if (${left_oper} ${operador} ${right_oper}) goto ${label};`);
    }

    public next_heap(){
        this.codigo_.push(this.es_funcion + "h = h + 1;");
    }

    public next_stack(size_:number){
        this.codigo_.push(`${this.es_funcion}p = p + ${size_};`);
    }

    public prev_stack(size_:number){
        this.codigo_.push(`${this.es_funcion}p = p - ${size_};`);
    }

    public add_get_heap(target_:any, index:any){
        this.codigo_.push(`${this.es_funcion}${target_} = heap[${index}];`);
    }

    public add_set_heap(valor_:any, index:any){
        this.codigo_.push(`${this.es_funcion}heap[${index}] = ${valor_};`);
    }

    public add_get_stack(target_:any, index:any){
        this.codigo_.push(`${this.es_funcion}$[${target_}] = stack[${index}];`);
    }

    public add_set_stack(valor_:any, index:any){
        this.codigo_.push(`${this.es_funcion}stack[${index}] = ${valor_};`);
    }

    public add_call(id_:string){
        this.codigo_.push(`${this.es_funcion}call ${id_};`);
    }

    public add_void(id_:string){
        this.codigo_.push(`void ${id_}(){`);
        this.es_funcion = "     ";
    }

    public add_end_void(){
        this.es_funcion = "";
        this.codigo_.push(`}`);
    }

    public free_temp(temp_:string){
        if(this.temp_strg.has(temp_)){
            this.temp_strg.delete(temp_);
        }
    }

    public add_comentario(comment:string){
        this.codigo_.push(`${this.es_funcion}${comment}`)
    }

    public add_temp(temp_:string){
        if(!this.temp_strg.has(temp_)){
            this.temp_strg.add(temp_);
        }
    }
}