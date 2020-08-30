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

%%
\s+                   /* EVITAR ESPACIOS EN BLANCO */

/* DATOS */
{entero}                return 'ENTERO'
{decimal}               return 'DECIMAL'
{identificador}         return 'IDENTIFICADOR'

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
"string"                return 'RSTRING'
"number"                return 'RNUMBER'
"boolean"               return 'RBOOLEAN'
"void"                  return 'RVOID'
"types"                 return 'RTYPES'


/* OPERACIONES ARITMETICAS */
"**"                    return 'POTENCIA'
"+"                     return 'SUMA'
"-"                     return 'RESTA'
"*"                     return 'MULTIPLICACION'
"/"                     return 'DIVISION'
"%"                     return 'MODULO'
"++"                    return 'INCREMENTO'
"--"                    return 'DECREMENTO'

/* OPERACIONES RELACIONALES */
">"                     return 'MAYOR'
"<"                     return 'MENOR'
">="                    return 'MAYORIGUAL'
"<="                    return 'MENORIGUAL'
"=="                    return 'IGUALDAD'
"!="                    return 'DIFERENCIA'

/* OPERACIONES LOGICAS */
"&&"                    return 'AND'
"||"                    return 'OR'
"!"                     return 'NOT'
"?"                     return 'TERNARIO'

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
"{"                     return 'LLAVEIZQ'
"}"                     return 'LLAVERDER'
"["                     return 'CORIZQ'
"]"                     return 'CORDER'
"="                     return 'IGUAL'
","                     return 'COMA'
";"                     return 'PUTOCOMA'
":"                     return 'DOSPUNTOS'
"("                     return 'PARIZQ'
")"                     return 'PARDER'

<<EOF>>		            return 'EOF'

.                       errores.addError(new nodoError("Lexico","Caracter desconocido",yylloc.first_line, yylloc.first_column, yytext, "-"))

/lex

%left 'OR'
%left 'AND'
%left 'IGUALDAD', 'DIFERENCIA'
%left 'MAYORIGUAL', 'MENORIGUAL', 'MENOR', 'MAYOR'
%left 'SUMA' 'RESTA'
%left 'MULTIPLICACION' 'DIVISION' 

%start init

%%

init    
    : instrucciones EOF { return $1; };

instrucciones
    : instrucciones instruccion { $1.push($2); $$ = $1; }
    | instruccion { $$ = [$1]; };

instruccion
    : declaracion { $$ = $1; }   
    | error { errores.addError(new nodoError("Sintáctico","Se esperaba una instrucción y se encontró ",this._$.first_line,this._$.first_column,$1, "Global")) };

declaracion
    : tipo_variable {  }
    | ;

tipo_variable
    : LET {  }
    | CONST {  };

tipo_dato
    : RSTRING   {  }
    | RNUMBER   {  }
    | RBOOLEAN  {  }
    | RVOID     {  };

