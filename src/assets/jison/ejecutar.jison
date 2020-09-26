%{
    //ERRORES
    const { nodoError } = require('../js/error/error');
    const { errores } = require('../js/error/errores');

    //INSTRUCCIONES
    const { declaracion } = require('../js/instruccion/declaracion');
    const { print } = require('../js/instruccion/print');
    const { if_ } = require('../js/instruccion/if');
    const { while_ } = require('../js/instruccion/while');
    const { dowhile_ } = require('../js/instruccion/dowhile')
    const { for_ } = require('../js/instruccion/for');
    const { instrucciones_ } = require('../js/instruccion/instrucciones');
    const { asignacion_ } = require('../js/instruccion/asignacion');
    const { break_ } = require('../js/instruccion/break');
    const { continue_ } = require('../js/instruccion/continue');
    const { switch_ } = require('../js/instruccion/switch');
    const { case_ } = require('../js/instruccion/case');
    const { return_ } = require('../js/instruccion/return');
    const { function_ } = require('../js/instruccion/function');
    const { llamada_ } = require('../js/instruccion/llamada');

    //EXPRESIONES
    const { operacion_aritmetica, aritmetica } = require('../js/expresion/aritmetica');
    const { operacion_unitaria, aritmetica_unitaria } = require('../js/expresion/aritmetica_unaria');
    const { operacion_relacional, relacional } = require('../js/expresion/relacional');
    const { operacion_logica, logica } = require('../js/expresion/logica');

    //DATOS 
    const { dato_literal } = require('../js/expresion/dato');
    const { acceso } = require('../js/expresion/acceso');
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
    | llamada ';' { $$ = $1; }
    | dato_valor '++' ';' { $$ = {
        nodo: (new aritmetica_unitaria($1.nodo, operacion_unitaria.INCREMENTO, $1.id, @1.first_line, @1.first_column))
    }; }
    | dato_valor '--' ';' { $$ = {
        nodo: (new aritmetica_unitaria($1.nodo, operacion_unitaria.DECREMENTO, $1.id, @1.first_line, @1.first_column))
    }; }
    | if { $$ = $1; }
    | while { $$ = $1; }
    | do_while { $$ = $1; }
    | switch { $$ = $1; }   
    | for_normal { $$ = $1; }
    | for_in { $$ = $1; }
    | for_of { $$ = $1; }
    | 'BREAK' ';' { $$ = {
        nodo: (new break_(@1.first_line, @1.first_column))
    }; }
    | 'CONTINUE' ';' { $$ = {
        nodo: (new continue_(@1.first_line, @1.first_column))
    }; }
    | sentencia_return { $$ = $1; }
    | 'GRAFICAR' '(' ')' ';' { $$ = {
        text: $1 + $2 + $3 + $4,
        escritura: 0
    }; }
    | 'PRINT' '(' expresion ')' ';' { $$ = {
        nodo: (new print($3.nodo, @1.first_line, @1.first_column))
    }; }    
    | error { errores.addError(new nodoError("Sintáctico","Se esperaba una instrucción y se encontró ",this._$.first_line,this._$.first_column,$1)); $$ = undefined; };

asignacion     
    : 'IDENTIFICADOR' '=' expresion ';' { $$ = {
        nodo: (new asignacion_($3.nodo, $1, @1.first_line, @1.first_column)),
        id: $1
    }; };

declaracion_variables
    : tipo_restriccion 'IDENTIFICADOR' ';' { $$ = {
        nodo: (new declaracion($2, null, @1.first_line, @1.first_column, null, $1)),

        tipo: "declaracion_variable",
        restriccion: $1,
        id: $2
    }; }
    | tipo_restriccion 'IDENTIFICADOR' '=' expresion ';' { $$ = {
        nodo: (new declaracion($2, $4.nodo, @1.first_line, @1.first_column, null, $1)),

        tipo: "declaracion_variable",
        restriccion: $1,
        id: $2,        
    }; }
    | tipo_restriccion 'IDENTIFICADOR' ':' tipo_dato ';' { $$ = {
        nodo: (new declaracion($2, null, @1.first_line, @1.first_column, $4, $1)),

        tipo: "declaracion_variable",
        restriccion: $1,
        id: $2
    }; }
    | tipo_restriccion 'IDENTIFICADOR' ':' tipo_dato '=' expresion ';' { $$ = {
        nodo: (new declaracion($2, $6.nodo, @1.first_line, @1.first_column, $4, $1)),

        tipo: "declaracion_variable",
        restriccion: $1,
        id: $2
    }; };

declaracion_arreglos
    : tipo_restriccion 'IDENTIFICADOR' ':' lista_dimensiones ';' { $$ = {
        text: $1.text + " " + $2 + $3 + $4.text + $5,
        escritura: 0,
    }; }
    | tipo_restriccion 'IDENTIFICADOR' ':' lista_dimensiones '=' 'valores_arreglo' ';' { $$ = {
        text: $1.text + " " + $2 + $3 + $4.text + $5 + $6.text + $7,
        escritura: 0
    }; }
    | tipo_restriccion 'IDENTIFICADOR' ':' 'ARRAY' '<' 'tipo_dato' '>' ';' { $$ = {
        text: $1.text + " " + $2 + $3 + $4 + $5 + $5 + $6 + $7,
        escritura: 0
    }; }
    | tipo_restriccion 'IDENTIFICADOR' ':' 'ARRAY' '<' 'tipo_dato' '>' '=' 'valores_arreglo' ';' { $$ = {
        text: $1.text + " " + $2 + $3 + $4 + $5 + $5 + $6 + $7 + $8.text + $9,
        escritura: 0
    }; }
    | tipo_restriccion 'IDENTIFICADOR' '=' 'valores_arreglo' ';' { $$ = {
        text: $1.text + " " + $2 + $3 + $4.text + $5,
        escritura: 0
    }; };

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
        nodo: (new aritmetica($1.nodo, $3.nodo, operacion_aritmetica.SUMA, @1.first_line, @1.first_column))
    }; }
    | expresion '-' expresion { $$ = {
        nodo: (new aritmetica($1.nodo, $3.nodo, operacion_aritmetica.RESTA, @1.first_line, @1.first_column))
    }; }
    | expresion '*' expresion { $$ = {
        nodo: (new aritmetica($1.nodo, $3.nodo, operacion_aritmetica.MULTIPLICACION, @1.first_line, @1.first_column))
    }; }    
    | expresion '/' expresion { $$ = {
        nodo: (new aritmetica($1.nodo, $3.nodo, operacion_aritmetica.DIVISION, @1.first_line, @1.first_column))
    }; }
    | expresion '%' expresion { $$ = {
        nodo: (new aritmetica($1.nodo, $3.nodo, operacion_aritmetica.MODULO, @1.first_line, @1.first_column))
    }; }
    | expresion '**' expresion { $$ = {
        nodo: (new aritmetica($1.nodo, $3.nodo, operacion_aritmetica.POTENCIA, @1.first_line, @1.first_column))
    }; }
    | dato_valor '++' { $$ = {
        nodo: (new aritmetica_unitaria($1.nodo, operacion_unitaria.INCREMENTO, $1.id, @1.first_line, @1.first_column))
    }; }
    | dato_valor '--' { $$ = {
        nodo: (new aritmetica_unitaria($1.nodo, operacion_unitaria.DECREMENTO, $1.id, @1.first_line, @1.first_column))
    }; }
    | '-' expresion { $$ = {
        nodo: (new aritmetica($2.nodo, null, operacion_aritmetica.NEGAR, @1.first_line, @1.first_column))
    }; } 
    | expresion '<' expresion { $$ = {
        nodo: (new relacional($1.nodo, $3.nodo, operacion_relacional.MENOR, @1.first_line, @1.first_column))
    }; }
    | expresion '>' expresion { $$ = {
        nodo: (new relacional($1.nodo, $3.nodo, operacion_relacional.MAYOR, @1.first_line, @1.first_column))
    }; }
    | expresion '<=' expresion { $$ = {
        nodo: (new relacional($1.nodo, $3.nodo, operacion_relacional.MENOR_IGUAL, @1.first_line, @1.first_column))
    }; }
    | expresion '>=' expresion { $$ = {
        nodo: (new relacional($1.nodo, $3.nodo, operacion_relacional.MAYOR_IGUAL, @1.first_line, @1.first_column))
    }; }
    | expresion '!=' expresion { $$ = {
        nodo: (new relacional($1.nodo, $3.nodo, operacion_relacional.NO_IGUAL, @1.first_line, @1.first_column))
    }; }
    | expresion '==' expresion { $$ = {
        nodo: (new relacional($1.nodo, $3.nodo, operacion_relacional.IGUAL, @1.first_line, @1.first_column))
    }; }
    | expresion '||' expresion { $$ = {
        nodo: (new logica($1.nodo, $3.nodo, operacion_logica.OR, @1.first_line, @1.first_column))
    }; }
    | expresion '&&' expresion { $$ = {
        nodo: (new logica($1.nodo, $3.nodo, operacion_logica.AND, @1.first_line, @1.first_column))
    }; }
    | '!' expresion { $$ = {
        nodo: (new logica($2.nodo, null, operacion_logica.NEGAR, @1.first_line, @1.first_column))
    }; }
    | dato_valor { $$ = $1; };

