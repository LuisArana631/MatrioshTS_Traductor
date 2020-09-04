import { Component } from '@angular/core';
import { errores }  from '../../assets/js/error/errores'
import { nodoError }  from '../../assets/js/error/error';
import * as analizador from '../../assets/jison/traduccion';

//GRAFICOS

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {  
  //LISTA ERRORES
  listaErrores:nodoError[] = [];

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

  constructor() {}

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

  cargar_errores(){
    try{
      this.listaErrores = [];
      this.listaErrores = errores.getErrores();
    }catch(er){
      console.log(er);
      this.contenido_consola = this.contenido_consola + " " + er +" \nPS MatrioshTS> " 
    }    
  }

  parser_ejecucion(){
    
  }
  
  
}


