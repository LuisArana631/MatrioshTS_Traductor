import { Component } from '@angular/core';

import { errores }  from '../../assets/js/error/errores'
import { nodoError }  from '../../assets/js/error/error';

import { tabla_simbolos } from '../../assets/js/tabla_simbolos/tablasimbolos';
import { nodoSimbolo } from '../../assets/js/tabla_simbolos/nodosimbolo';

import { ambiente } from '../../assets/js/herramientas/ambiente';
import * as analizador from '../../assets/jison/traduccion';
import * as ejecutar_code from '../../assets/jison/ejecutar';

import { graphviz } from 'd3-graphviz';
import { wasmFolder } from '@hpcc-js/wasm';

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

  //AMBIENTE
  env = new ambiente(null);  

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

    }
  }

  cargar_errores(){
    try{
      this.listaErrores = [];
      this.listaErrores = errores.getErrores();
    }catch(er){
      console.log(er);
        this.contenido_consola = this.contenido_consola + " " + er +" \nPS MatrioshTS> " 
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

    console.log(this.str_ast);
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
      this.graficar_expresion(item.condicion, instr_num, sub_instr+10, "condicion_"+sub_instr+instr_num);

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

        this.graficar_instruccion(instr_item, instr_num, sub_instr+20, new_name_instr);

        sub_instr++;
        count_instrucciones++;
      }

      if(item.else.condicion){  //ES ELSE IF
        this.str_ast += "else_" + sub_instr + instr_num + "[label = \"Else\"];\n";
        this.str_ast += name_if + "-> else_" + sub_instr + instr_num + ";\n";
        this.graficar_instruccion(item.else, instr_num, sub_instr+30, "else_" + sub_instr + instr_num);
      }else if(item.else.text != ""){  //ELSE 
        let name_else = "else_" + sub_instr + instr_num;
        this.str_ast += name_else + "[label = \"Else\"];\n";
        this.str_ast += name_if + "->" + name_else + ";\n";
        for(let instr_item of item.else){
          this.graficar_instruccion(instr_item, instr_num, sub_instr+40, "else_"+sub_instr+instr_num);
          sub_instr++;
        }
      }            
    }else if(item.tipo == "while_"){  //AST WHILE

    }else if(item.tipo == "dowhile_"){  //AST DO WHILE

    }else if(item.tipo == "incremento"){  //AST INCREMENTO  
      this.graficar_expresion(item.expresion, instr_num, sub_instr+50, "instruccion_" + instr_num);
    }else if(item.tipo == "print"){
      this.str_ast += "print_" + sub_instr + instr_num + " [label = \"Console.log\"];\n";
      this.str_ast += padre + "-> print_"+sub_instr + instr_num + ";\n";

      this.graficar_expresion(item.expresion, instr_num, sub_instr + 50, "print_" + sub_instr + instr_num);
    }else if(item.tipo == "for_"){
      
    }
  }

  graficar_expresion(item:any, instr_num:number, sub_instr:number, padre:string){
    let nombre_expresion = "expresion_" + sub_instr + instr_num;
    this.str_ast += nombre_expresion + " [label = \"Expresion\"];\n";
    this.str_ast += padre + " -> " + nombre_expresion + ";\n";

    if(item.dato){  //Es un dato
      this.str_ast += "dato_" + sub_instr + instr_num + " [label = \"Dato\"];\n";
      this.str_ast += nombre_expresion + " -> " + "dato_" + sub_instr + instr_num + ";\n";

      this.str_ast += item.dato.replace(/['"]+/g, '') + sub_instr + instr_num + " [label = \"" + item.dato.replace(/['"]+/g, '') +"\"];\n";
      this.str_ast += "dato_" + sub_instr + instr_num + " -> " + item.dato.replace(/['"]+/g, '') + sub_instr + instr_num + ";\n";

      this.str_ast += item.tipo + sub_instr + instr_num + " [label = \"" + item.tipo +"\"];\n";
      this.str_ast += "dato_" + sub_instr + instr_num + " -> " + item.tipo + sub_instr + instr_num + ";\n";

    }else{  //Es una expresion
      this.str_ast += "operador_" + sub_instr + instr_num + " [label = \"" + item.operador +"\"];\n";
      this.str_ast += nombre_expresion + " -> " + "operador_" + sub_instr + instr_num + ";\n";
      
      if(item.derecho){
        this.graficar_expresion(item.derecho, instr_num, sub_instr+1, nombre_expresion);
      }   

      if(item.izquierdo){        
        this.graficar_expresion(item.izquierdo, instr_num, sub_instr+2, nombre_expresion);
      }
    }

  }

}


