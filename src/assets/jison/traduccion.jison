%{
    const { nodoError } = require('../js/error/error');
    const { errores } = require('../js/error/errores');

    const { tipo } = require('../js/abstract/valores');
    const { nodoSimbolo } = require('../js/tabla_simbolos/nodosimbolo');
    const { tabla_simbolos } = require('../js/tabla_simbolos/tablasimbolos');

    let name_function = new Array;
    name_function.push("global");    
%}

%lex

/* DATOS */
entero  [0-9]+
decimal [0-9]+"."[0-9]+
identificador ([a-zA-Z_])[a-zA-Z0-9_]*

/* SECUENCIAS DE ESCAPE */
saltolinea \\n
tabulador \\t
retornocarro \\r
barrainvertida \\\\
comillasimple \\\'
comilladoble \\\"

/* CADENAS */
cadenadoble (\"[^"]*\")
cadenasimple (\'[^']*\')

/* COMENTARIOS */
"//".* /* IGNORAR COMENTARIO */
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] /* IGNORAR COMENTARIO */

%%
\s+                   /* EVITAR ESPACIOS EN BLANCO */

/* COMENTARIOS */
"//".* /* IGNORAR COMENTARIO */
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] /* IGNORAR COMENTARIO */

/* SECUENCIAS DE ESCAPE */
{saltolinea}            return 'SALTOLINEA'
{tabulador}             return 'TABULADOR'
{retornocarro}          return 'RETORNOCARRO'
{barrainvertida}        return 'BARRAINVERTIDA'

/* CADENAS */
{cadenadoble}           { /*yytext = yytext.substr( 1 , yyleng-2 );*/ return 'CADENA'; }
{cadenasimple}          { /*yytext = yytext.substr( 1 , yyleng-2 );*/ return 'CADENA'; }     


{comillasimple}         return 'COMILLASIMPLE'
{comilladoble}          return 'COMILLADOBLE'

/* TIPOS DE DATOS */
"string"                return 'STRING'
"number"                return 'NUMBER'
"boolean"               return 'BOOLEAN'
"void"                  return 'VOID'
"type"                  return 'TYPE'
"Array"                 return 'ARRAY'

/* OPERACIONES ARITMETICAS */
"**"                    return '**'
"--"                    return '--'
"++"                    return '++'
"+"                     return '+'
"-"                     return '-'
"*"                     return '*'
"/"                     return '/'
"%"                     return '%'

/* OPERACIONES RELACIONALES */
">="                    return '>='
"<="                    return '<='
">"                     return '>'
"<"                     return '<'
"=="                    return '=='
"!="                    return '!='

/* OPERACIONES LOGICAS */
"&&"                    return '&&'
"||"                    return '||'
"!"                     return '!'
"?"                     return '?'

/* PALABRAS RESERVADAS */
"if"                    return 'IF'
"else"                  return 'ELSE'
"switch"                return 'SWITCH'
"case"                  return 'CASE'
"default"               return 'DEFAULT'
"while"                 return 'WHILE'
"do"                    return 'DO'
"for"                   return 'FOR'
"in"                    return 'IN'
"of"                    return 'OF'
"push"                  return 'PUSH'
"pop"                   return 'POP'
"length"                return 'LENGTH'
"let"                   return 'LET'
"const"                 return 'CONST'
"break"                 return 'BREAK'
"continue"              return 'CONTINUE'
"return"                return 'RETURN'
"function"              return 'FUNCTION'
"console.log"           return 'PRINT'
"graficar_ts"           return 'GRAFICAR'

"true"                  return 'TRUE'
"false"                 return 'FALSE'

/* CARACTERES ESPECIALES */
"{"                     return '{'
"}"                     return '}'
"["                     return '['
"]"                     return ']'
"="                     return '='
","                     return ','
";"                     return ';'
":"                     return ':'
"("                     return '('
")"                     return ')'
"."                     return '.'

/* DATOS */
{decimal}               return 'DECIMAL'
{entero}                return 'ENTERO'
{identificador}         return 'IDENTIFICADOR'
{booleano}              return 'BOOLEANO'

