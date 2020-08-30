%{
    const { nodoError } = require('../js/error/error');
    const { errores } = require('../js/error/errores');
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

/* SECUENCIAS DE ESCAPE */
{saltolinea}            return 'SALTOLINEA'
{tabulador}             return 'TABULADOR'
{retornocarro}          return 'RETORNOCARRO'
{barrainvertida}        return 'BARRAINVERTIDA'
{comillasimple}         return 'COMILLASIMPLE'
{comilladoble}          return 'COMILLADOBLE'

/* CADENAS */
{cadenadoble}           { yytext = yytext.substr( 1 , yyleng-2 ); return 'CADENA'; }
{cadenasimple}          { yytext = yytext.substr( 1 , yyleng-2 ); return 'CADENA'; }     

/* TIPOS DE DATOS */
"string"                return 'STRING'
"number"                return 'NUMBER'
"boolean"               return 'BOOLEAN'
"void"                  return 'VOID'
"types"                 return 'TYPES'

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
"break"                 return 'BEARK'
"continue"              return 'CONTINUE'
"return"                return 'RETURN'
"function"              return 'FUNCTION'
"console.log"           return 'PRINT'
"graficar_ts"           return 'GRAFICAR'

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
{entero}                return 'ENTERO'
{decimal}               return 'DECIMAL'
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
    | error { errores.addError(new nodoError("Sintáctico","Se esperaba una instrucción y se encontró ",this._$.first_line,this._$.first_column,$1)); $$ = undefined; };

declaracion_variables 
    : tipo_restriccion 'IDENTIFICADOR' ';' { $$ = {
        text: $1 + " " + $2 + $3 + "\n"
    }; }
    | tipo_restriccion 'IDENTIFICADOR' '=' expresion ';' { $$ = {
        text: $1 + " " + $2 + " " + $3 + " " + $4.text + $5 + "\n"
    }; }
    | tipo_restriccion 'IDENTIFICADOR' ':' tipo_dato ';' { $$ = {
        text: $1 + " " + $2 + $3 + $4 + $5 + "\n"
    }; }
    | tipo_restriccion 'IDENTIFICADOR' ':' tipo_dato '=' expresion ';' { $$ = {
        text: $1 + " " + $2 + $3 + $4 + " " + $5 + " " + $6.text + $7 + "\n"        
    }; }; 

expresion
    : expresion '+' expresion { $$ = {
        text: $1.text + $2 + $3.text
    }; }
    | expresion '-' expresion { $$ = {
        text: $1.text + $2 + $3.text
    }; }
    | expresion '*' expresion { $$ = {
        text: $1.text + $2 + $3.text
    }; }
    | expresion '/' expresion { $$ = {
        text: $1.text + $2 + $3.text
    }; }
    | expresion '%' expresion { $$ = {
        text: $1.text + $2 + $3.text
    }; }
    | expresion '**' expresion { $$ = {
        text: $1.text + $2 + $3.text
    }; }
    | 'IDENTIFICADOR' '++' { $$ = {
        text: $1 + $2
    }; }
    | 'IDENTIFICADOR' '--' { $$ = {
        text: $1 + $2
    }; }
    | '-' expresion { $$ = {
        text: $1 + $2.text
    }; } 
    | expresion '<' expresion { $$ = {
        text: $1.text + $2 + $3.text
    }; }
    | expresion '>' expresion { $$ = {
        text: $1.text + $2 + $3.text
    }; }
    | expresion '<=' expresion { $$ = {
        text: $1.text + $2 + $3.text
    }; }
    | expresion '>=' expresion { $$ = {
        text: $1.text + $2 + $3.text
    }; }
    | expresion '!=' expresion { $$ = {
        text: $1.text + $2 + $3.text
    }; }
    | expresion '==' expresion { $$ = {
        text: $1.text + $2 + $3.text
    }; }
    | expresion '||' expresion { $$ = {
        text: $1.text + $2 + $3.text
    }; }
    | expresion '&&' expresion { $$ = {
        text: $1.text + $2 + $3.text
    }; }
    | '!' expresion { $$ = {
        text: $1 + $2.text
    }; }
    | dato_valor { $$ = $1; };

dato_valor
    : '(' expresion ')' { $$ = {
        text: $1 + $2.text + $3
    }; }
    | 'ENTERO' { $$ = {
        text: $1
    }; }
    | 'DECIMAL' { $$ = {
        text: $1
    }; }
    | 'CADENA' { $$ = {
        text: $1
    }; }
    | 'IDENTIFICADOR' { $$ = {
        text: $1
    }; }
    | llamada { $$ = $1; };

llamada
    : 'IDENTIFICADOR' '(' ')' { $$ = {
        text: $1 + $2 + $3
    }; }
    | 'IDENTIFICADOR' '(' parametros ')' { $$ = {
        text: $1 + $2 + $3 + $4
    }; };

tipo_restriccion
    : 'LET' { $$ = $1; }
    | 'CONST' { $$ = $1; };

tipo_dato
    : 'NUMBER' { $$ = $1; }
    | 'STRING' { $$ = $1; }
    | 'VOID' { $$ = $1; }
    | 'BOOLEAN' { $$ = $1; }
    | 'TYPES' { $$ = $1; }
    | 'IDENTIFICADOR' { $$ = $1; };
