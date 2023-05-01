document.addEventListener("DOMContentLoaded", () => {

const formulario = document.querySelector('form');
const resultado = document.querySelector('#intentos');
const nombre = document.querySelector('#nombre');
const apellidos = document.querySelector('#apellidos');
const edad = document.querySelector('#edad');
const nif = document.querySelector('#nif');
const email = document.querySelector('#email');
const provincia = document.querySelector('#provincia');
const fecha = document.querySelector('#fecha');
const telefono = document.querySelector('#telefono');
const hora = document.querySelector('#hora');
const errores = document.querySelector('#errores');

//Almacenar en una cookie el número de intentos de envío del formulario que se van produciendo
document.cookie = 0;

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    document.cookie++;
    resultado.innerHTML = "Intento de Envíos del formulario: " + document.cookie;
    errores.innerHTML = "";
    /**
     * Pedir confirmación de envío del formulario. Si se confirma el envío realizará el envío de los datos; en otro caso cancelará el envío.
     */
    if (validar() && confirm("¿Desea confirmar los datos?"))
        formulario.submit();
});

nombre.addEventListener('blur', cambiarMayusculas);
apellidos.addEventListener('blur', cambiarMayusculas);

function cambiarMayusculas()  {
    this.value = this.value.toUpperCase();
};

/**
 * Función que valida los campos
 * @returns true si es valido los campos
 */
const validar = () => {
    let nombreValido = validarNombre();
    let apellidosValidos = validarApellidos();
    let edadValida = validarEdad();
    let nifValido = validarNIF();
    let emailValido = validarEmail();
    let provinciaValida = validarProvincia();
    let fechaValida = validarFecha();
    let telefonoValido = validarTelefono();
    let horaValida = validarHora();

    return nombreValido && apellidosValidos && edadValida && nifValido && emailValido && provinciaValida && fechaValida && telefonoValido && horaValida;
}

/**
 * Función validar un nombre
 * @returns true si es correcto el nombre
 */
const validarNombre = () => {
    let expReg = /^[a-zñáéíóúü' ]+$/i;
    if (!expReg.test(nombre.value)) {
        let contenedor = document.createElement('p');
        contenedor.innerText = "El nombre es incorrecto debe contener caracteres válidos(a-z,')";
        errores.appendChild(contenedor);
        nombre.focus();
        return false;
    }
    return true;
}

/**
 * Función validar un apellido
 * @returns true si es correcto el nombre
 */
const validarApellidos = () => {
    let expReg = /^[a-zñáéíóúü' ]+$/i;
    if (!expReg.test(apellidos.value)) {
        let contenedor = document.createElement('p');
        contenedor.innerText = "Los apellidos son incorrectos debe contener caracteres válidos(a-z,')";
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
const validarEdad = () => {
    if (isNaN(edad.value) || edad.value < 0 || edad.value > 105 || edad.value === "") {
        let contenedor = document.createElement('p');
        contenedor.innerText = "La edad tiene que estar comprendida entre 0 y 105";
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
const validarNIF = () => {
    let expReg = /^[0-9]{8}-[a-z]$/i; //expresión regular que contiene un número del 0 al 9 8 veces ([0-9]{8}), un guión (-) y que la letra ([a-z])sea mayúscula o minúscula //i
    if (!expReg.test(nif.value)) {
        let contenedor = document.createElement('p');
        contenedor.innerText = "El NIF tiene que tener el siguiente formato NNNNNNNN-L";
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
const validarEmail = () => {
    let expReg = /^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/i;
    /**
     * Antes del @ cualquier caracter  a-z A-Z 0-9 - _ . al menos una vez
     * Un @
     * Despues del @ cualquier caracter  a-z A-Z 0-9 - _ .  terminado en un punto al menos una vez 
     * Terminado por un caracter a-z A-Z 0-9 - _ de 2 a 4 veces
     */
    if (!expReg.test(email.value)) {
        let contenedor = document.createElement('p');
        contenedor.innerText = "El email es incorrecto, introduzca uno como el ejemplo: ejemplo@nombre.com.es";
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
const validarProvincia = () => {
    if (provincia.selectedIndex == 0) {
        let contenedor = document.createElement('p');
        contenedor.innerText = "Seleccione una provincia";
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
    let expReg = /\d{2}([-\/])\d{2}\1\d{4}/;
    /**
     * \d{2} dos digitos
     * ([-\/]) un guión o una barra
     * \d{2} dos dígitos
     * \1 un guión o una barra el mismo que el anterior
     * \d{4} cuatro dígitos
     */
    if (!expReg.test(fecha.value)) {
        let contenedor = document.createElement('p');
        contenedor.innerText = "La fecha es incorrecta, debe ser de formato dd/mm/aaaa o dd-mm-aaaa";
        errores.appendChild(contenedor);
        fecha.focus();
        return false;
    }
    return true;
}

/**
 * Validar el campo TELEFONO utilizando una expresión regular. 
 * Debe permitir 9 dígitos obligatorios. 
 * Si se produce algún error mostrar el mensaje en el contenedor "errores" y poner el foco en el campo TELEFONO. 
 * Explicar las partes de la expresión regular mediante comentarios.
 */
const validarTelefono = () => {
    let expReg = /\d{9}/;
    /**
     * \d{9} 9 dígitos oblicatorios
     */
    if (!expReg.test(telefono.value)) {
        let contenedor = document.createElement('p');
        contenedor.innerText = "El telefono es incorrecto, debe tener 9 dígitos";
        errores.appendChild(contenedor);
        telefono.focus();
        return false;
    }
    return true;
}

/**
 * Validar el campo HORA utilizando una expresión regular. Debe seguir el patrón de hh:mm. 
 * No es necesario validar que sea una hora correcta. 
 * Si se produce algún error mostrar el mensaje en el contenedor "errores" y poner el foco en el campo HORA. 
 * Explicar las partes de la expresión regular mediante comentarios.
 */
const validarHora = () => {
    let expReg = /^([01]\d|2[0-3]):[0-5]\d$/;
    /**
     * ^ Comienzo
     * ([01]\d|2[0-3]) un número entre 0 o 1 y un digito entre 0 y 9, o ,un 2 y un número entre 0 y 3 para limitar el rango de 00 a 23
     * : caracter :
     * [0-5]\d un número entre 0 y 5 y un número entre 0 y 9 para limitar del 00 al 59
     */
    if (!expReg.test(hora.value)) {
        let contenedor = document.createElement('p');
        contenedor.innerText = "La hora es incorrecta debe estar entre 00:00 y 23:59";
        errores.appendChild(contenedor);
        hora.focus();
        return false;
    }
    return true;
}
});