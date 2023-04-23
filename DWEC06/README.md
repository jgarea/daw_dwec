# ¿Qué te pedimos que hagas?
Queremos hacer una aplicación en JavaScript que simule un pequeño tablero de dibujo. Para ello tendrás que dibujar una tablero de 30 celdas x 30 celdas con cada celda de ancho 10 px y alto 10 px. Para realizar el tablero de dibujo tendrás que emplear obligatoriamente los métodos de creación de nodos del DOM. Una vez generado el tablero lo meterás dentro del div con id "zonadibujo". Además tendrás una paleta con 5 colores de dibujo (que ya está creada y se facilita con el código .html)

Se te facilitará un fichero .html y un fichero .css con los estilos que tendrás que utilizar. La programación de la aplicación JavaScript la tendrás que realizar en un fichero .js adicional.

Si se modifican los colores programados en los estilos CSS (color1 a color 6) la aplicación tendrá que seguir funcionando correctamente.

La forma de funcionamiento de la aplicación será la siguiente:

* Haremos click en alguno de los 5 colores de la paleta y se le asignará la clase "seleccionado".
* Una vez seleccionado un color de la paleta, haremos un click en una celda (que se pintará del color activo en la paleta) y desde ese momento al mover el ratón por el tablero pintará del color activo todas las celdas por las que vayamos pasando el ratón. En el momento que volvamos a hacer click en otra celda dejará de pintar.
* Podremos escoger un color diferente y repetir el proceso, incluso sobre celdas que ya han sido pintadas.
* Para borrar una celda pintaremos con el color blanco de la paleta.
* Cada vez que el pincel esté activado se mostrará un mensaje debajo de la paleta de colores indicando : PINCEL ACTIVADO o PINCEL DESACTIVADO.

