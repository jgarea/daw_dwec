const botonEnviar = document.getElementById("botonEnviar");
const botonReset  = document.getElementById("botonReset");
const parrafo     = document.getElementById('parrafo1');
const entrada     = document.getElementById('entrada1');   

botonEnviar.addEventListener('click', dibujarCuadrado);
botonReset.addEventListener('click', borrarCuadrado);



function dibujarCuadrado() {
    const numero = Number(entrada.value);
    //let cadena = '';
    let cont=1; 
    if ( numero >= 1 && numero <= 8) {
        //cadena = ("<table>");
        fibonacci=[];
        for (let fila = 1; fila <= numero; fila++) {
            //cadena += ("<tr>");
            for (let columna = 1; columna <= numero; columna++) {
                if ( fila    == 1 || fila    == numero ||
                     columna == 1 || columna == numero) {
                        fibonacci.push(calcularFibonacciRecursiva(cont));
                        cont++;
                     }
                    }
        }
        let max=Math.max(...fibonacci).toString().length;
        console.log(max);

        cont=1;
        for (let fila = 1; fila <= numero; fila++) {
            //cadena += ("<tr>");
            for (let columna = 1; columna <= numero; columna++) {
                if ( fila    == 1 || fila    == numero ||
                     columna == 1 || columna == numero) {
                       // if(cont <10){
                        parrafo.innerText += (espaciar(fibonacci[cont-1],max));
                        parrafo.innerText +="\u00a0";
                        //}

                        // else if (cont<100){
                        //     parrafo.innerText += ('\u00a0' + '\u00a0' + '\u00a0'+ calcularFibonacciRecursiva(cont));
                        // }

                        // else if (cont<1000){
                        //     parrafo.innerText += ('\u00a0' + '\u00a0'+ calcularFibonacciRecursiva(cont));
                        // }
                         
                        // else if (cont<10000){
                        //     parrafo.innerText += ('\u00a0' + calcularFibonacciRecursiva(cont));
                        // }
        
                        // else{
                        //     parrafo.innerText += calcularFibonacciRecursiva(cont);
                        // }
                    
                    cont++;
                } else {
                    parrafo.innerText += espaciarEspacios("",max);
                    parrafo.innerText +="\u00a0";
                    //cadena += ("<td></td>");
                }
            }
            //cadena += ("</tr>");
            parrafo.innerText += '\n';
        }
        //cadena += ("</table>");
        //parrafo.innerHTML = cadena;
        entrada.focus();
    } else {
        alert("Por favor, introduce un número comprendido entre 1 y 8, ambos incluidos");
    }
}

function borrarCuadrado() {
    parrafo.innerText = '';
}


/*
 *  función que calcula el Fibonacci de manera Recursiva
 *
*/
function calcularFibonacciRecursiva (termino) {
    if ( termino < 2 ) {
        return termino;
    } else {
        return  calcularFibonacciRecursiva(termino - 1) + calcularFibonacciRecursiva(termino - 2);
    }
}




function espaciar(numero,ancho) {
    const nbs = "-";
    //const nbs = "\u00a0";
    return nbs.repeat(ancho - numero.toString().length)+numero;
}
function espaciarEspacios(numero,ancho) {
    //const nbs = "-";
    const nbs = "\u00a0";
    return nbs.repeat(ancho - numero.toString().length)+numero;
}

