const botonEnviar = document.getElementById("botonEnviar");
const botonReset  = document.getElementById("botonReset");
const parrafo     = document.getElementById('parrafo1');
const entrada     = document.getElementById('entrada1');   

botonEnviar.addEventListener('click', dibujarRombo);
botonReset.addEventListener('click', borrarRombo);


// 
function dibujarRombo() {
    const numero      = Number(entrada.value);
    const medio       = Math.floor(numero / 2 + 1);
    let   largoFila   = medio;
    let cadena = '';
    parrafo.innerText = '';

    if ( (numero >= 1) && (numero < 20) && (numero % 2 != 0) ) {
        cadena += "<table>";
        for (let fila = 1; fila <= numero; fila++) {
            cadena += "<tr>";
            cadena += "<td></td>".repeat( Math.abs( medio - fila)); //PAra espacio en blanco \u00a0
            cadena += "<td>*</td>".repeat( fila <= medio ? 2 * fila - 1 : (numero - fila) * 2 + 1);
             //PAra salto de linea \n 
            cadena += "</tr>";
        }
        cadena += "</table>";
        parrafo.innerHTML = cadena;
        entrada.focus();
    } else {
        alert("Por favor, introduce un número impar comprendido entre 1 y 20, ambos incluidos");
    }
}

function borrarRombo() {
    parrafo.innerText = '';
}