<<EOF>>		            return 'EOF'

.                       errores.addError(new nodoError("Lexico","Caracter desconocido",yylloc.first_line, yylloc.first_column, yytext))

/lex

%left '||'
%left '&&'
%left '!'
%left '==', '!='
%left '>=', '<=', '<', '>'
%left '+' '-'
%left '*' '/' '%' '**'

%start init

%%

init    
    : instrucciones EOF { return $1; };

instrucciones
    : instrucciones instruccion { $1.push($2); $$ = $1; }
    | instruccion { $$ = [$1]; };

instruccion
    : declaracion_variables { $$ = $1; }   
    | declaracion_arreglos { $$ = $1; }
    | declaracion_funciones { $$ = $1; }
    | declaracion_types { $$ = $1; }
    | asignacion { $$ = $1; }
    | llamada ';' { $$ = {
        text: $1.text,        
        escritura: 5,

        tipo: "llamada",
        param: $1.param,
        dato: $1.id
    }; }
    | dato_valor '++' ';' { $$ = {
        text: $1.text + $2 + $3,
        escritura: 0,
        valor: $1.valor++,

        tipo: "incremento",
        expresion: {
            izquierdo: $1.expresion,
            operador: $2
        }
    }; }
    | dato_valor '--' ';' { $$ = {
        text: $1.text + $2 + $3,
        escritura: 1,
        valor: $1.valor--,

        tipo: "incremento",
        expresion: {
            izquierdo: $1.expresion,
            operador: $2
        }
    }; }
    | if { $$ = $1; }
    | while { $$ = $1; }
    | do_while { $$ = $1; }
    | switch { $$ = $1; }
    | for_normal { $$ = $1; }
    | for_in { $$ = $1; }
    | for_of { $$ = $1; }
    | 'BREAK' ';' { $$ = {
        text: $1 + $2,
        escritura: 0,

        tipo: "break"
    }; }
    | 'CONTINUE' ';' { $$ = {
        text: $1 + $2,
        escritura: 0,

        tipo: "continue"
    }; }
    | sentencia_return { $$ = $1; }
    | 'GRAFICAR' '(' ')' ';' { $$ = {
        text: $1 + $2 + $3 + $4,
        escritura: 0
    }; }
    | 'PRINT' '(' expresion ')' ';' { $$ = {
        text: $1 + $2 + $3.text + $4 + $5,
        escritura: 0,

        tipo: "print",
        expresion: $3.expresion
    }; }    
    | pop_funcion ';' { $$ = {
        text: $1.text + $2,
        escritura: 0
    }; }
    | push_funcion ';' { $$ = {
        text: $1.text + $2,
        escritura: 0
    }; }
    | error { errores.addError(new nodoError("Sintáctico","Se esperaba una instrucción y se encontró ",this._$.first_line,this._$.first_column,$1)); $$ = undefined; };

asignacion     
    : 'IDENTIFICADOR' '=' expresion ';' { $$ = {
        text: $1 + $2 + $3.text + $4,
        escritura: 0,

        tipo: "asignar",
        expresion: $3.expresion,
        id: $1
    }; };

