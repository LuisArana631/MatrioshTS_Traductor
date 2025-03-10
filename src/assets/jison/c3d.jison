%{
    //ERRORES
    const { nodoError } = require('../js/error/error');
    const { errores } = require('../js/error/errores');

    //INSTRUCCIONES
    const { declaracion_ } = require('../js/c3d/instrucciones/variables/declaracion');
    const { statement_ } = require('../js/c3d/instrucciones/statement');
    const { if_c3d } = require('../js/c3d/instrucciones/if');
    const { while_c3d } = require('../js/c3d/instrucciones/while');
    const { do_while_c3d } = require('../js/c3d/instrucciones/do_while');
    const { print_ } = require('../js/c3d/instrucciones/print');
    const { asignar_ } = require('../js/c3d/instrucciones/variables/asignacion');
    const { for_c3d } = require('../js/c3d/instrucciones/for');
    const { case_c3d } = require('../js/c3d/instrucciones/case');
    const { switch_c3d } = require('../js/c3d/instrucciones/switch');
    const { break_c3d } = require('../js/c3d/instrucciones/break');
    const { function_c3d } = require('../js/c3d/instrucciones/function');
    const { continue_c3d } = require('../js/c3d/instrucciones/continue');
    const { call_c3d } = require('../js/c3d/instrucciones/call');
    const { return_c3d } = require('../js/c3d/instrucciones/return');

    //EXPRESIONES
    const { suma } = require('../js/c3d/expresion/suma');
    const { resta } = require('../js/c3d/expresion/resta');
    const { multiplicacion } = require('../js/c3d/expresion/multiplicacion');
    const { dividir } = require('../js/c3d/expresion/dividir');
    const { modulo } = require('../js/c3d/expresion/modulo');
    const { oper_rel, relacionales } = require('../js/c3d/logicas/relacional');
    const { oper_logica, logicas_ } = require('../js/c3d/logicas/logicas_');
    const { incremento } = require('../js/c3d/expresion/incremento');
    const { decremento } = require('../js/c3d/expresion/decremento');
    const { negativo_ } = require('../js/c3d/expresion/negativo');
    const { potencia_ } = require('../js/c3d/expresion/potencia');

    //DATOS 
    const { primitivo_ } = require('../js/c3d/expresion/acceso');
    const { string_c3d } = require('../js/c3d/expresion/string_c3d');
    const { tipos_ } = require('../js/c3d/tools/tipo');
    const { acceso_ } = require('../js/c3d/instrucciones/variables/acceder');
//--------------------------------------------------------------------------------------
    //INSTRUCCIONES
    const { break_ } = require('../js/instruccion/break');
    const { continue_ } = require('../js/instruccion/continue');
    const { return_ } = require('../js/instruccion/return');
    const { function_ } = require('../js/instruccion/function');
    const { llamada_ } = require('../js/instruccion/llamada');
    const { arreglo } = require('../js/instruccion/arreglo');
    const { length_ } = require('../js/instruccion/length');
    const { pop_ } = require('../js/instruccion/pop');
    const { push_ } = require('../js/instruccion/push');
%}

%lex
%options case-insensitive

/* DATOS */
entero  [0-9]+
decimal [0-9]+"."[0-9]+
identificador ([a-zA-Z_])[a-zA-Z0-9_]*

%%
\s+                   /* EVITAR ESPACIOS EN BLANCO */

/* COMENTARIOS */
"//".* /* IGNORAR COMENTARIO */
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] /* IGNORAR COMENTARIO */   

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
"new"                   return 'NEW'
"CharAt"                return 'CHARAT'
"ToLowerCase"           return 'TOLOWERCASE'
"ToUpperCase"           return 'TOUPPERCASE'
"Concat"                return 'CONCAT' 
"null"                  return 'NULL'

"true"                  return 'TRUE'
"false"                 return 'FALSE'

/* DATOS */
{decimal}               return 'DECIMAL'
{entero}                return 'ENTERO'

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


{identificador}         return 'IDENTIFICADOR'

[\']([^\t\'\"\n]|(\\\")|(\\n)|(\\\')|(\\t))*[\'] { yytext = yytext.substr(1,yyleng-2).replace("\\n", "\n").replace("\\t", "\t").replace("\\r", "\r").replace("\\\\", "\\").replace("\\\"", "\""); return 'CADENA'; }

\"[^"]*\" { yytext = yytext.replace("\\n", "\n").replace("\\t", "\t").replace("\\r", "\r").replace("\\\\", "\\").replace("\\\"", "\""); return 'CADENA'; }

