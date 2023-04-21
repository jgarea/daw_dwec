const formulario = document.querySelector('form');
const resultado = document.querySelector('#intentos');
const nombre = document.querySelector('#nombre');
const apellidos = document.querySelector('#apellidos');
const edad = document.querySelector('#edad');
const nif = document.querySelector('#nif');
const email = document.querySelector('#email');
const provincia =  document.querySelector('#provincia');
const fecha =  document.querySelector('#fecha');
const errores = document.querySelector('#errores');

let cookie = 0;
document.cookie=0;
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    document.cookie++;
    resultado.innerHTML="Intento de Envíos del formulario: "+document.cookie;
    errores.innerHTML="";
    validarProvincia();
    validarEmail();
    validarNIF();
    validarEdad();
    validarApellidos();
    validarNombre();
    
    
    //formulario.submit();
});

nombre.addEventListener('blur',cambiarMayusculas);
apellidos.addEventListener('blur',cambiarMayusculas);

function cambiarMayusculas() {
    this.value=this.value.toUpperCase();
};


function validarNombre(){
    let expReg = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/;
    if (!expReg.test(nombre.value)){
        let contenedor = document.createElement('p');
        contenedor.innerText="El nombre es incorrecto";
        errores.appendChild(contenedor);
        nombre.focus();
        return false;
    }
    return true;
}

function validarApellidos(){
    let expReg = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/;
    if (!expReg.test(apellidos.value)){
        let contenedor = document.createElement('p');
        contenedor.innerText="Los apellidos son incorrectos";
        errores.appendChild(contenedor);
        apellidos.focus();
        return false;
    }
    return true;
}
/**
 * Validar la EDAD que contenga solamente valores numéricos y que esté en el rango de 0 a 105. 
 * Si se produce algún error mostrar el mensaje en el contenedor "errores" y poner el foco en el campo EDAD.
 * @returns true si es correcta la edad false en caso contrario
 */
function validarEdad() {
    if (isNaN(edad.value) || edad.value < 0 || edad.value > 105 || edad.value==="") {
        let contenedor = document.createElement('p');
        contenedor.innerText="La edad tiene que estar comprendida entre 0 y 105";
        errores.appendChild(contenedor);
        edad.focus();
        return false;
    }
    return true;
}

/**
 * Validar el NIF. Utilizar una expresión regular que permita solamente 8 números un guión y una letra. 
 * Si se produce algún error mostrar el mensaje en el contenedor "errores" y poner el foco en el campo NIF. 
 * No es necesario validar que la letra sea correcta. Explicar las partes de la expresión regular mediante comentarios.
 * @returns true si es correcto el NIF false en caso contrario
 */
const validarNIF = ()=>{
    let expReg=/^[0-9]{8}-[a-z]$/i; //expresión regular que contiene un número del 0 al 9 8 veces ([0-9]{8}), un guión (-) y que la letra ([a-z])sea mayúscula o minúscula //i
    if(!expReg.test(nif.value)){
        let contenedor = document.createElement('p');
        contenedor.innerText="El NIF tiene que tener el siguiente formato NNNNNNNN-L";
        errores.appendChild(contenedor);
        nif.focus();
        return false;
    }
    return true;
}

/**
 * Validar el E-MAIL. Utilizar una expresión regular que nos permita comprobar que el e-mail sigue un formato correcto. 
 * Si se produce algún error mostrar el mensaje en el contenedor "errores" y poner el foco en el campo E-MAIL. 
 * Explicar las partes de la expresión regular mediante comentarios.
 */
const validarEmail = ()=>{
    let expReg=/^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/i; 
    /**
     * Antes del @ cualquier caracter  a-z A-Z 0-9 - _ . al menos una vez
     * Un @
     * Despues del @ cualquier caracter  a-z A-Z 0-9 - _ .  terminado en un punto al menos una vez 
     * Terminado por un caracter a-z A-Z 0-9 - _ de 2 a 4 veces
     */
    if(!expReg.test(email.value)){
        let contenedor = document.createElement('p');
        contenedor.innerText="El email es incorrecto, introduzca uno como el ejemplo: ejemplo@nombre.com.es";
        errores.appendChild(contenedor);
        email.focus();
        return false;
    }
    return true;
}

/**
 * Validar que se haya seleccionado alguna de las PROVINCIAS. 
 * Si se produce algún error mostrar el mensaje en el contenedor "errores" y poner el foco en el campo PROVINCIA.
 */
const validarProvincia = ()=>{
    if(provincia.selectedIndex==0){
        let contenedor = document.createElement('p');
        contenedor.innerText="Seleccione una provincia";
        errores.appendChild(contenedor);
        provincia.focus();
        return false;
    }
    return true;
}

/**
 * Validar el campo FECHA utilizando una expresión regular. 
 * Debe cumplir alguno de los siguientes formatos: dd/mm/aaaa o dd-mm-aaaa. 
 * No se pide validar que sea una fecha de calendario correcta. 
 * Si se produce algún error mostrar el mensaje en el contenedor "errores" y poner el foco en el campo FECHA. 
 * Explicar las partes de la expresión regular mediante comentarios.
 */
const validarFecha = () => {
    let expReg=/\d{2}([-\/])\d{2}\1\d{4}/; 
    /**
     * Antes del @ cualquier caracter  a-z A-Z 0-9 - _ . al menos una vez
     * Un @
     * Despues del @ cualquier caracter  a-z A-Z 0-9 - _ .  terminado en un punto al menos una vez 
     * Terminado por un caracter a-z A-Z 0-9 - _ de 2 a 4 veces
     */
    if(!expReg.test(fecha.value)){
        let contenedor = document.createElement('p');
        contenedor.innerText="El fecha es incorrecta, debe ser de formato dd/mm/aaaa o dd-mm-aaaa";
        errores.appendChild(contenedor);
        fecha.focus();
        return false;
    }
    return true;
}