```javascript
/////////////////////////////////////////////////////////
// Función getId -> Para ahorrarnos el tener que escribir
// document.getElementById("elemento") todo el rato.
/////////////////////////////////////////////////////////
function getId(elemento){
	return document.getElementById(elemento);
}
	
/////////////////////////////////////////////////////////
// Función cross-browser para añadir Eventos
/////////////////////////////////////////////////////////
var crearEvento = function(){
	function w3c_crearEvento(elemento, evento, mifuncion){
		elemento.addEventListener(evento, mifuncion, false);
	}
	
	function ie_crearEvento(elemento, evento, mifuncion){
		var fx = function(){
			mifuncion.call(elemento); 
		};
		
		// Enlazamos el evento con attachEvent. Cuando usamos attachEvent
		// dejamos de tener acceso al objeto this en mifuncion. Para solucionar eso
		// usaremos el método call() del objeto Function, que nos permitirá
		// asignar el puntero this para su uso dentro de la función. El primer
		// parámetro que pongamos en call será la referencia que se usará como 
		// objeto this dentro de nuestra función. De esta manera solucionamos el problema
		// de acceder a this usando attachEvent en Internet Explorer.
		
		elemento.attachEvent('on' + evento, fx);
	}

	if (typeof window.addEventListener !== 'undefined'){
		return w3c_crearEvento;
	}else if (typeof window.attachEvent !== 'undefined'){
		return ie_crearEvento;
	}
}();	// <= Esta es la parte más crítica - tiene que terminar en ()



//////////////////////////////////////////////////////////////////
// función iniciar -- hace las llamadas al dibujo del tablero
// y además asigna los eventos de click correspondientes.
//////////////////////////////////////////////////////////////////
function iniciar(){	
	// Dibujamos la tabla dónde pintaremos con el ratón
	dibujarTableroDibujo();
	
	// A la tabla de colores le asignamos el evento de click para seleccionar un color.
	var tablaColores=getId("paleta");
	
	var celdasColores=tablaColores.getElementsByTagName("td");
	for (var i=0;i<celdasColores.length;i++){
		crearEvento(celdasColores[i],"click",detectarColorPaleta);
	}

	// Ponemos como color activo de pintura el color de la primer celda.
	// Si estamos usando Internet Explorer
	if (navigator.appName.indexOf("Explorer") != -1){
		// Usaremos className en lugar de classList
		colorActivo=celdasColores[0].className.split(" ")[0];
	}else
		colorActivo=celdasColores[0].classList[0];

	// Al tablero de dibujo le asignamos el evento de click para activar o desactivar la pintura..
	var tablero=getId("tablero");
	var celdasTablero=tablero.getElementsByTagName("td");
	
	for (var i=0;i<celdasTablero.length;i++){
		crearEvento(celdasTablero[i],"click",activarPintura);
	}


	// Al tablero de dibujo le asignamos los eventos de mouseOver para pintar.
	tablero=getId("tablero");
	celdasTablero=tablero.getElementsByTagName("td");
	for (var i=0;i<celdasTablero.length;i++){
		crearEvento(celdasTablero[i],"mouseover",pintar);
	}
}


//////////////////////////////////////////////////////////////////
// función dibujarTableroDibujo -- realiza el dibujo del tablero
// y además asigna los eventos de click correspondientes.
//////////////////////////////////////////////////////////////////
function dibujarTableroDibujo(){
	// Vamos creando la estructura de la tabla empleando el árbol de nodos del DOM.
	// Creamos primero el elemento table con todos sus atributos.
	var nuevaTabla=document.createElement("table");
	nuevaTabla.setAttribute("border","1");
	nuevaTabla.setAttribute("id","tablero");
	nuevaTabla.setAttribute("class","tablerodibujo");

	var tituloTabla=document.createElement("caption");
	var contenidoTitulo=document.createTextNode("Haga CLICK en cualquier celda para activar/desactivar el Pincel");
	tituloTabla.appendChild(contenidoTitulo);
	nuevaTabla.appendChild(tituloTabla);

	// Ahora crearemos las filas de la tabla y las celdas dentro de cada fila.
	for (var i=1; i<=30; i++){
		var nuevaFila=document.createElement("tr");
		for (var j=1;j<=30;j++){
			var nuevaCelda=document.createElement("td");
			nuevaFila.appendChild(nuevaCelda);
		}
		nuevaTabla.appendChild(nuevaFila);
	}

	// Una vez que ya tenemos la tabla completamente creada la metemos dentro del DIV zonadibujo.
	getId("zonadibujo").appendChild(nuevaTabla);
}


///////////////////////////////////////////////////////////////
// función detectarColorPaleta -- nos permite seleccionar un
// color de pincel en la paleta de colores.
///////////////////////////////////////////////////////////////
function detectarColorPaleta(){
	// Desactivamos la clase seleccionado sobre todas las celdas por si había alguna previamente seleccionada
	// Fijarse que si escribimos la fila con saltos de línea al final de cada fila
	// Tendremos un childNode adicional de tipo texto que contendrá un "\n"
	// De esta forma tenemos ahora 5 nodos hijo de TR
	// Por esa razón hemos puesto la fila de la tabla en el código fuente html toda seguida.
	
	// Revisamos todos los elementos de la tabla colores y si encontramos alguno que tenga
	// más de una clase CSS eliminamos la segunda que es la clase seleccionado
	
	for (var i=0; i<this.parentNode.childNodes.length;i++){	
		// Si estamos usando Internet Explorer
		if (navigator.appName.indexOf("Explorer") != -1){
			// Usaremos className en lugar de classList
			this.parentNode.childNodes[i].className = this.parentNode.childNodes[i].className.replace(/\bseleccionado\b/,'');
		}else
			this.parentNode.childNodes[i].classList.remove("seleccionado");
	}
	
	// Si estamos usando Internet Explorer
	if (navigator.appName.indexOf("Explorer") != -1){
		// Tendremos que usar className en lugar de classList
		colorActivo=this.className;
		this.className+=" seleccionado";
	}else{
		colorActivo=this.classList[0];
		this.classList.add("seleccionado");
	}
}


///////////////////////////////////////////////////////////////
// función activarPintura -- nos permite seleccionar un 
// color y cambiar el mensaje del pincel activado/desactivado
///////////////////////////////////////////////////////////////
function activarPintura(evt){
	if (pintarActivado){
		getId("pincel").childNodes[0].nodeValue="PINCEL DESACTIVADO...";
		pintarActivado=false;
	}else{
		getId("pincel").childNodes[0].nodeValue="PINCEL ACTIVADO...";
		pintarActivado=true;
		// Pintamos dónde hemos hecho click, ya que el resto de cuadros serán pintados
		// cuando se produzca el mouseover.
		
		// Si estamos usando Internet Explorer
		// Tendremos que usar className en lugar de classList
		if (navigator.appName.indexOf("Explorer") != -1)
			this.className=colorActivo;
		else
			this.classList.add(colorActivo);
	}
}


/////////////////////////////////////////////////////////
// función pintar -- nos permite pintar sobre el tablero
/////////////////////////////////////////////////////////
function pintar(evt){
	// Detectar si está pulsado el botón izquierdo del ratón.
	// Y si es así pintar.
	//alert(colorActivo);
	nuevo=colorActivo;
	
	if (pintarActivado){
		// Eliminamos las clases previas asignadas a ese cuadro.
		
		// Si estamos usando Internet Explorer
		// Tendremos que usar className en lugar de classList
		if (navigator.appName.indexOf("Explorer") != -1){
			this.className=colorActivo;
		}else{
			for (var i=0;i<this.classList.length;i++){
				this.classList.remove(this.classList[i]);
			}
		
			// Pintamos con el color que está activo.
			this.classList.add(colorActivo);
		}
	}
}

/////////////////////////////////////////////////////////
// Comienzo de la ejecución del código de JavaScript.
/////////////////////////////////////////////////////////
// Variables globales de la aplicación.
var colorActivo="";
var pintarActivado=false;
// Cuando el documento esté cargado llamamos a la función iniciar().
/////////////////////////////////////////////////////////
crearEvento(window,"load",iniciar);
/////////////////////////////////////////////////////////
```