const formulario = document.querySelector('form');
const resultado = document.querySelector('#resultado');
const nombre = document.querySelector('#nombre');
const apellidos = document.querySelector('#apellidos');
const errores = document.querySelector('#errores');

let cookie = 0;

formulario.addEventListener('submit', (e) => {
    cookie++;
    resultado.innerHTML="Intento de Envíos del formulario: "+cookie;
    e.preventDefault();
    //formulario.submit();
});

nombre.addEventListener('blur',cambiarMayusculas);
apellidos.addEventListener('blur',cambiarMayusculas);

function cambiarMayusculas() {
    nombre.value=nombre.value.toUpperCase();
    apellidos.value=apellidos.value.toUpperCase();
};
