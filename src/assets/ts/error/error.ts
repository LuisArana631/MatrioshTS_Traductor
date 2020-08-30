export class nodoError{
    private tipo:string;
    private descripcion:string;
    private linea:number;
    private columna:number;
    private valor:string;
    private ambito:string;

    constructor(tipo:string, descripcion:string, linea:number, columna:number, valor:string, ambito:string){
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
        this.ambito = ambito;
    }

    get Tipo():string{
        return this.tipo;
    }

    get Descripcion():string{
        return this.descripcion;
    }

    get Linea():number{
        return this.linea;
    }

    get Columna():number{
        return this.columna;
    }

    get Valor():string{
        return this.valor;
    }

    get Ambito():string{
        return this.ambito;
    }
}