// PARTE 1
nueva = open("","nueva","toolbar=yes,resizable=no,left=500,top=500,width=600,height=700");

const rellenarNuevaVentana = () => {
    const documento = nueva.document;
    const cuerpo2   = documento.body;  // Abreviatura por comodidad

    const cabecera = documento.createElement('h3');
    cabecera.innerText = 'Ejemplo de Ventana Nueva';
    cuerpo2.appendChild(cabecera);
    cuerpo2.appendChild(documento.createElement('br'));

    const enlace = documento.createElement('a');
    enlace.innerText = "URL completa: " + nueva.location.href;
    enlace.setAttribute("href", nueva.location.href);
    cuerpo2.appendChild(enlace);
    cuerpo2.appendChild(documento.createElement('br'));

    let elemento = documento.createElement('p');
    elemento.innerText = "Protocolo: " + nueva.location.protocol;
    cuerpo2.appendChild(elemento);
    cuerpo2.appendChild(documento.createElement('br'));

    // Navigator.appName está deprecado
    elemento = documento.createElement('p');
    elemento.innerText = "Nombre en código del navegador: " + nueva.navigator.userAgent;
    cuerpo2.appendChild(elemento);
    cuerpo2.appendChild(documento.createElement('br'));

    // Navigator.javaEnabled está deprecado...
    elemento = documento.createElement('p');
    if (nueva.navigator.javaEnabled()) {
        elemento.innerText =  "Java SI disponible en esta ventana";
    } else {
        elemento.innerText =  "Java NO disponible en esta ventana";
    }
    cuerpo2.appendChild(elemento);
    cuerpo2.appendChild(documento.createElement('br'));

    const iframe = documento.createElement('iframe');
    const atributos = {
        name:         "test",
        src:          "http://127.0.0.1:5500/FPADISTANCIA/TAREA-03b/pagina.html", // Cross-Origin Resource Sharing (CORS) "http://www.google.es/",
        width:        "800",
        height:       "600",
        scrolling:    "auto",
        frameborder:  "1",
        transparency: "true",
    };

    Object.keys(atributos).forEach( (atributo) => { iframe.setAttribute(atributo, atributos[atributo]); });
    cuerpo2.appendChild(iframe);
    cuerpo2.appendChild(documento.createElement('br'));
}

rellenarNuevaVentana();


// PARTE 2
const cuerpo = window.document.body;

const cabecera = document.createElement('h1');
cabecera.innerText = 'TAREA DWEC03';
cuerpo.appendChild(cabecera);
cuerpo.appendChild(document.createElement('hr'));

const parrafos = [];
for (let i = 1; i <= 9; i++) {
    parrafos[i] = document.createElement('p');
    cuerpo.appendChild(parrafos[i]);
    cuerpo.appendChild(document.createElement('br'));
}

if ( navigator.userAgent.includes("Firefox") ) {    // Firefox
    solicitarDatos();
} else {                                            // Chrome y Edge
    document.addEventListener('click',  solicitarDatos );
    document.addEventListener('mouseover',  solicitarDatos, true );
}


function solicitarDatos() {
    let nombre = window.prompt("Introduzca su nombre y apellidos", "");
    let dia    = window.prompt("Introduzca DIA de nacimiento" ,"");
    let mes    = window.prompt("Introduzca MES de nacimiento", "");
    let ano    = window.prompt("Introduzca AÑO de nacimiento", "");

    let fechaActual  = new Date();
    let dias         = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sabado"); 
    let miNacimiento = new Date(ano, mes-1, dia);

    const textos = [ "", 
        "Buenos dias " + nombre,
        "Tu nombre tiene " + nombre.length + " caracteres, incluidos espacios",
        "La primera letra A de tu nombre está en la posición: " + nombre.toLowerCase().indexOf("a")+1,
        "La última letra A de tu nombre está en la posición: " + nombre.toLowerCase().lastIndexOf("a")+1,
        "Tu nombre menos las 3 primeras letras es: " + nombre.substring(3),
        "Tu nombre todo en mayúsculas es: " + nombre.toUpperCase(),
        "Tu edad es: "+ (fechaActual.getFullYear()-ano) + " años.",
        "Naciste un feliz "+ (dias[miNacimiento.getDay()]) + " del año "+ ano,
        `El coseno de 180 es: ${Math.cos(180)}
        El número mayor de (34,67,23,75,35,19) es: ${Math.max(34,67,23,75,35,19)} 
        Ejemplo de número al azar: ${Math.random()}`,
    ];

    for (let i = 1; i < textos.length; i++) {
        parrafos[i].innerText = textos[i];
    }

    if ( !navigator.userAgent.includes("Firefox") ) {
        document.removeEventListener('click',  solicitarDatos);
        document.removeEventListener('mouseover',  solicitarDatos, true );
    }
}
