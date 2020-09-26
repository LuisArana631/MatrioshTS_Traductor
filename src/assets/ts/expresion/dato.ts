import { expresion } from '../abstract/expresion';
import { retorno, tipo } from '../abstract/valores';
import { ambiente } from '../herramientas/ambiente';

export class dato_literal extends expresion{
    constructor(private valor:any, private tipo:number, linea:number, columna:number){
        super(linea, columna);
    }

    public ejecutar():retorno{
        if(this.tipo == 0){
            return {
                valor: Number(this.valor),
                tipo: tipo.NUMBER
            }
        }else if(this.tipo == 1){
            return {
                valor: this.valor,
                tipo: tipo.STRING
            }
        }else if(this.tipo == 2){
            return {
                valor: (this.valor == "true"),
                tipo: tipo.BOOLEAN
            }
        }
    }
}