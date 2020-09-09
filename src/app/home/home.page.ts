import { Component } from '@angular/core';

import { errores }  from '../../assets/js/error/errores'
import { nodoError }  from '../../assets/js/error/error';

import { tabla_simbolos } from '../../assets/js/tabla_simbolos/tablasimbolos';
import { nodoSimbolo } from '../../assets/js/tabla_simbolos/nodosimbolo';

import { ambiente } from '../../assets/js/herramientas/ambiente';
import * as analizador from '../../assets/jison/traduccion';

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

  constructor() {
  }

  parser_traduccion(){      
    if(this.fuente != undefined){
      try{          
        /* NOTIFICAR EN CONSOLA */
        this.contenido_consola = this.contenido_consola + " Traducción realizada con éxito. \nPS MatrioshTS>" 

        errores.clear();
        this.ast = analizador.parse(this.fuente);        
  
        this.mostrar_traduccion();      
  
        this.traduccion=this.contenido_traduccion;      
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
        this.concatenar_traduccion(item);
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

      console.log(item.instr);

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
          this.conteo_tabs--;

          for(const sub_item of item.els){
            this.concatenar_traduccion(sub_item);
          } 

          this.contenido_traduccion = this.contenido_traduccion + "}";
          this.conteo_tabs--;
        }else{ //SIN ELSE
          this.contenido_traduccion = this.contenido_traduccion + "\n";         
        }
      }
      
    }else if(item.escritura == 3){  //DO WHILE
      console.log("escritura 3");
        
    }
  }

  ejecutar_traduccion(){
    for(let item of this.ast){
      try{          
        if(item != undefined){
          console.log(item.nodo.execute(this.env));
        }
      }catch(error){
        errores.addError(error);
      }
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
      this.listaSimbolos = tabla_simbolos.get_simbolos();
    }catch(er){
      console.log(er);
      this.contenido_consola = this.contenido_consola + " " + er +" \nPS MatrioshTS> " 
    }
  }

  parser_ejecucion(){
    
  }


  ionViewDidEnter(){
    this.div_ast = document.getElementById('divast');        
    this.graficar_ast();
  }
  
  graficar_ast(){    
    wasmFolder('https://cdn.jsdelivr.net/npm/@hpcc-js/wasm@0.3.13/dist');
    graphviz(this.div_ast).renderDot('digraph {a -> c;a->b;}');
  }

}