declaracion_variables
    : tipo_restriccion 'IDENTIFICADOR' ';' { $$ = {
        text: $1 + " " + $2 + $3,
        escritura: 0,

        tipo: "declaracion_variable",
        restriccion: $1,
        id: $2
    };
    tabla_simbolos.push_simbolo(new nodoSimbolo("", $2, name_function[name_function.length-1], undefined, undefined, undefined, @1.first_line, @1.first_column, 0)); }
    | tipo_restriccion 'IDENTIFICADOR' '=' expresion ';' { $$ = {
        text: $1 + " " + $2 + " " + $3 + " " + $4.text + $5,
        valor: $4.valor,
        escritura: 0,

        tipo: "declaracion_variable",
        restriccion: $1,
        id: $2,
        expresion: $4.expresion
    }; 
    tabla_simbolos.push_simbolo(new nodoSimbolo("", $2, name_function[name_function.length-1], undefined, undefined, $4.valor, @1.first_line, @1.first_column, 0)); }
    | tipo_restriccion 'IDENTIFICADOR' ':' tipo_dato ';' { $$ = {
        text: $1 + " " + $2 + $3 + $4 + $5,
        escritura: 0,

        tipo: "declaracion_variable",
        restriccion: $1,
        id: $2
    }; 
    tabla_simbolos.push_simbolo(new nodoSimbolo($4, $2, name_function[name_function.length-1], undefined, undefined, undefined, @1.first_line, @1.first_column, 0)); }
    | tipo_restriccion 'IDENTIFICADOR' ':' tipo_dato '=' expresion ';' { $$ = {
        text: $1 + " " + $2 + $3 + $4 + " " + $5 + " " + $6.text + $7,
        valor: $6.valor,
        escritura: 0,

        tipo: "declaracion_variable",
        restriccion: $1,
        id: $2,
        expresion: $6.expresion
    }; 
    tabla_simbolos.push_simbolo(new nodoSimbolo($4, $2, name_function[name_function.length-1], undefined, undefined, $6.valor,  @1.first_line, @1.first_column, 0)); } };

length_funcion
    : 'IDENTIFICADOR' '.' 'LENGTH' { $$ = {
        text: $1 + $2 + $3,
        escritura: 0
    }; };

pop_funcion 
    : 'IDENTIFICADOR' '.' 'POP' '(' ')' { $$ = {
        text: $1 + $2 + $3 + $4 + $5,
        escritura: 0
    }; };

push_funcion
    : 'IDENTIFICADOR' '.' 'PUSH' '(' expresion ')' { $$ = {
        text: $1 + $2 + $3 + $4 + $5.text + $6,
        escritura: 0
    }; };

declaracion_arreglos
    : tipo_restriccion 'IDENTIFICADOR' ':' tipo_dato lista_dimensiones ';' { $$ = {
        text: $1 + " " + $2 + $3 + $4 + $5.text + $6,
        escritura: 0,

        tipo: "arreglo",
        id:  $2
    }; 
    tabla_simbolos.push_simbolo(new nodoSimbolo($4, $2, name_function[name_function.length-1], undefined, undefined, "@arreglo", @1.first_line, @1.first_column, 0)); }
    | tipo_restriccion 'IDENTIFICADOR' ':' tipo_dato lista_dimensiones '=' '[' 'valores_arreglo' ']' ';' { 
        let str_items = "";
        let count_items = 0;
        for(let item of $8){
            if(count_items > 0){
                str_items += "," + item.text
            }else{
                str_items += item.text
            }
            count_items++;
        }
        $$ = {
        text: $1 + " " + $2 + $3 + $4 + $5.text + $6 + $7 + str_items + $9 + $10,
        escritura: 0,

        tipo: "arreglo",
        id:  $2
    }; 
    tabla_simbolos.push_simbolo(new nodoSimbolo($4, $2, name_function[name_function.length-1], undefined, undefined, "@arreglo", @1.first_line, @1.first_column, 0)); }
    | tipo_restriccion 'IDENTIFICADOR' ':' tipo_dato lista_dimensiones  '=' lista_dimensiones ';' { $$ = {
        text: $1 + " " + $2 + $3 + $4 + $5.text + $6 + $7.text + $8,
        escritura: 0,

        tipo: "arreglo",
        id:  $2
    }; 
    tabla_simbolos.push_simbolo(new nodoSimbolo($4, $2, name_function[name_function.length-1], undefined, undefined, "@arreglo", @1.first_line, @1.first_column, 0)); };

valores_arreglo
    : valores_arreglo ',' expresion { $1.push($3); $$ = $1; }
    | expresion { $$ = [$1]; };

lista_dimensiones
    : lista_dimensiones '[' ']' { $$ = {
        text: $1.text + $2 + $3
    }; }
    | '[' ']' { $$ = {
        text: $1 + $2
    }; };

declaracion_types
    : 'TYPE' 'IDENTIFICADOR' '=' '{' atributos '}' ';' { $$ = {
        text: $1 + $2 + $3,
        escritura: 1,
        instr: $5
    }; };