{booleano}              return 'BOOLEANO'

<<EOF>>		            return 'EOF'

.                       errores.addError(new nodoError("Lexico","Caracter desconocido",yylloc.first_line, yylloc.first_column, yytext))

/lex

%right '='
%nonassoc '++' '--'
%left '||'
%left '&&'
%left '==' '!='
%nonassoc '>=' '<=' '<' '>'
%left '+' '-'
%left '*' '/' '%' 
%left '**'
%right '!' 
%left '(' ')' '[' ']' '{' '}'


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
        nodo: (new incremento($1.nodo, $1.id, @1.first_line, @1.first_column)),

        tipo: "incremento",
        expresion: {
            izquierdo: $1.expresion,
            operador: $2
        }
    }; }
    | dato_valor '--' ';' { $$ = {
        nodo: (new decremento($1.nodo, $1.id, @1.first_line, @1.first_column)),

        tipo: "decremento",
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
        nodo: (new break_c3d(@1.first_line, @1.first_column)),

        tipo: "break"
    }; }
    | 'CONTINUE' ';' { $$ = {
        nodo: (new continue_c3d(@1.first_line, @1.first_column)),
        
        tipo: "continue"
    }; }
    | sentencia_return { $$ = $1; }
    | 'GRAFICAR' '(' ')' ';' { $$ = {
        text: $1 + $2 + $3 + $4,
        escritura: 0
    }; }
    | 'PRINT' '(' expresion ')' ';' { $$ = {
        nodo: (new print_($3.nodo, @1.first_line, @1.first_column)),

        tipo: "print",
        expresion: $3.expresion
    }; }  
    | pop_funcion ';' { $$ = $1; }
    | push_funcion ';' { $$ = $1; }  
    | error { errores.addError(new nodoError("Sintáctico","Se esperaba una instrucción y se encontró ",this._$.first_line,this._$.first_column,$1)); $$ = undefined; };

asignacion     
    : 'IDENTIFICADOR' '=' expresion ';' { $$ = {
        nodo: (new asignar_($3.nodo, $1, @1.first_line, @1.first_column)),        
        
        tipo: "asignar",
        expresion: $3.expresion,
        id: $1
    }; };

declaracion_variables
    : tipo_restriccion 'IDENTIFICADOR' ':' tipo_dato ';' { $$ = {
        nodo: (new declaracion_($4.nodo, $2, $1, null, @1.first_line, @1.first_column)),

        tipo: "declaracion_variable",
        restriccion: $1,
        id: $2
    }; }
    | tipo_restriccion 'IDENTIFICADOR' ':' tipo_dato '=' expresion ';' { $$ = {
        nodo: (new declaracion_($4.nodo, $2, $1, $6.nodo, @1.first_line, @1.first_column)),

        tipo: "declaracion_variable",
        restriccion: $1,
        id: $2,
        expresion: $6.expresion
    }; };

length_funcion
    : 'IDENTIFICADOR' '.' 'LENGTH' { $$ = {
        nodo: (new length_($1, @1.first_line, @1.first_column))
    }; };

pop_funcion
    : 'IDENTIFICADOR' '.' 'POP' '(' ')' { $$ = {
        nodo: (new pop_($1, @1.first_linea, @1.first_column))
    }; };

push_funcion
    : 'IDENTIFICADOR' '.' 'PUSH' '(' expresion ')' { $$ = {
        nodo: (new push_($1, $5.nodo, @1.first_linea, @1.first_column))
    }; };

declaracion_arreglos
    : tipo_restriccion 'IDENTIFICADOR' ':' tipo_dato lista_dimensiones ';' { $$ = {
        nodo: (new arreglo($2, null, @1.first_linea, @1.first_column, $4.dato, $1)),

        tipo: "arreglo",
        id:  $2
    };  }
    | tipo_restriccion 'IDENTIFICADOR' ':' tipo_dato lista_dimensiones '=' '[' 'valores_arreglo' ']' ';' { $$ = {
        nodo: (new arreglo($2, $8, @1.first_linea, @1.first_column, $4.dato, $1)),        

        tipo: "arreglo",
        id:  $2
    }; }
    | tipo_restriccion 'IDENTIFICADOR' ':' tipo_dato lista_dimensiones  '=' lista_dimensiones ';' { $$ = {
        nodo: (new arreglo($2, null , @1.first_linea, @1.first_column, $4.dato, $1)),

        tipo: "arreglo",
        id:  $2
    }; };

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
        text: $1 + $2 + $3.dato + $4,
        escritura: 0
    }; };

