/*
* EN ESTA PROPUESTA DE SOLUCIÓN:
*   Los métodos son propiedades del prototype de la función (más recomendable)
*/
function Edificio(calle, numero, codigopostal)
{
    // Propiedades
    this.calle = calle;
    this.numero = numero;
    this.codigoPostal = codigopostal;
    this.plantas = new Array();

    // Imprimimos el mensaje por defecto cada vez que se crea un objeto Edificio.
    const parrafo = document.createElement('p');
    parrafo.innerText = "Construido nuevo edificio en calle: " + calle + ", nº: " + numero + ", CP: " + codigopostal;
    document.body.appendChild(parrafo); 
}

// Métodos agregados en el prototypo de Edificio:
Edificio.prototype.agregarPlantasYPuertas = function (numplantas, puertas) {
    const totalplantas = this.plantas.length;
    let inicio         = totalplantas <= 0 ? 0 : totalplantas;

    for (let i = inicio; i < totalplantas + numplantas; i++)
    {
        this.plantas[i] = new Array(puertas);
        for (let j=0; j < puertas; j++)
                this.plantas[i][j] = "";     // Propietario de esa puerta en blanco.
    }     
};

Edificio.prototype.modificarNumero = function (numero) {
    this.numero = numero;
};

Edificio.prototype.modificarCalle = function (calle) {
    this.calle = calle;
};

Edificio.prototype.modificarCodigoPostal = function (codigo) {
    this.codigoPostal = codigo;
};

Edificio.prototype.imprimeCalle = function () {
    return this.calle;
};

Edificio.prototype.imprimeNumero = function () {
    return this.numero;
};

Edificio.prototype.imprimeCodigoPostal = function () {
    return this.codigoPostal;
};

Edificio.prototype.agregarPropietario = function (nombre, planta, puerta) {
    this.plantas[planta-1][puerta-1] = nombre;
    const parrafo = document.createElement('p');
    parrafo.innerText = nombre + " es ahora el propietario de la puerta " + puerta + " de la planta " + planta;
    document.body.appendChild(parrafo);
};

Edificio.prototype.imprimePlantas = function() {
    // Imprimirá las plantas y nombres de propietarios de cada puerta de un edificio.
    const cabecera = document.createElement('h2');
    cabecera.innerText = "Listado de propietarios del edificio calle " + this.calle + " número "  + this.numero;
    document.body.appendChild(cabecera);

    for (let i=0; i < this.plantas.length ;i++)
        for (let j=0; j <this.plantas[i].length; j++) {
            const parrafo = document.createElement('p');
            parrafo.innerText = "Propietario del piso " + (j+1) + " de la planta " + (i+1) + ": " + this.plantas[i][j];
            document.body.appendChild(parrafo);
        }
};


/* *******************************************
 *   
 *
*/
const cabecera = document.createElement('h1');
cabecera.innerText = "TRABAJANDO CON OBJETOS EN JAVASCRIPT";
document.body.appendChild(cabecera);

//-------------------------------------------------------
let parrafo = document.createElement('p');
parrafo.innerText = "Instanciamos 3 objetos edificioA, edificioB y edificioC con estos datos:";
document.body.appendChild(parrafo);

const edificioA = new Edificio("Garcia Prieto","58",15706);
const edificioB = new Edificio("Camino Caneiro","29",32004);
const edificioC = new Edificio("San Clemente","s/n",15705);

parrafo = document.createElement('p');
parrafo.innerText = `El código postal del edificio A es: ${edificioA.imprimeCodigoPostal()}
                     La calle del edificio C es: ${edificioC.imprimeCalle()}
                     El edificio B está situado en la calle ${edificioB.imprimeCalle()}  número ${edificioB.imprimeNumero()}
                     Agregamos 2 plantas y 3 puertas por planta al edificio A...`;
document.body.appendChild(parrafo);


// --------------------------------------------------------------------------
document.body.appendChild(document.createElement('br'));
edificioA.agregarPlantasYPuertas(2,3);

parrafo = document.createElement('p');
parrafo.innerText = "Agregamos 4 propietarios al edificio A...";
document.body.appendChild(parrafo);

edificioA.agregarPropietario("Jose Antonio Lopez",1,1);
edificioA.agregarPropietario("Luisa Martinez",1,2);
edificioA.agregarPropietario("Marta Castellón",1,3);
edificioA.agregarPropietario("Antonio Pereira",2,2);
document.body.appendChild(document.createElement('br'));
edificioA.imprimePlantas();

// --------------------------------------------------------------------------
document.body.appendChild(document.createElement('br'));
document.body.appendChild(document.createElement('br'));
parrafo = document.createElement('p');
parrafo.innerText = "Agregamos 1 planta más al edificio A...";
document.body.appendChild(parrafo);
edificioA.agregarPlantasYPuertas(1,2);


// --------------------------------------------------------------------------
document.body.appendChild(document.createElement('br'));
document.body.appendChild(document.createElement('br'));
parrafo = document.createElement('p');
parrafo.innerText = "Agregamos 1 propietario más al edificio A planta 3, puerta 2...";
document.body.appendChild(parrafo);
edificioA.agregarPropietario("Pedro Meijide",3,2);

// --------------------------------------------------------------------------
document.body.appendChild(document.createElement('br'));
edificioA.imprimePlantas();