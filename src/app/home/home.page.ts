import { Component } from '@angular/core';

import { errores }  from '../../assets/js/error/errores'
import { nodoError }  from '../../assets/js/error/error';

import { tabla_simbolos } from '../../assets/js/tabla_simbolos/tablasimbolos';
import { nodoSimbolo } from '../../assets/js/tabla_simbolos/nodosimbolo';

import { ambiente } from '../../assets/js/herramientas/ambiente';
import * as analizador from '../../assets/jison/traduccion';
import * as ejecutar_code from '../../assets/jison/ejecutar';
import * as traductor_c3d from '../../assets/jison/c3d';

import { graphviz } from 'd3-graphviz';
import { wasmFolder } from '@hpcc-js/wasm';
import { ambiente_c3d } from '../../assets/ts/c3d/tabla_simbolos/ambiente';
import { types_ } from '../../assets/ts/c3d/tools/type_';
import { generador } from '../../assets/ts/c3d/instrucciones/generador';
import { nativas_ } from '../../assets/ts/c3d/nativas/nativas';

//GRAFICOS
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {  
  //LISTA ERRORES
  listaErrores:nodoError[] = [];
  listaSimbolos:nodoSimbolo[] = [];
  listaFuncionesEjecutar:any[] = new Array;
  listaSimbolosEjecutar:any[] = new Array;
  listaSimbolosC3D:any[] = new Array;

  //AMBIENTE
  env = new ambiente(null);  
  env_c3d = new ambiente_c3d(null);
  gener_ = generador.get_instance();

  //CONTENEDOR DE TEXTOS
  contenido_traduccion:string = "";
  contenido_consola:string = "";
  conteo_tabs:number = 0;

  conf:any = {
    lineNumbers: true,
    theme: 'darcula',
    mode: 'javascript',    
  };

  //VARIABLES DE LOS CODE MIRROR
  fuente;
  traduccion;

  //AST 
  ast:any;
  div_ast:any;
  str_ast:string;

  constructor() {
    this.limpiar_consola();
  }

  limpiar_consola(){
    this.contenido_consola = "";
    this.contenido_consola = "PS MatrioshTS>";
  }

  parser_traduccion(){      
    if(this.fuente != undefined){
      try{          
        /* NOTIFICAR EN CONSOLA */
        this.contenido_consola = this.contenido_consola + " Traducción realizada con éxito. \nPS MatrioshTS>";
        this.conteo_tabs = 0;

        errores.clear();
        this.ast = analizador.parse(this.fuente);        
  
        this.mostrar_traduccion();      
  
        this.traduccion=this.contenido_traduccion;      

        this.graficar_ast();
      }catch(er){
        /* NOTIFICAR ERROR EN TRADUCCIÓN */
        console.log(er);
        this.contenido_consola = this.contenido_consola + " " + er +" \nPS MatrioshTS> " 
      }    
  
      this.cargar_errores();
      this.cargar_tabla_simbolos();
    }else{
      this.contenido_consola = this.contenido_consola + " ERROR -> No se realizó la traducción porque no hay código fuente. \nPS MatrioshTS>" 
    }   
  }

  parser_traduccion_c3d(){
    if(this.fuente != undefined){
      try{
        this.contenido_consola = this.contenido_consola + " Traducción realizada con éxito. \nPS MatrioshTS>";
        this.conteo_tabs = 0;

        this.gener_.limpiar_c3d();
        this.traduccion = "";
        this.listaErrores = [];
        errores.clear();

        /*-----EJECUTAR Y MOSTRAR----*/
        this.ast = traductor_c3d.parse(this.fuente);        
        console.log(this.ast);

        this.listaErrores = this.listaErrores.concat(errores.getErrores());        

        this.cargar_nativas();

        this.gener_.add_void("main");
        this.codigo_c3d_sp();       
        this.gener_.add_end_void();

        this.traduccion = this.gener_.get_code();        
        this.traduccion = this.gener_.crear_encabezado() + this.traduccion;
        /*---------------------------*/

        this.graficar_ast();
        this.cargar_simbolos_c3d();
      }catch(er){
        /* NOTIFICAR ERROR EN TRADUCCIÓN */
        console.log(er);
        this.contenido_consola = this.contenido_consola + " " + er +" \nPS MatrioshTS> " 
      } 
    }else{
      this.contenido_consola = this.contenido_consola + " ERROR -> No se realizó la traducción porque no hay código fuente. \nPS MatrioshTS>" 
    } 
  }

  cargar_simbolos_c3d(){
    try{      
      this.listaSimbolosC3D = [];
      this.listaSimbolosC3D = Array.from(this.env_c3d.get_variables());  
    }catch(er){
      console.log(er);
        this.contenido_consola = this.contenido_consola + " " + er +" \nPS MatrioshTS> ";
    }    
  }

  cargar_nativas(){
    let n_ = new nativas_();
    n_.print_true();
    n_.print_false();
    n_.print_str();
    n_.compare_str();
    n_.concat_str();
    n_.int_toChar();
    n_.bool_toStr();
    n_.int_toStr();
    n_.dec_toStr();
    n_.potencia_();
    
  }

  mostrar_traduccion(){
    this.contenido_traduccion = "";
    for(const item of this.ast){
      if(item != undefined){
        try{
          this.concatenar_traduccion(item);  
        }catch(error){
          console.log(item);
          console.log(error);
          this.contenido_consola = this.contenido_consola + " ERROR CON TRADUCCION -> " +error + "\nITEM: "+ item.text + "\nPS MatrioshTS>"
        }        
      }          
    }
  }

  get_tabulaciones():string{
    let tabulaciones = "";

    for(let i=0; i<this.conteo_tabs; i++){
      tabulaciones = tabulaciones + "\t";
    }

    return tabulaciones;
  }

  concatenar_traduccion(item:any){
    let tabular = this.get_tabulaciones();   

    if(item.escritura == 0){  //LINEALES 
      this.contenido_traduccion = this.contenido_traduccion + tabular + item.text + "\n";
    }else if(item.escritura == 1){  //INSTRUCCIONES
      this.contenido_traduccion =  this.contenido_traduccion + tabular +  item.text + "{\n";
      this.conteo_tabs++;
      
      for(const sub_item of item.instr){
        this.concatenar_traduccion(sub_item);
      }

      this.conteo_tabs--;
      this.contenido_traduccion = this.contenido_traduccion + tabular +  "}\n";
    }else if(item.escritura == 2){  //IF
      this.contenido_traduccion = this.contenido_traduccion + tabular + item.text + "{\n";
      this.conteo_tabs++;

      //INSTRUCCIONES IF
      for(const sub_item of item.instr){
        this.concatenar_traduccion(sub_item);
      }      

      this.contenido_traduccion = this.contenido_traduccion + tabular + "}";      
      if(item.els.escritura == 2){  //INSTRUCCIONES ELSE IF

        this.contenido_traduccion = this.contenido_traduccion + "else ";
        this.conteo_tabs--;
        this.concatenar_traduccion(item.els);        

      }else{
        if(Array.isArray(item.els)){ //CON ELSE
          this.contenido_traduccion = this.contenido_traduccion + "else{\n";          

          for(const sub_item of item.els){
            this.concatenar_traduccion(sub_item);
          } 
          this.conteo_tabs--;   
          this.contenido_traduccion = this.contenido_traduccion + tabular + "}\n";                 
        }else{ //SIN ELSE
          this.contenido_traduccion = this.contenido_traduccion + "\n";         
        }
      }
      
    }else if(item.escritura == 3){  //DO WHILE
      this.contenido_traduccion = this.contenido_traduccion + tabular + "do{\n";
      this.conteo_tabs++;
      
      for(const sub_item of item.instr){
        this.concatenar_traduccion(sub_item);
      }

      this.conteo_tabs--;
      this.contenido_traduccion = this.contenido_traduccion + tabular + "}" + item.text + "\n";        
    }else if(item.escritura == 4){  //FUNCTION

      this.contenido_traduccion += tabular + item.text;
      
      let count_atrs = 0;
      let size_atr = 0; 

      if(item.atribs){
        size_atr = item.atribs.length;

        for(const atr of item.atribs){
          this.contenido_traduccion += atr.text;

          count_atrs++;
          if(count_atrs < size_atr){
            this.contenido_traduccion += ","
          }
        }
      }

      this.contenido_traduccion += "):" + item.tipo_dato_f + "{\n";

      this.conteo_tabs++;
      
      for(const sub_item of item.instr){
        this.concatenar_traduccion(sub_item);
      }

      this.conteo_tabs--;
      this.conteo_tabs--;
      this.contenido_traduccion = this.contenido_traduccion + tabular + "}\n";
    }else if(item.escritura == 5){  //LLAMADA
      this.contenido_traduccion += tabular + item.text;
      
      let count_param = 0;
      for(const param_item of item.param){
        if(count_param == 0){
          this.contenido_traduccion += param_item.text;
        }else{
          this.contenido_traduccion += "," + param_item.text;
        }
        count_param++;
      }

      this.contenido_traduccion += ");\n";

    }else if(item.escritura == 6){  //CASES DEFAULT
      this.contenido_traduccion =  this.contenido_traduccion + tabular +  item.text + "\n";
      this.conteo_tabs++;
      
      for(const sub_item of item.instr){
        this.concatenar_traduccion(sub_item);
      }

      this.conteo_tabs--;
      this.contenido_traduccion = this.contenido_traduccion + tabular +  "\n";
    }
  }

  cargar_errores(){
    try{
      this.listaErrores = [];
      this.listaErrores = errores.getErrores();
    }catch(er){
      console.log(er);
        this.contenido_consola = this.contenido_consola + " " + er +" \nPS MatrioshTS> ";
    }    
  }

  cargar_tabla_simbolos(){
    try{          
      this.listaSimbolosEjecutar = [];
      this.listaFuncionesEjecutar = [];
      this.listaSimbolos = tabla_simbolos.get_simbolos();
      tabla_simbolos.clear();
    }catch(er){
      console.log(er);
      this.contenido_consola = this.contenido_consola + " " + er +" \nPS MatrioshTS> " 
    }
  }

  codigo_c3d_pp(){
    
  }

  codigo_c3d_sp(){    
    this.ast.forEach((item:any) => {
      if(!(item.nodo instanceof types_))
        item.nodo.traducir(this.env_c3d, this.gener_, this.listaErrores);
    });      
  }

  ejecutar_codigo(){    
    let num_prints = 0;
    for(const item of this.ast){
      if(item != undefined){        
        const resultado_instr = item.nodo.ejecutar(this.env); 
        if(resultado_instr != null || resultado_instr != undefined){
            this.contenido_consola +=resultado_instr.valor + "\n";  
            num_prints++;          
        }        
      }          
    }

    if(num_prints>0){
      this.contenido_consola += "PS MatrioshTS> ";
    }else{
      this.contenido_consola += "\nPS MatrioshTS> ";
    }    
  }

  parser_ejecucion(){
    if(this.traduccion != undefined){ //EJECUTAR TRADUCCION
      try{          
        errores.clear();
        this.ast = ejecutar_code.parse(this.traduccion);        
        this.ejecutar_codigo();

        this.graficar_ast();
      }catch(er){
        /* NOTIFICAR ERROR EN TRADUCCIÓN */
        console.log(er);
        this.contenido_consola = this.contenido_consola + " " + er +" \nPS MatrioshTS> " 
      }    

      this.cargar_errores();
      this.cargar_simbolos_ejecucion();   
      this.cargar_tabla_funciones();   
    }else if(this.fuente != undefined){ //EJECUTAR FUENTE
      try{          
        errores.clear();
        this.ast = ejecutar_code.parse(this.fuente);        
        this.ejecutar_codigo();

        this.graficar_ast();
      }catch(er){
        /* NOTIFICAR ERROR EN TRADUCCIÓN */
        console.log(er);
        this.contenido_consola = this.contenido_consola + " " + er +" \nPS MatrioshTS> " 
      }    

      this.cargar_errores();
      this.cargar_simbolos_ejecucion();
      this.cargar_tabla_funciones();
    }else{
      this.contenido_consola = this.contenido_consola + " ERROR -> No se realizó la ejecución porque no hay código. \nPS MatrioshTS>" 
    }
  }

  ionViewDidEnter(){
    this.div_ast = document.getElementById('divast');        
    wasmFolder('https://cdn.jsdelivr.net/npm/@hpcc-js/wasm@0.3.13/dist');
  }
  
  graficar_ast(){    
    let count_instr:number = 0;


    this.str_ast = "";
    this.str_ast = "digraph { _inicio_ [label=\"Inicio\"];\n";
    this.str_ast += "_instrucciones0_ [label=\"Instrucciones\"];\n";
    this.str_ast += "_inicio_ -> _instrucciones0_ ;\n";

    for(const item of this.ast){
      if(item != undefined){
        this.str_ast += "instruccion_" +count_instr + " [label=\"Instruccion\"];\n";
        this.str_ast += "_instrucciones" + count_instr + "_ -> instruccion_" + count_instr + ";\n";

        let instr_next:number = count_instr + 1;
        this.str_ast += "_instrucciones" + instr_next + "_ [label=\"Instrucciones\"];\n";
        this.str_ast += "_instrucciones" + count_instr + "_ -> _instrucciones" + instr_next + "_;\n";

        this.graficar_instruccion(item, count_instr, 0, "instruccion_"+count_instr);

        count_instr++;

      }          
    }

    this.str_ast += "}";

    graphviz(this.div_ast).renderDot(this.str_ast);
  }

  cargar_simbolos_ejecucion(){
    try{      
      this.listaSimbolos = [];
      this.listaSimbolosEjecutar = Array.from(this.env.get_variables());      
    }catch(er){
      console.log(er);
        this.contenido_consola = this.contenido_consola + " " + er +" \nPS MatrioshTS> ";
    }    
  }
  
  cargar_tabla_funciones(){
    try{
      this.listaSimbolos = [];
      this.listaFuncionesEjecutar = Array.from(this.env.get_funciones());
    }catch(er){
      console.log(er);
      this.contenido_consola = this.contenido_consola + " " + er + " \nPS MatrioshTS> ";
    }
  }

  graficar_instruccion(item:any, instr_num:number, sub_instr:number, padre:string){    
    if(item.tipo == "declaracion_variable"){  //AST DECLARAR VARIABLES
      this.str_ast += "declaracion_variable_" + sub_instr + instr_num + " [label  = \"Declaracion\"];\n";
      this.str_ast +=  padre + "-> declaracion_variable_"  + sub_instr + instr_num + ";\n";
      
      this.str_ast += item.restriccion + sub_instr + instr_num + " [label = \"" + item.restriccion + "\"];\n";
      this.str_ast += item.id + sub_instr + instr_num + " [label = \"" + item.id + "\"];\n";

      this.str_ast += "declaracion_variable_" + sub_instr + instr_num + " -> " + item.restriccion + sub_instr + instr_num + ";\n";
      this.str_ast += "declaracion_variable_" + sub_instr + instr_num + " -> " + item.id + sub_instr + instr_num + ";\n";

      if(item.expresion){                
        this.graficar_expresion(item.expresion, instr_num, sub_instr+1, "declaracion_variable_"+(sub_instr)+instr_num);
      }
    }else if(item.tipo == "if_"){ //AST IF
      let name_if = "if_" + sub_instr + instr_num;
      this.str_ast += name_if + " [label = \"If\"];\n";
      this.str_ast += padre + "-> if_" + sub_instr + instr_num + ";\n";

      this.str_ast += "condicion_" + sub_instr + instr_num + " [label = \"Condicion\"];\n";
      this.str_ast += name_if + "-> condicion_" + sub_instr + instr_num + ";\n";      
      this.graficar_expresion(item.condicion, instr_num, sub_instr+100, "condicion_"+sub_instr+instr_num);

      let count_instrucciones = 0;
      let name_instrucciones = "instrucciones_" + sub_instr + instr_num + count_instrucciones;
      this.str_ast += name_instrucciones + "[label = \"Instrucciones\"];\n";
      
      this.str_ast += name_if + "->" + name_instrucciones + ";\n";
      for(let instr_item of item.instrucciones){
        let new_name_instr = "instruccion_" + sub_instr + instr_num + count_instrucciones;
        this.str_ast += new_name_instr + "[label = \"Instruccion\"];\n";
        this.str_ast += "instrucciones_" + sub_instr + instr_num + count_instrucciones + " -> " + new_name_instr + ";\n";
        
        let next_instr = count_instrucciones + 1;
        this.str_ast += "instrucciones_" + next_instr + instr_num + next_instr + "[label = \"Instrucciones\"];\n";
        this.str_ast += "instrucciones_" + sub_instr + instr_num + count_instrucciones + " -> instrucciones_" + next_instr + instr_num + next_instr + ";\n";

        this.graficar_instruccion(instr_item, instr_num, sub_instr+200, new_name_instr);

        sub_instr++;
        count_instrucciones++;
      }

      if(item.else.condicion){  //ES ELSE IF
        this.str_ast += "else_" + sub_instr + instr_num + "[label = \"Else\"];\n";
        this.str_ast += name_if + "-> else_" + sub_instr + instr_num + ";\n";
        this.graficar_instruccion(item.else, instr_num, sub_instr+300, "else_" + sub_instr + instr_num);
      }else if(item.else.text != ""){  //ELSE 
        let name_else = "else_" + sub_instr + instr_num;
        this.str_ast += name_else + "[label = \"Else\"];\n";
        this.str_ast += name_if + "->" + name_else + ";\n";
        if( item.else instanceof Array){
          for(let instr_item of item.else){
            this.graficar_instruccion(instr_item, instr_num, sub_instr+400, "else_"+sub_instr+instr_num);
            sub_instr++;
          }
        }else{
          for(let instr_item of item.else.instr){
            this.graficar_instruccion(instr_item, instr_num, sub_instr+400, "else_"+sub_instr+instr_num);
            sub_instr++;
          }
        }        
      }            
    }else if(item.tipo == "while_"){  //AST WHILE
      this.str_ast += "while_" + instr_num + sub_instr + "[label = \"While\"];\n";
      this.str_ast += padre  + " -> while_" + instr_num + sub_instr + ";\n";

      this.str_ast += "cond_" + instr_num + sub_instr + "[label = \"Condicion\"];\n";
      this.str_ast += "while_" + instr_num + sub_instr + " -> cond_" + instr_num + sub_instr + ";\n";

      this.graficar_expresion(item.cond, instr_num, sub_instr+900, "cond_"+instr_num+sub_instr);      

      this.str_ast += "__instrucciones" + instr_num + sub_instr + "[label = \"Instrucciones\"];\n";
      this.str_ast += "while_" + instr_num + sub_instr + " -> __instrucciones" + instr_num + sub_instr + ";\n";

      for(let instr_item of item.instr){
        this.str_ast += "__instruccion" + instr_num + sub_instr + "[label = \"Instruccion\"];\n";
        this.str_ast += "__instrucciones" + instr_num + sub_instr + " -> __instruccion" +  instr_num + sub_instr + ";\n";

        let next_instr = sub_instr +1;

        this.str_ast += "__instrucciones" + instr_num + next_instr + "[label = \"Instrucciones\"];\n";
        this.str_ast += "__instrucciones" + instr_num + sub_instr + " -> __instrucciones" + instr_num + next_instr + ";\n";

        this.graficar_instruccion(instr_item, instr_num, sub_instr + 1000, "__instruccion" + instr_num + sub_instr);

        sub_instr++;
      }
    }else if(item.tipo == "dowhile_"){  //AST DO WHILE
      this.str_ast += "dowhile_" + instr_num + sub_instr + "[label = \"Do While\"];\n";
      this.str_ast += padre  + " -> dowhile_" + instr_num + sub_instr + ";\n";

      this.str_ast += "cond_" + instr_num + sub_instr + "[label = \"Condicion\"];\n";
      this.str_ast += "dowhile_" + instr_num + sub_instr + " -> cond_" + instr_num + sub_instr + ";\n";

      this.graficar_expresion(item.cond, instr_num, sub_instr+900, "cond_"+instr_num+sub_instr);      

      this.str_ast += "__instrucciones" + instr_num + sub_instr + "[label = \"Instrucciones\"];\n";
      this.str_ast += "dowhile_" + instr_num + sub_instr + " -> __instrucciones" + instr_num + sub_instr + ";\n";

      for(let instr_item of item.instr){
        this.str_ast += "__instruccion" + instr_num + sub_instr + "[label = \"Instruccion\"];\n";
        this.str_ast += "__instrucciones" + instr_num + sub_instr + " -> __instruccion" +  instr_num + sub_instr + ";\n";

        let next_instr = sub_instr +1;

        this.str_ast += "__instrucciones" + instr_num + next_instr + "[label = \"Instrucciones\"];\n";
        this.str_ast += "__instrucciones" + instr_num + sub_instr + " -> __instrucciones" + instr_num + next_instr + ";\n";

        this.graficar_instruccion(instr_item, instr_num, sub_instr + 1100, "__instruccion" + instr_num + sub_instr);

        sub_instr++;
      }
    }else if(item.tipo == "incremento"){  //AST INCREMENTO  
      this.graficar_expresion(item.expresion, instr_num, sub_instr+500, "instruccion_" + instr_num);
      sub_instr++;
    }else if(item.tipo == "print"){
      this.str_ast += "print_" + sub_instr + instr_num + " [label = \"Console.log\"];\n";
      this.str_ast += padre + "-> print_"+sub_instr + instr_num + ";\n";

      this.graficar_expresion(item.expresion, instr_num, sub_instr + 600, "print_" + sub_instr + instr_num);
      sub_instr++;
    }else if(item.tipo == "for_"){
      this.str_ast += "for_" + sub_instr + instr_num + "[label = \"For\"];\n";
      this.str_ast += padre + " -> for_" + sub_instr  + instr_num + ";\n";

      this.str_ast += "instrucciones__" + sub_instr + instr_num + "[label = \"Instrucciones\"];\n";
      this.str_ast += "for_" + sub_instr + instr_num + " -> instrucciones__" + sub_instr + instr_num + ";\n";      

      for(let for_instr of item.instr){
        this.str_ast += "instruccion__" + sub_instr + instr_num + "[label = \"Instruccion\"];\n";
        this.str_ast += "instrucciones__" + sub_instr + instr_num + " -> instruccion__" + sub_instr + instr_num + ";\n";

        let next_for = sub_instr + 1;

        this.str_ast += "instrucciones__" + next_for + instr_num + " [label = \"Instrucciones\"];\n";
        this.str_ast += "instrucciones__" + sub_instr + instr_num + " -> instrucciones__" + next_for + instr_num + ";\n";

        this.graficar_instruccion(for_instr, instr_num, sub_instr, "instruccion__" + sub_instr + instr_num);
      }
    }else if(item.tipo == "llamada"){
      this.str_ast += "call_" + sub_instr + instr_num + "[label = \"Llamada\" ];\n";
      this.str_ast += padre + " ->  call_" + sub_instr + instr_num + ";\n";

      this.str_ast += "id_" + sub_instr + instr_num + "[label = \"" + item.dato + "\"];\n";
      this.str_ast += "call_" + sub_instr + instr_num + " -> id_" + sub_instr + instr_num + ";\n";

      let count_param = 0;

      this.str_ast += "parametros_" + sub_instr + instr_num + count_param + "[label = \"Parametros\"];\n";
      this.str_ast += "call_" + sub_instr + instr_num + " -> parametros_" + sub_instr + instr_num + count_param + ";\n";     

      let copia_sub_instr = sub_instr;
      
      for(let param_item of item.param){
        this.str_ast += "parametro_"  + sub_instr + instr_num + count_param + "[label = \"Parametro\"];\n";
        this.str_ast += "parametros_" + sub_instr + instr_num + count_param + " -> parametro_" + sub_instr + instr_num + count_param + ";\n";

        let next_param = count_param + 1;

        this.str_ast += "parametros_" + sub_instr + instr_num + next_param + "[label  = \"Parametros\"];\n";
        this.str_ast += "parametros_" + sub_instr + instr_num + count_param + " -> parametros_" + sub_instr + instr_num + next_param + ";\n";        

        this.graficar_expresion(param_item.expresion, instr_num, copia_sub_instr + 700, "parametro_" + sub_instr + instr_num + count_param);

        count_param++;
        copia_sub_instr++;
      }
    }else if(item.tipo == "switch_"){
      this.str_ast += "switch_" + sub_instr + instr_num + "[label = \"Switch\"];\n";
      this.str_ast += padre + " -> switch_" + sub_instr + instr_num + ";\n";

      this.str_ast += "cond_" + instr_num + sub_instr + "[label = \"Condicion\"];\n";
      this.str_ast += "switch_" + sub_instr + instr_num + " -> cond_" + instr_num + sub_instr + ";\n";

      this.graficar_expresion(item.cond, instr_num, sub_instr+1200, "cond_"+instr_num+sub_instr);      

      this.str_ast += "__cases" + instr_num + sub_instr + "[label = \"Cases\"];\n";
      this.str_ast += "switch_" + sub_instr + instr_num + " -> __cases" + instr_num + sub_instr + ";\n";

      for(let instr_item of item.instr){
        if(instr_item.expresion){
          this.str_ast += "__case" + instr_num + sub_instr + "[label = \"Case\"];\n";
          this.str_ast += "__cases" + instr_num + sub_instr + " -> __case" +  instr_num + sub_instr + ";\n";

          let next_instr = sub_instr +1;

          this.str_ast += "__cases" + instr_num + next_instr + "[label = \"Cases\"];\n";
          this.str_ast += "__cases" + instr_num + sub_instr + " -> __cases" + instr_num + next_instr + ";\n";

          this.str_ast += "__exp" + instr_num + sub_instr + " [label = \"Condicion\"];\n";
          this.str_ast += "__case" + instr_num + sub_instr + " -> __exp" + instr_num + sub_instr + ";\n";

          this.graficar_expresion(instr_item.expresion, instr_num, sub_instr + 1400, "__exp"+instr_num+sub_instr);

          for(let sub_instr_item of instr_item.instr){
            this.graficar_instruccion(sub_instr_item, instr_num, sub_instr + 1300, "__case" + instr_num + sub_instr);
          }        
        }else{
          this.str_ast += "__default" + instr_num + sub_instr + "[label = \"Default\"];\n";
          this.str_ast += "__cases" + instr_num + sub_instr + " -> __default" +  instr_num + sub_instr + ";\n";

          let next_instr = sub_instr +1;

          this.str_ast += "__cases" + instr_num + next_instr + "[label = \"Cases\"];\n";
          this.str_ast += "__cases" + instr_num + sub_instr + " -> __cases" + instr_num + next_instr + ";\n";

          for(let sub_instr_item of instr_item.instr){
            this.graficar_instruccion(sub_instr_item, instr_num, sub_instr + 1400, "__default" + instr_num + sub_instr);
          }        
        }

        sub_instr++;
      }
    }else if(item.tipo == "break"){
      this.str_ast += "break_" + sub_instr + instr_num + "[label = \"Break\"];\n";
      this.str_ast += padre + " -> break_" + sub_instr + instr_num + ";\n";
    }else if(item.tipo == "continue"){
      this.str_ast += "continue_" + sub_instr + instr_num + "[label = \"Continue\"];\n";
      this.str_ast += padre + " -> continue_" + sub_instr + instr_num + ";\n";
    }else if(item.tipo == "asignar"){
      this.str_ast += "asignar_" + sub_instr + instr_num + "[label = \"Asignacion\"];\n";
      this.str_ast += padre + " -> asignar_" + sub_instr + instr_num + ";\n";

      this.str_ast += "id_" + sub_instr + instr_num + "[label = \"" + item.id + "\"];\n";
      this.str_ast += "asignar_" + sub_instr + instr_num + " -> id_" + sub_instr + instr_num + ";\n";

      this.graficar_expresion(item.expresion, instr_num, sub_instr + 800, "asignar_" + sub_instr + instr_num);
    }else if(item.tipo == "arreglo"){
      this.str_ast += "arreglo_" + sub_instr + instr_num + "[label = \"Arreglo\"];\n";
      this.str_ast += padre + " -> arreglo_"+ sub_instr + instr_num + ";\n";

      this.str_ast += "id_" + sub_instr + instr_num + "[label = \""+ item.id +"\"];\n";
      this.str_ast += "arreglo_" + sub_instr + instr_num + " -> id_" + sub_instr + instr_num + ";\n";

      if(item.tipo){
        this.str_ast += "tipo_" + sub_instr + instr_num + "[label = \"" + item.tipo + "\"];\n";
        this.str_ast += "arreglo_" + sub_instr + instr_num + " -> tipo_" + sub_instr + instr_num + ";\n";
      }
    }else if(item.tipo == "funcion"){
      let name_fun = "_funcion_" + sub_instr + instr_num;
      this.str_ast += name_fun + "[label = \"Funcion\"];\n";
      this.str_ast += padre + " -> _funcion_" + sub_instr + instr_num + ";\n";

      this.str_ast += "_id_"  + sub_instr + instr_num + "[label = \"" + item.id + "\"];\n";
      this.str_ast += name_fun + " -> _id_" + sub_instr + instr_num + ";\n";

      if(item.param){
        this.str_ast += "_params_" + sub_instr + instr_num + "[label = \"Parametros\"];\n";        
        this.str_ast += "_funcion_" + sub_instr + instr_num + " -> _params_" + sub_instr + instr_num + ";\n";

        for(let param_func of item.param){
          this.str_ast += "_param_" + sub_instr + instr_num + "[label = \"Parametro\"];\n";
          this.str_ast += "_params_" + sub_instr + instr_num + " -> _param_" + sub_instr + instr_num + ";\n";

          let next_param = sub_instr + 1;
          
          this.str_ast += "_params_" + next_param + instr_num + "[label = \"Parametros\"];\n";
          this.str_ast += "_params_" + sub_instr + instr_num + " -> _params_" + next_param + instr_num + ";\n";

          this.str_ast += "_id__" + sub_instr + instr_num + "[label = \"" + param_func.id + "\"];\n";
          this.str_ast += "_param_" + sub_instr + instr_num +" -> _id__" + sub_instr + instr_num + ";\n";

          this.str_ast += "_tipo__" + sub_instr + instr_num + "[label = \"" + param_func.tipo + "\"];\n";
          this.str_ast += "_param_" + sub_instr + instr_num + " -> _tipo__" + sub_instr + instr_num + ";\n";

          sub_instr++;
        }
      }

      this.str_ast += "_instrucciones__" + sub_instr + instr_num + "[label = \"Instrucciones\"];\n";
      this.str_ast += name_fun + " -> _instrucciones__" + sub_instr + instr_num + ";\n";

      for(let instr_item of item.instr){
        this.str_ast += "_instruccion__" + sub_instr + instr_num + "[label = \"Instruccion\"];\n";
        this.str_ast += "_instrucciones__" + sub_instr + instr_num + " -> _instruccion__" + sub_instr + instr_num + ";\n";

        let next_instr_num = sub_instr + 1;

        this.str_ast += "_instrucciones__" + next_instr_num + instr_num + "[label = \"Instrucciones\"];\n";
        this.str_ast += "_instrucciones__" + sub_instr + instr_num + " -> _instrucciones__" + next_instr_num + instr_num + ";\n";

        this.graficar_instruccion(instr_item, instr_num, sub_instr, "_instruccion__" + sub_instr +  instr_num);

        sub_instr++;
      }
      
      
    }else if(item.tipo == "return_"){
      this.str_ast += "return_" + sub_instr + instr_num + "[label = \"Return\"];\n";
      this.str_ast += padre + " -> return_" + sub_instr + instr_num + ";\n";

      this.graficar_expresion(item.expresion, instr_num, sub_instr+1400, "return_" +sub_instr+instr_num);
      sub_instr++;
    }


  }

  graficar_expresion(item:any, instr_num:number, sub_instr:number, padre:string){
    let nombre_expresion = "expresion_" + sub_instr + instr_num;
    this.str_ast += nombre_expresion + " [label = \"Expresion\"];\n";
    this.str_ast += padre + " -> " + nombre_expresion + ";\n";

    if(item.dato){  //Es un dato
      this.str_ast += "dato_" + sub_instr + instr_num + " [label = \"Dato\"];\n";
      this.str_ast += nombre_expresion + " -> " + "dato_" + sub_instr + instr_num + ";\n";

      this.str_ast += "\"" + item.dato.replace(/['"]+/g, '') + sub_instr + instr_num + "\"" + " [label = \"" + item.dato.replace(/['"]+/g, '') +"\"];\n";
      this.str_ast += "dato_" + sub_instr + instr_num + " -> " + "\"" + item.dato.replace(/['"]+/g, '') + sub_instr + instr_num + "\"" + ";\n";

      this.str_ast += item.tipo + sub_instr + instr_num + " [label = \"" + item.tipo +"\"];\n";
      this.str_ast += "dato_" + sub_instr + instr_num + " -> " + item.tipo + sub_instr + instr_num + ";\n";

    }else{  //Es una expresion
      this.str_ast += "operador_" + sub_instr + instr_num + " [label = \"" + item.operador +"\"];\n";
      this.str_ast += nombre_expresion + " -> " + "operador_" + sub_instr + instr_num + ";\n";
      
      if(item.derecho){
        this.graficar_expresion(item.derecho, instr_num, sub_instr+1, nombre_expresion);
        sub_instr++;
      }   

      if(item.izquierdo){        
        this.graficar_expresion(item.izquierdo, instr_num, sub_instr+4, nombre_expresion);
        sub_instr++;
      }
    }

  }

}