atributos
    : atributos atributo { $1.push($2); $$ = $1; }
    | atributo { $$ = [$1]; };


atributo
    : 'IDENTIFICADOR' ':' 'tipo_dato' ';' { $$ = {  
        text: $1 + $2 + $3 + $4,
        escritura: 0
    }; };

expresion
    : expresion '+' expresion { $$ = {
        text: $1.text + $2 + $3.text,
        valor: $1.valor + $3.valor,

        expresion: {
            izquierdo: $1.expresion,
            derecho: $3.expresion,
            operador: $2
        }
    }; }
    | expresion '-' expresion { $$ = {
        text: $1.text + $2 + $3.text,
        valor: $1.valor - $3.valor,

        expresion: {
            izquierdo: $1.expresion,
            derecho: $3.expresion,
            operador: $2
        }
        
    }; }
    | expresion '*' expresion { $$ = {
        text: $1.text + $2 + $3.text,
        valor: $1.valor * $3.valor,

        expresion: {
            izquierdo: $1.expresion,
            derecho: $3.expresion,
            operador: $2
        }
    }; }    
    | expresion '/' expresion { $$ = {
        text: $1.text + $2 + $3.text,
        valor: $1.valor / $3.valor,

        expresion: {
            izquierdo: $1.expresion,
            derecho: $3.expresion,
            operador: $2
        }
    }; }
    | expresion '%' expresion { $$ = {
        text: $1.text + $2 + $3.text,
        valor: $1.valor % $3.valor,

        expresion: {
            izquierdo: $1.expresion,
            derecho: $3.expresion,
            operador: $2
        }
    }; }
    | expresion '**' expresion { $$ = {
        text: $1.text + $2 + $3.text,
        valor: $1.valor ** $3.valor,

        expresion: {
            izquierdo: $1.expresion,
            derecho: $3.expresion,
            operador: $2
        }
    }; }
    | 'IDENTIFICADOR' '++' { $$ = {
        text: $1 + $2,
        valor: $1.valor++,

        expresion: {
            izquierdo: $1.expresion,
            operador: $2
        }
    }; }
    | 'IDENTIFICADOR' '--' { $$ = {
        text: $1 + $2,
        valor: $1.valor--,

        expresion: {
            izquierdo: $1.expresion,
            operador: $2
        }
    }; }
    | '-' expresion { $$ = {
        text: $1 + $2.text,
        valor: -$2.valor,

        expresion: {
            izquierdo: $2.expresion,
            operador: $1
        }
    }; } 
    | expresion '<' expresion { $$ = {
        text: $1.text + $2 + $3.text,
        valor: $1.valor < $3.valor,

        expresion: {
            izquierdo: $1.expresion,
            derecho: $3.expresion,
            operador: $2
        }
    }; }
    | expresion '>' expresion { $$ = {
        text: $1.text + $2 + $3.text,
        valor: $1.valor > $3.valor,

        expresion: {
            izquierdo: $1.expresion,
            derecho: $3.expresion,
            operador: $2
        }
    }; }
    | expresion '<=' expresion { $$ = {
        text: $1.text + $2 + $3.text,
        valor: $1.valor <= $3.valor,

        expresion: {
            izquierdo: $1.expresion,
            derecho: $3.expresion,
            operador: $2
        }
    }; }
    | expresion '>=' expresion { $$ = {
        text: $1.text + $2 + $3.text,
        valor: $1.valor >= $3.valor,

        expresion: {
            izquierdo: $1.expresion,
            derecho: $3.expresion,
            operador: $2
        }
    }; }
    | expresion '!=' expresion { $$ = {
        text: $1.text + $2 + $3.text,
        valor: $1.valor != $3.valor,

        expresion: {
            izquierdo: $1.expresion,
            derecho: $3.expresion,
            operador: $2
        }
    }; }
    | expresion '==' expresion { $$ = {
        text: $1.text + $2 + $3.text,
        valor: $1.valor === $3.valor,

        expresion: {
            izquierdo: $1.expresion,
            derecho: $3.expresion,
            operador: $2
        }
    }; }
    | expresion '||' expresion { $$ = {
        text: $1.text + $2 + $3.text,

        expresion: {
            izquierdo: $1.expresion,
            derecho: $3.expresion,
            operador: $2
        }
    }; }
    | expresion '&&' expresion { $$ = {
        text: $1.text + $2 + $3.text,

        expresion: {
            izquierdo: $1.expresion,
            derecho: $3.expresion,
            operador: $2
        }
    }; }
    | '!' expresion { $$ = {
        text: $1 + $2.text,

        expresion: {
            izquierdo: $2.expresion,
            operador: $1
        }
    }; }
    | dato_valor { $$ = $1; };

