const formulario = document.querySelector('form');
const resultado = document.querySelector('#resultado');
const nombre = document.querySelector('#nombre');
const apellidos = document.querySelector('#apellidos');
const edad = document.querySelector('#edad');
const errores = document.querySelector('#errores');

let cookie = 0;
document.cookie=0;
formulario.addEventListener('submit', (e) => {
    document.cookie++;
    resultado.innerHTML="Intento de Envíos del formulario: "+document.cookie;
    validarCampos();
    //validarEdad();
    e.preventDefault();
    //formulario.submit();
});

nombre.addEventListener('blur',cambiarMayusculas);
apellidos.addEventListener('blur',cambiarMayusculas);

function cambiarMayusculas() {
    nombre.value=nombre.value.toUpperCase();
    apellidos.value=apellidos.value.toUpperCase();
};

function validarCampos() {
    errores.innerHTML="";
    let contenedor = document.createElement('div');
    let expReg = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/;
    if (!expReg.test(nombre.value)){
        contenedor.innerText="El nombre es incorrecto";
        errores.appendChild(contenedor);
        nombre.focus();
    }
        
    if (!expReg.test(apellidos.value)){
        errores.innerHTML+="<div>El apellido es incorrecto</div>"; 
        apellidos.focus();
    }
}

function validarEdad() {
    errores.innerHTML="";
    if (isNaN(edad) || edad < 0 || edad > 105) {
        errores.innerHTML+="<div>La edad tiene que estar comprendida entre 0 y 105</div>";
        edad.focus();
    }

}