import { expresion_c3d } from '../abstract/expresion';
import { ambiente_c3d } from '../tabla_simbolos/ambiente';
import { generador } from '../instrucciones/generador';
import { nodoError } from '../../error/error';
import { retorno } from '../tools/retorno';
import { tipos_, tipos_dato } from '../tools/tipo';

export class string_c3d extends expresion_c3d{
    private valor_:string;
    private tipo_: tipos_dato;

    constructor(tipo_:tipos_dato, valor_:string, linea_:number, columna_:number){
        super(linea_, columna_);
        this.valor_ = valor_;
        this.tipo_ = tipo_;
    }

    public traducir(env_:ambiente_c3d, generador_:generador, errores_:Array<nodoError>):retorno{
        const temporal_ = generador_.new_temporal();
        generador_.add_code(`${temporal_} = h;`);

        const retorno_ = new retorno(temporal_, true, new tipos_(1));

        for(let i=0; i<this.valor_.length; i++){
            generador_.add_set_heap(this.valor_.charCodeAt(i), 'h');
            generador_.next_heap();
        }
        generador_.add_set_heap("-1", 'h');
        generador_.next_heap();

        generador_.add_set_stack(temporal_, 'p');

        return retorno_;   
    }
}