dato_valor
    : '(' expresion ')' { $$ = {
        text: $1 + $2.text + $3,
        expresion: $2
    }; }
    | 'ENTERO' { $$ = {
        text: $1,
        valor: +$1,

        expresion: {
            dato: $1,
            tipo: "number"
        }
    }; }
    | 'DECIMAL' { $$ = {
        text: $1,
        valor: +$1,

        expresion: {
            dato: $1,
            tipo: "number"
        }   
    }; }
    | 'CADENA' { $$ = {
        text: $1,
        valor: $1,

        expresion: {
            dato: $1,
            tipo: "string"
        }
    }; }    
    | 'TRUE' { $$ = {
        text: $1,
        valor: $1,

        expresion: {
            dato: $1,
            tipo: "boolean"
        }
    }; }
    | 'FALSE' { $$ = {        
        text: $1,
        valor: $1,

        expresion: {
            dato: $1,
            tipo: "boolean"
        }
    }; }
    | 'IDENTIFICADOR' { $$ = {
        text: $1,
        valor: $1,
        
        expresion: {
            dato: $1,
            tipo: "variable"
        }
    }; }
    | llamada { 
        let parametros_str = "";
        let c_p = 0;

        for(let p of $1.param){
            if(c_p != 0){
                parametros_str += "," + p.text;
            }else{
                parametros_str += p.text;
            }

            c_p++;
        };

        $$ = {
        text: $1.text + parametros_str + ")",
        valor: 0,

        expresion: {
            dato: $1.id,
            tipo: "llamada"
        }
    }; }
    | length_funcion { $$ = $1; }
    | pop_funcion { $$ = $1; }
    | push_funcion { $$ = $1; };

llamada
    : 'IDENTIFICADOR' '(' ')' { $$ = {
        text: $1 + $2,
        param: [],
        escritura: 0,
        id: $1
    }; }
    | 'IDENTIFICADOR' '(' lista_exp_par ')' { $$ = {
        text: $1 + $2,
        param: $3,
        escritura: 5,
        id: $1
    }; };

lista_exp_par
    : lista_exp_par ',' expresion { $1.push($3); $$ = $1; }
    | expresion { $$ = [$1]; };

tipo_restriccion
    : 'LET' { $$ = $1; }
    | 'CONST' { $$ = $1; };

tipo_dato
    : 'NUMBER' { $$ = $1; }
    | 'STRING' { $$ = $1; }
    | 'VOID' { $$ = $1; }
    | 'BOOLEAN' { $$ = $1; }
    | 'IDENTIFICADOR' { $$ = $1; };

if
    : 'IF' '(' expresion ')' statement else {         
        $$ = {
            text: $1 + $2 + $3.text + $4,
            escritura: 2,
            instr: $5,
            els: $6,

            tipo: "if_",
            condicion: $3.expresion,
            instrucciones: $5,
            else: $6
        };
     };

else
    : 'ELSE' if { $$ = $2; }
    | 'ELSE' statement { $$ = $2; }
    | /* epsilon */ { $$ = {
        text: "",
        escritura: 0
    }; };

statement
    : '{' instrucciones '}' { $$ = $2; }
    | '{' '}' { $$ = new Array(); };

while
    : 'WHILE' '(' expresion ')' statement { $$ = {
        text: $1 + $2 + $3.text + $4,
        escritura: 1,        

        tipo: "while_",
        cond: $3.expresion,
        instr: $5
    }; };

