//Utilizamos DOMContentLoaded como evento para comprobar que el DOM esté cargado y poder recoger los nodos con el querySelector
document.addEventListener("DOMContentLoaded", () => {
    let colorActivo = "color1"; //Asignamos un color por defecto, además es una variable global que nos indica el color activo
    let pintarActivado = false; //Variable global que nos indica si el pincel está activado
    const tablaColores = document.querySelector("#paleta");
    const elementos = document.querySelectorAll("#paleta tr:first-child td");
    //Llamamos a la función para dibujar el tablero
    dibujarTableroDibujo();
    //recogemos el selector de la tabla creada
    const tablero = document.querySelector("#tablero");

    //Para cada uno de los colores de la paleta asignamos un evento click
    for (let i = 0; i < elementos.length; i++) {
        elementos[i].addEventListener("click", detectarColorPaleta);
    }

    //Recogemos todos los tds de la tabla creada
    const celdasTablero = tablero.getElementsByTagName("td");

    //Creamos un evento para activar la pintura en las celdas recogidas
    for (let i = 0; i < celdasTablero.length; i++) {
        celdasTablero[i].addEventListener("click", activarPintura);
    }

    //Creamos un evento para cada uno de los tds si se pasa el raton por encima llama a la funcion pintar
    for (let i = 0; i < celdasTablero.length; i++) {
        celdasTablero[i].addEventListener("mouseover", pintar);
    }

    /**
     * Funcion que dibuja el tablero de 30*30 y lo añade al DOM
     */
    function dibujarTableroDibujo() {
        const zonadibujo = document.querySelector("#zonadibujo");
        const nuevaTabla = document.createElement("table");
        nuevaTabla.setAttribute("border", "1");
        nuevaTabla.setAttribute("id", "tablero");
        nuevaTabla.setAttribute("class", "tablerodibujo");
        const tituloTabla = document.createElement("caption");
        let contenidoTitulo = document.createTextNode("Haga CLICK en cualquier celda para activar/desactivar el Pincel");
        tituloTabla.appendChild(contenidoTitulo);
        nuevaTabla.appendChild(tituloTabla);

        for (let i = 1; i <= 30; i++) {
            let nuevaFila = document.createElement("tr");
            for (let j = 1; j <= 30; j++) {
                let nuevaCelda = document.createElement("td");
                nuevaFila.appendChild(nuevaCelda);
            }
            nuevaTabla.appendChild(nuevaFila);
        }
        zonadibujo.appendChild(nuevaTabla);
    }

    /**
     * Funcion que detecta el color de la paleta, va añadiendo y eliminando la clase segun la selecciones
     */
    function detectarColorPaleta() {
        const elementos = document.querySelectorAll(
            "#paleta tr:first-child td"
        );
        for (let i = 0; i < elementos.length; i++) {
            elementos[i].classList.remove("seleccionado");
        }
        colorActivo = this.classList[0];
        this.classList.add("seleccionado");
    }

    /**
     * Función que activa o desactiva el pincel
     */
    function activarPintura() {
        const pincel = document.querySelector("#pincel");
        if (pintarActivado) {
            pincel.childNodes[0].nodeValue = "PINCEL DESACTIVADO...";
            pintarActivado = false;
        } else {
            pincel.childNodes[0].nodeValue = "PINCEL ACTIVADO...";
            pintarActivado = true;

            this.classList.add(colorActivo); // Para el primer elemento
        }
    }

    /**
     * Función para pintar con el color seleccionado y si el pincel está activo
     */
    function pintar() {
        nuevo = colorActivo;
        if (pintarActivado) {
            for (let i = 0; i < this.classList.length; i++) {
                this.classList.remove(this.classList[i]);
            }
            this.classList.add(colorActivo);
        }
    }
});