expresion
    : expresion '+' expresion { $$ = {
        nodo: (new suma($1.nodo, $3.nodo, @1.first_line, @1.first_column)),

        expresion: {
            izquierdo: $1.expresion,
            derecho: $3.expresion,
            operador: $2
        }
    }; }
    | expresion '-' expresion { $$ = {
        nodo: (new resta($1.nodo, $3.nodo, @1.first_line, @1.first_column)),

        expresion: {
            izquierdo: $1.expresion,
            derecho: $3.expresion,
            operador: $2
        }
    }; }
    | expresion '*' expresion { $$ = {
        nodo: (new  multiplicacion($1.nodo, $3.nodo, @1.first_line, @1.first_column)),

        expresion: {
            izquierdo: $1.expresion,
            derecho: $3.expresion,
            operador: $2
        }
    }; }  
    | expresion '/' expresion { $$ = {
        nodo: (new dividir($1.nodo, $3.nodo, @1.first_line, @1.first_column)),

        expresion: {
            izquierdo: $1.expresion,
            derecho: $3.expresion,
            operador: $2
        }
    }; }
    | expresion '%' expresion { $$ = {
        nodo: (new modulo($1.nodo, $3.nodo, @1.first_line, @1.first_column)),

        expresion: {
            izquierdo: $1.expresion,
            derecho: $3.expresion,
            operador: $2
        }
    }; }
    | expresion '**' expresion { $$ = {
        nodo: (new potencia_($1.nodo, $3.nodo, @1.first_line, @1.first_column)),

        expresion: {
            izquierdo: $1.expresion,
            derecho: $3.expresion,
            operador: $2
        }
    }; }

    | dato_valor '++' { $$ = {
        nodo: (new incremento($1.nodo, $1.id, @1.first_line, @1.first_column)),

        expresion: {
            izquierdo: $1.expresion,
            operador: $2
        }
    }; }
    | dato_valor '--' { $$ = {
        nodo: (new decremento($1.nodo, $1.id, @1.first_line, @1.first_column)),

        expresion: {
            izquierdo: $1.expresion,
            operador: $2
        }
    }; }
    | '-' expresion { $$ = {
        nodo: (new negativo_($2.nodo, @1.first_line, @1.first_column)),

        expresion: {
            izquierdo: $2.expresion,
            operador: $1
        }
    }; } 
    | expresion '<' expresion { $$ = {
        nodo: (new relacionales($1.nodo, $3.nodo, oper_rel.MENOR, @1.first_line, @1.first_column)),

        expresion: {
            izquierdo: $1.expresion,
            derecho: $3.expresion,
            operador: $2
        }
    }; }
    | expresion '>' expresion { $$ = {
        nodo: (new relacionales($1.nodo, $3.nodo, oper_rel.MAYOR, @1.first_line, @1.first_column)),

        expresion: {
            izquierdo: $1.expresion,
            derecho: $3.expresion,
            operador: $2
        }
    }; }
    | expresion '<=' expresion { $$ = {
        nodo: (new relacionales($1.nodo, $3.nodo, oper_rel.MENOR_IGUAL, @1.first_line, @1.first_column)),

        expresion: {
            izquierdo: $1.expresion,
            derecho: $3.expresion,
            operador: $2
        }
    }; }
    | expresion '>=' expresion { $$ = {
        nodo: (new relacionales($1.nodo, $3.nodo, oper_rel.MAYOR_IGUAL, @1.first_line, @1.first_column)),

        expresion: {
            izquierdo: $1.expresion,
            derecho: $3.expresion,
            operador: $2
        }
    }; }
    | expresion '!=' expresion { $$ = {
        nodo: (new relacionales($1.nodo, $3.nodo, oper_rel.NO_IGUAL, @1.first_line, @1.first_column)),

        expresion: {
            izquierdo: $1.expresion,
            derecho: $3.expresion,
            operador: $2
        }
    }; }
    | expresion '==' expresion { $$ = {
        nodo: (new relacionales($1.nodo, $3.nodo, oper_rel.IGUAL, @1.first_line, @1.first_column)),

        expresion: {
            izquierdo: $1.expresion,
            derecho: $3.expresion,
            operador: $2
        }
    }; }
    | expresion '||' expresion { $$ = {
        nodo: (new logicas_($1.nodo, $3.nodo, oper_logica.OR, @1.first_line, @1.first_column)),

        expresion: {
            izquierdo: $1.expresion,
            derecho: $3.expresion,
            operador: $2
        }
    }; }
    | expresion '&&' expresion { $$ = {
        nodo: (new logicas_($1.nodo, $3.nodo, oper_logica.AND, @1.first_line, @1.first_column)),

        expresion: {
            izquierdo: $1.expresion,
            derecho: $3.expresion,
            operador: $2
        }
    }; }
    | '!' expresion { $$ = {
        nodo: (new logicas_($2.nodo, null, oper_logica.NEGAR, @1.first_line, @1.first_column)),

        expresion: {
            izquierdo: $2.expresion,
            operador: $1
        }
    }; }
    | dato_valor { $$ = $1; };

