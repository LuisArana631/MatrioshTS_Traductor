/*  IMPORTS */
{
    
}

/* LEXICO */
%lex
%%

/* ESPACIO EN BLANCO */
\s+ /* IGNORAR */

/* COMENTARIOS */
"//".* /* IGNORAR COMENTARIO */
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] /* IGNORAR COMENTARIO */

/* TIPO DE DATO */
"string" return 'RSTRING';
"number" return 'RNUMBER';
"boolean" return 'RBOOLEAN';
"void" return 'RVOID';
"types" return 'RTYPES';

/* SECUENCIAS DE ESCAPE */
[\]["] return 'COMILLADOBLE';
[\][\] return 'BARRADOBLE';
[\][n] return 'SALTOLINEA';
[\][t] return 'TABULACION';
[\][r] return 'RETORNO';

/* OPERACIONES ARITMETICAS */
"+" return 'SUMA';
"-" return 'RESTA';
"*" return 'MULTIPLICACION';
"/" return 'DIVISION';
"**" return 'POTENCIA';
"%" return 'MODULO';
"++" return 'INCREMENTO';
"--"  return 'DECREMENTO';

/* OPERACIONES RELACIONALES */
">" return 'MAYOR';
"<" return 'MENOR';
">=" return 'MAYORIGUAL';
"<=" return 'MENORIGUAL';
"==" return 'IGUALDAD';
"!=" return 'DIFERENCIA';

/* OPERACIONES LOGICAS */
"&&" return 'AND';
"||" return 'OR';
"!" return 'NOT';
"?" return 'TERNARIO';

/* PALABRAS RESERVADAS */
"break" return 'RBREAK';
"continue" return 'RCONTINUE';
"return" return 'RRETURN';
"if" return 'RIF';
"else" return 'RELSE';
"switch" return 'RSWITCH';
"while" return 'RWHILE';
"do" return 'RDO';
"for" return 'RFOR';
"in" return 'RIN';
"of" return 'ROF';
"case" return 'RCASE';
"function" return 'RFUNCTION';
"console.log" return 'RPRINT';
"graficar_ts" return 'RGRAFICAR';
"true" return 'RTRUE';
"false" return 'RFALSE';
"pop" return 'RPOP';
"push" return 'RPUSH';
"length" return 'RLENGTH';

/* CARACTERES ESPECIALES */
"{" return 'LLAVEIZQ';
"}" return 'LLAVE DER';
"[" return 'CORIZQ';
"]" return 'CORDER';
"=" return 'IGUAL';
"," return 'COMA';
";" return 'PUNTOCOMA';
":" return 'DOSPUNTOS';
"(" return 'PARIZQ';
")" return 'PARDER';

/* IDENTIFICADORES */
([a-zA-Z_])[a-zA-Z0-9_]* return 'IDENTIFICADOR';

/* NUMEROS */
[0-9]+("."[0-9]+)? return 'DECIMAL';
[0-9] return 'NUMERO';

<<EOF>> return 'EOF';

. ERROR

/lex

%left 'OR'
%left 'AND'
%left 'IGUALDAD', 'DIFERENCIA'
%left 'MAYORIGUAL', 'MENORIGUAL', 'MAYOR', 'MENOR'
%left 'SUMA', 'RESTA'
%left 'MULTIPLICACION', 'DIVISION', 'POTENCIA', 'MODULO'
%left 'PARDER', 'PARIZQ'

/* SINTACTICO */
%start ini
%%

ini
    :instrucciones EOF { return $1; };

instrucciones
    :instrucciones instruccion { $1.push($2); $$ = $1; }
    |instrccion { $$ = [$1]; };

instruccion
    :sentencia_if {}
    |sentencia_while {}
    |sentencia_do {}
    |sentencia_switch {}
    |declaracion {}
    |funcion {}
    |llamada {}