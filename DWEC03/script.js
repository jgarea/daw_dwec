/**
 * Función para abrir una nueva ventana
 */
function nuevaVentana() {
  let subVentana = window.open(
    "",
    "nueva",
    "height=800, width=600,resizable=no"
  );
  subVentana.document.write("<h3>Ejemplo de Ventana Nueva</h3>");
  subVentana.document.write(
    "URL Completa: " + subVentana.document.URL + "<br>"
  );
  subVentana.document.write(
    "Protocolo utilizado: " + subVentana.location.protocol + "<br>"
  );
  subVentana.document.write(
    "Nombre en código del navegador: " +
      subVentana.navigator.appCodeName +
      "<br>"
  );
  if (subVentana.navigator.javaEnabled())
    subVentana.document.write("JAVA disponible<br>");
  else subVentana.document.writeln("JAVA no disponible<br>");
  subVentana.document.write(
    "Nombre en código del navegador: " +
      subVentana.navigator.appCodeName +
      "<br>"
  );
/**
 * Abrir un frame donde añadimnos la página de google
 */
  let iframe = document.createElement("iframe");

  iframe.src = "https://www.google.es";

  subVentana.document.body.appendChild(iframe);
  iframe.width = "800";
  iframe.height = "600";
}
//LLamamos a la función
nuevaVentana();

const formulario = document.querySelector("form");
const nom = document.querySelector("#nombre");
const caja = document.querySelector("div");
const fecha = document.querySelector("#fecha");

caja.innerHTML = "<h1>TAREA DWEC03</H1><HR/>";
/**
 * Evitamos que envie al servidor los datos y mostramos los datos que nos pide el enunciado
 */
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  caja.innerHTML = "<h1>TAREA DWEC03</H1><HR/>";

  let nombre = nom.value;
  let dia = fecha.value.substring(8, 10);
  let mes = fecha.value.substring(5, 7);
  let anho = fecha.value.substring(0, 4);
  caja.innerHTML += "Buenos días " + nombre + "<br>";
  caja.innerHTML +=
    "Tu nombre tiene " + nombre.length + " caracteres, incluidos espacios.<br>";
  caja.innerHTML +=
    "La primera letra A de tu nombre está en la posición: " +
    nombre.indexOf("A") +
    "<br>";
  caja.innerHTML +=
    "La última letra A de tu nombre está en la posición: " +
    nombre.lastIndexOf("A") +
    "<br>";
  caja.innerHTML +=
    "Tu nombre menos las 3 primeras letras es: " + nombre.substring(3) + "<br>";
  caja.innerHTML +=
    "Tu nombre todo en mayúsculas es: " + nombre.toUpperCase() + "<br>";
  let fechaActual = new Date();
  let fechaNacimiento = new Date(anho, mes, dia);
  let diferencia = fechaActual - fechaNacimiento;
  //Fórmula para calcular la edad
  let edad = Math.floor(diferencia / (1000 * 60 * 60 * 24 * 365.25));
  caja.innerHTML += "Tu edad es: " + edad + "<br>";
  caja.innerHTML +=
    "Naciste un feliz " + dia + "/" + mes + " del año " + anho + "<br>";
  caja.innerHTML += "El coseno de 180 es: " + Math.cos(180 * Math.PI / 180) + " <br>";
  caja.innerHTML +=
    "El número mayor de (34,67,23,75,35,19) es: " +
    Math.max(34, 67, 23, 75, 35, 19) +
    " <br>";
    //Un numero entre 0 y 0,9999999 periodico si queremos un numero entre 1 y 10 le sumamos 1 y le hacemos un floor
  caja.innerHTML += "Ejemplo de número al azar: " + Math.random() + " <br>";
});