dato_valor
    : '(' expresion ')' { $$ = $2; }
    | 'ENTERO' { $$ = {
        nodo: (new primitivo_(0, $1, @1.first_line, @1.first_column)),

        expresion: {
            dato: $1,
            tipo: "number"
        }
    }; }
    | 'DECIMAL' { $$ = {
        nodo: (new primitivo_(0, $1, @1.first_line, @1.first_column)),

        expresion: {
            dato: $1,
            tipo: "number"
        }   
    }; }
    | 'CADENA' { $$ = {
        nodo: (new string_c3d(1, $1.replace(/\"/g,"").replace(/\'/g,""), @1.first_line, @1.first_column)),

        expresion: {
            dato: $1,
            tipo: "string"
        }
    }; }
    | 'IDENTIFICADOR' { $$ = {
        nodo: (new acceso_($1, @1.first_line, @1.first_column)),
        id: $1,
        
        expresion: {
            dato: $1,
            tipo: "variable"
        }
    }; }
    | 'TRUE' {  $$ = {
        nodo: (new primitivo_(2, true, @1.first_line, @1.first_column)),

        expresion: {
            dato: $1,
            tipo: "boolean"
        }
    }; }
    | 'FALSE' { $$ = {
        nodo: (new primitivo_(2, false, @1.first_line, @1.first_column)),

        expresion: {
            dato: $1,
            tipo: "boolean"
        }
    }; }
    | llamada { $$ = $1; }
    | length_funcion { $$ = $1; }
    | pop_funcion { $$ = $1; }
    | push_funcion { $$ = $1; };

llamada
    : 'IDENTIFICADOR' '(' ')' { $$ = {
        nodo: (new call_c3d($1, [], @1.first_line, @1.first_column)),
        expresion: {
            tipo: "llamada",
            param: [],
            escritura: 0,
            dato: $1
        }        
    }; }
    | 'IDENTIFICADOR' '(' lista_exp_par ')' { $$ = {
        nodo: (new call_c3d($1, $3, @1.first_line, @1.first_column)),
        expresion:{
            tipo: "llamada",
            param: $3,
            escritura: 5,
            dato: $1
        }        
    }; };

lista_exp_par
    : lista_exp_par ',' expresion { $1.push($3); $$ = $1; }
    | expresion { $$ = [$1]; };

tipo_restriccion
    : 'LET' { $$ = $1; }
    | 'CONST' { $$ = $1; };

tipo_dato
    : 'NUMBER' { $$ = {
        nodo: (new tipos_(0)),
        dato: $1
    }; }
    | 'STRING' { $$ = {
        nodo: (new tipos_(1)),
        dato: $1
    }; }
    | 'VOID' { $$ = {
        nodo: (new tipos_(3)),
        dato: $1
    }; }
    | 'BOOLEAN' { $$ = {
        nodo: (new tipos_(2)),
        dato: $1
    }; }
    | 'IDENTIFICADOR' { $$ = $1; };

if
    : 'IF' '(' expresion ')' statement else { $$ = {
        nodo: (new if_c3d($3.nodo, $5.nodo, $6.nodo, @1.first_line, @1.first_column)),

            tipo: "if_",
            condicion: $3.expresion,
            instrucciones: $5.instr,
            else: $6
    }; };

else
    : 'ELSE' if { $$ = $2; }
    | 'ELSE' statement { $$ = $2; }
    | /* epsilon */ { $$ = {
        text: ""
    }; };

statement
    : '{' instrucciones '}' { $$ = {
       nodo: (new statement_($2,  @1.first_line, @1.first_column)),
       instr: $2
    }; }
    | '{' '}' { $$ = {
        nodo: (new statement_(new Array(),  @1.first_line, @1.first_column)),
        instr: new Array()
    }; };

statement_switch
    : instrucciones { $$ = {
        nodo: (new statement_($1,  @1.first_line, @1.first_column)),
        instr: $1
    }; };

while
    : 'WHILE' '(' expresion ')' statement { $$ = {
        nodo: (new while_c3d($3.nodo, $5.nodo, @1.first_line, @1.first_column)),        

        tipo: "while_",
        cond: $3.expresion,
        instr: $5.instr
    }; };

do_while
    : 'DO' statement 'WHILE' '(' expresion ')' ';' { $$ = {        
        nodo: (new do_while_c3d($5.nodo, $2.nodo, @1.first_linea, @1.first_column)),        

        tipo: "dowhile_",
        cond: $5.expresion,
        instr: $2.instr
    }; };

switch
    : 'SWITCH' '(' expresion ')' '{' cases '}' { $$ = {
        nodo: (new switch_c3d($3.nodo, $6, @1.first_line, @1.first_column)),
        
        tipo: "switch_",
        instr: $6,
        cond: $3.expresion
    }; };

cases 
    : cases case { $1.push($2); $$ = $1; }
    | case { $$ = [$1]; };

case
    : 'CASE' expresion ':' statement_switch { $$ = {
        nodo: (new case_c3d($2.nodo, $4.nodo, @1.first_line, @1.first_column)),

        expresion: $2.expresion,
        instr: $4.instr
    }; }
    | 'DEFAULT' ':' statement_switch { $$ = {
        nodo: (new case_c3d(null, $3.nodo, @1.first_line, @1.first_column)),

        instr: $3.instr
    }; };

for_in
    :'FOR' '(' tipo_restriccion 'IDENTIFICADOR' 'IN' 'IDENTIFICADOR' ')' statement { $$ = {
        text: $1 + $2 + $3 + " " + $4 + " " + $5 + " " + $6 + $7,
        escritura: 1,
        instr: $8.instr
    }; };

for_of
    :'FOR' '(' tipo_restriccion 'IDENTIFICADOR' 'OF' 'IDENTIFICADOR' ')' statement { $$ = {
        text: $1 + " " + $2 + $3 + " " + $4 + " " + $5 + " " + $6 + $7,
        escritura: 1,
        instr: $8.instr
    }; };

for_normal
    :'FOR' '(' declaracion_variables expresion ';' expresion ')' statement { $$ = {
        nodo: (new for_c3d($4.nodo, $6.nodo, $3.nodo, $8.nodo, $3.id, @1.first_line, @1.first_column)),        

        tipo: "for_",
        instr: $8.instr
    }; }
    | 'FOR' '(' asignacion expresion ';' expresion ')' statement { $$ = {
        nodo: (new for_c3d($4.nodo, $6.nodo, $3.nodo, $8.nodo, $3.id, @1.first_line, @1.first_column)),        

        tipo: "for_",
        instr: $8.instr
    }; }
    | 'FOR' '(' 'IDENTIFICADOR' ';' expresion ';' expresion ')' statement { $$ = {
        nodo: (new for_c3d($5.nodo, $7.nodo, null, $9.nodo, $3, @1.first_line, @1.first_column)),
        
        tipo: "for_",
        instr: $9.instr
    }; };

sentencia_return
    :'RETURN' ';' { $$ = {
        nodo: (new return_c3d(null, @1.first_line, @1.first_column)),

        tipo: "return_"
    }; }
    |'RETURN' expresion ';' {  $$ = {
        nodo: (new return_c3d($2.nodo, @1.first_line, @1.first_column)),

        tipo: "return_",
        expresion: $2.expresion
    }; };

declaracion_funciones
    : 'FUNCTION' 'IDENTIFICADOR' '(' parametros ')' ':' tipo_dato statement { $$ = {
        nodo: (new function_c3d($2, $8.nodo, $4, $7.nodo, @1.first_line, @1.first_column)),

        tipo: "funcion",
        id: $2,
        param: $4,
        instr: $8.instr
    }; }
    | 'FUNCTION' 'IDENTIFICADOR' '(' ')' ':' tipo_dato statement { $$ = {
        nodo: (new function_c3d($2, $7.nodo, [], $6.nodo, @1.first_line, @1.first_column)),

        tipo: "funcion",
        id: $2,
        instr: $7.instr
    }; }; 

parametros
    : parametros ',' parametro { $1.push($3); $$ = $1; }
    | parametro { $$ = [$1]; };

parametro
    : 'IDENTIFICADOR' ':' tipo_dato { $$ = {
        id: $1,
        tipo: $3.nodo,
        tipos: $3.dato
    }; };