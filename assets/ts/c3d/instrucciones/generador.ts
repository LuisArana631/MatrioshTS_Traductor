
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

    public crear_encabezado():string{
        let encabezado = "#include <stdio.h>\n";
        encabezado += "#include <math.h>\n";
        encabezado += "double heap[16384];\n";
        encabezado += "double stack[16384];\n";
        encabezado += "double p = 0;\n";
        encabezado += "double h = 0;\n";
        if(this.temporal_contador > 0){
            let texto_ = "double "
            for(let i=0; i<this.temporal_contador; i++){
                if(i>0){
                    texto_ += ", t" + i;
                }else{
                    texto_ += "t" + i;
                }                
            }
            encabezado += texto_ + ";\n";
        }         
        return encabezado;       
    }

    public print_(tipo_:string, valor:string){
        if(valor.charCodeAt(0) != 116){
            this.codigo_.push(`${this.es_funcion}printf("%${tipo_}", ${valor});`);
        }else{
            if(tipo_ === "d"){
                this.codigo_.push(`${this.es_funcion}printf("%${tipo_}",(int) ${valor});`);
            }else if(tipo_ === "f"){
                this.codigo_.push(`${this.es_funcion}printf("%${tipo_}",(float) ${valor});`);
            }else{
                this.codigo_.push(`${this.es_funcion}printf("%${tipo_}",(char) ${valor});`);
            }            
        }        
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
        this.codigo_.push(`${this.es_funcion}${target_} = heap[(int) ${index}];`);
    }

    public add_set_heap(valor_:any, index:any){
        this.codigo_.push(`${this.es_funcion}heap[(int) ${index}] = ${valor_};`);
    }

    public add_get_stack(target_:any, index:any){
        this.codigo_.push(`${this.es_funcion}${target_} = stack[(int) ${index}];`);
    }

    public add_set_stack(valor_:any, index:any){
        this.codigo_.push(`${this.es_funcion}stack[(int) ${index}] = ${valor_};`);
    }

    public add_call(id_:string){
        this.codigo_.push(`${this.es_funcion}${id_}();`);
    }

    public add_void(id_:string){
        this.codigo_.push(`void ${id_}(){`);
        this.es_funcion = "     ";
    }

    public add_end_void(){        
        this.codigo_.push(`${this.es_funcion}return;\n}`);
        this.es_funcion = "";
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