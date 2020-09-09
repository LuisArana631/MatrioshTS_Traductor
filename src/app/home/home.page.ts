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
        this.contenido_traduccion = this.contenido_traduccion + item.text ;
      }          
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
      console.log(this.listaSimbolos);
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
    wasmFolder('/assets/@hpcc-js/wasm/dist/');
    graphviz(this.div_ast).renderDot('digraph {a -> b}');
  }

}