dato_valor
    : '(' expresion ')' { $$ = $2; }
    | 'ENTERO' { $$ = {
        nodo: (new dato_literal($1, 0, @1.first_line, @1.first_column))
    }; }
    | 'DECIMAL' { $$ = {
        nodo: (new dato_literal($1, 0, @1.first_line, @1.first_column))
    }; }
    | 'CADENA' { $$ = {
        nodo: (new dato_literal($1.replace(/\"/g,""), 1, @1.first_line, @1.first_column))
    }; }
    | 'IDENTIFICADOR' { $$ = {
        nodo: (new acceso($1, @1.first_line, @1.first_column)),
        id: $1
    }; }
    | 'TRUE' {  $$ = {
        nodo: (new dato_literal($1, 2, @1.first_line, @1.first_column))
    }; }
    | 'FALSE' { $$ = {
        nodo: (new dato_literal($1, 2, @1.first_line, @1.first_column))
    }; }
    | llamada { $$ = $1; };

llamada
    : 'IDENTIFICADOR' '(' ')' { $$ = {
        nodo: (new llamada_($1, [], @1.first_line, @1.first_column))
    }; }
    | 'IDENTIFICADOR' '(' lista_exp_par ')' { $$ = {
        nodo: (new llamada_($1, $3, @1.first_line, @1.first_column))
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
    : 'IF' '(' expresion ')' statement else { $$ = {
        nodo: (new if_($3.nodo, $5.nodo, $6.nodo, @1.first_line, @1.first_column))
    }; };

else
    : 'ELSE' if { $$ = $2; }
    | 'ELSE' statement { $$ = $2; }
    | /* epsilon */ { $$ = {
        text: ""
    }; };

statement
    : '{' instrucciones '}' { $$ = {
       nodo: (new instrucciones_($2,  @1.first_line, @1.first_column))
    }; }
    | '{' '}' { $$ = {
        nodo: (new instrucciones_(new Array(),  @1.first_line, @1.first_column))
    }; };

statement_switch
    : instrucciones { $$ = {
        nodo: (new instrucciones_($1,  @1.first_line, @1.first_column))
    }; };

while
    : 'WHILE' '(' expresion ')' statement { $$ = {
        nodo: (new while_($3.nodo, $5.nodo, @1.first_line, @1.first_column))
    }; };

do_while
    : 'DO' statement 'WHILE' '(' expresion ')' ';' { $$ = {        
        nodo: (new dowhile_($5.nodo, $2.nodo, @1.first_linea, @1.first_column))
    }; };

switch
    : 'SWITCH' '(' expresion ')' '{' cases '}' { $$ = {
        nodo: (new switch_($3.nodo, $6, @1.first_line, @1.first_column))
    }; };

cases 
    : cases case { $1.push($2); $$ = $1; }
    | case { $$ = [$1]; };

case
    : 'CASE' expresion ':' statement_switch { $$ = {
        nodo: (new case_($2.nodo, $4.nodo, @1.first_line, @1.first_column))
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
        nodo: (new for_($4.nodo, $6.nodo, $3.nodo, $8.nodo, $3.id, @1.first_line, @1.first_column))
    }; }
    | 'FOR' '(' asignacion expresion ';' expresion ')' statement { $$ = {
        nodo: (new for_($4.nodo, $6.nodo, $3.nodo, $8.nodo, $3.id, @1.first_line, @1.first_column))
    }; }
    | 'FOR' '(' 'IDENTIFICADOR' ';' expresion ';' expresion ')' statement { $$ = {
        nodo: (new for_($5.nodo, $7.nodo, null, $9.nodo, $3, @1.first_line, @1.first_column))
    }; };

sentencia_return
    :'RETURN' ';' { $$ = {
        nodo: (new return_(null, @1.first_line, @1.first_column))
    }; }
    |'RETURN' expresion ';' {  $$ = {
        nodo: (new return_($2.nodo, @1.first_line, @1.first_column))
    }; };

declaracion_funciones
    : 'FUNCTION' 'IDENTIFICADOR' '(' parametros ')' ':' tipo_dato statement { $$ = {
        nodo: (new function_($2, $8.nodo, $4, @1.first_line, @1.first_column, $7))
    }; }
    | 'FUNCTION' 'IDENTIFICADOR' '(' ')' ':' tipo_dato statement { $$ = {
        nodo: (new function_($2, $7.nodo, [], @1.first_line, @1.first_column, $6))
    }; }; 

parametros
    : parametros ',' parametro { $1.push($3); $$ = $1; }
    | parametro { $$ = [$1]; };

parametro
    : 'IDENTIFICADOR' ':' tipo_dato { $$ = {
        id: $1,
        tipo: $3
    }; };