do_while
    : 'DO' statement 'WHILE' '(' expresion ')' ';' { $$ = {        
        text: $3 + $4 + $5.text + $6 + $7,
        escritura: 3,        

        tipo: "dowhile_",
        cond: $5.expresion,
        instr: $2
    }; };

switch
    : 'SWITCH' '(' expresion ')' '{' cases '}' { $$ = {
        text: $1 + $2 + $3.text + $4,
        escritura: 1,
        
        tipo: "switch_",
        instr: $6,
        cond: $3.expresion
    }; };

cases 
    : cases case { $1.push($2); $$ = $1; }
    | case { $$ = [$1]; };

case
    : 'CASE' expresion ':' instrucciones { $$ = {
        text: $1 + " " + $2.text + $3,
        escritura: 1,
        instr: $4,

        expresion: $2.expresion
    }; };

for_in
    :'FOR' '(' tipo_restriccion 'IDENTIFICADOR' 'IN' 'IDENTIFICADOR' ')' statement { $$ = {
        text: $1 + $2 + $3 + " " + $4 + " " + $5 + " " + $6 + $7,
        escritura: 1,
        instr: $8
    }; };

for_of
    :'FOR' '(' tipo_restriccion 'IDENTIFICADOR' 'OF' 'IDENTIFICADOR' ')' statement { $$ = {
        text: $1 + " " + $2 + $3 + " " + $4 + " " + $5 + " " + $6 + $7,
        escritura: 1,
        instr: $8
    }; };

for_normal
    :'FOR' '(' declaracion_variables expresion ';' expresion ')' statement { $$ = {
        text: $1 + $2 + $3.text + " " + $4.text + $5 + $6.text + $7,
        escritura: 1,        

        tipo: "for_",
        instr: $8
    }; }
    | 'FOR' '(' asignacion expresion ';' expresion ')' statement { $$ = {
        text: $1 + $2 + $3.text + " " + $4.text + $5 + $6.text + $7,
        escritura: 1,        

        tipo: "for_",
        instr: $8
    }; }
    |'FOR' '(' 'INDETIFICADOR' ';' expresion ';' expresion ')' statement { $$ = {
        text: $1 + $2 + $3.text + " " + $4.text + $5 + $6.text + $7,
        escritura: 1,
        
        tipo: "for_",
        instr: $8
    }; };

sentencia_return
    :'RETURN' ';' { $$ = {
        text: $1 + " " + $2,
        escritura: 0,

        tipo: "return_"
    }; }
    |'RETURN' expresion ';' {  $$ = {
        text: $1 + " " + $2.text + $3,
        escritura: 0,

        tipo: "return_",
        expresion: $2.expresion
    }; };

declaracion_funciones
    : 'FUNCTION' 'IDENTIFICADOR' '(' parametros ')' ':' tipo_dato statement { $$ = {
        text: $1 + " " + $2 + $3,
        tipo_dato_f: $7,
        escritura: 4,        
        atribs: $4,

        tipo: "funcion",
        id: $2,
        param: $4,
        instr: $8
    }; 
    tabla_simbolos.push_simbolo(new nodoSimbolo($7, $2, name_function[name_function.length-1], undefined, undefined, "@function",  @1.first_line, @1.first_column, 0)); }
    | 'FUNCTION' 'IDENTIFICADOR' '(' ')' ':' tipo_dato statement { $$ = {
        text: $1 + " " + $2 + $3,
        tipo_dato_f: $6,
        escritura: 4,

        tipo: "funcion",
        id: $2,
        instr: $7
    }; 
    tabla_simbolos.push_simbolo(new nodoSimbolo($6, $2, name_function[name_function.length-1], undefined, undefined, "@function",  @1.first_line, @1.first_column, 0)); }; 

parametros
    : parametros ',' parametro { $1.push($3); $$ = $1; }
    | parametro { $$ = [$1]; };

parametro
    : 'IDENTIFICADOR' ':' tipo_dato { $$ = {
        text: $1 + $2 + $3,
        escritura: 0,

        id: $1,
        tipo: $3
    }; }; 