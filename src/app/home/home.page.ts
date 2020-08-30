import { Component } from '@angular/core';
import { errores }  from '../../assets/js/error/errores'
import { nodoError }  from '../../assets/js/error/error'
import * as analizador from '../../assets/jison/traduccion';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {  
  listaErrores:nodoError[] = [];
  contenido_traduccion:string = "hola";

  conf:any = {
    lineNumbers: true,
    theme: 'darcula',
    mode: 'javascript',    
  };

  //VARIABLES DE LOS CODE MIRROR
  fuente;
  traduccion;

  constructor() {}

  parser_traduccion(){      
    try{          
      errores.clear();
      analizador.parse(this.fuente);
      this.traduccion=this.contenido_traduccion;      
    }catch(er){
      console.log(er);  
    }    

    this.cargar_errores();
  }

  cargar_errores(){
    try{
      this.listaErrores = [];
      this.listaErrores = errores.getErrores();
    }catch(er){
      console.log(er);
    }    
  }

}
