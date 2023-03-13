const boton = document.querySelector('button');
const botonColor = document.querySelector('#color');
const input = document.querySelector('input');
const html = document.querySelector('html');
const cajaMensaje = document.querySelector('div');
const canvas   = document.querySelector('canvas');
const contexto2D = canvas.getContext('2d');

boton.addEventListener('click',hacer);
botonColor.addEventListener('click',cambiar);
document.addEventListener('DOMContentLoaded', () => {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
  });

function hacer() {
    if (input.value<0 || input.value>50 || input.value=='') { 
        limpiarCanvas();
        
        if(cajaMensaje.innerHTML.length < 1){
	        const mensaje = document.createElement('p');
	        mensaje.textContent = "Entrada no valida";
	        cajaMensaje.appendChild(mensaje);
        }
    }else{
        cajaMensaje.innerHTML="";
        dibujar();
    }
    
}


function cambiar() {
    let hex=[0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];
    let color="#";
    for (let index = 0; index < 6; index++) {
        color+=hex[Math.floor(Math.random() * 15)];
        
    }
    document.body.style.backgroundColor=color;
    console.log(color);
}

function random(numero) {
    return Math.floor( Math.random() * numero);
  }
  
  function dibujar() {
    limpiarCanvas();
    for (let i = 0; i < input.value; i++) {
      contexto2D.beginPath();
      contexto2D.fillStyle = `rgba(${random(255)},${random(255)},${random(255)},0.5)`;
      let size=random(50);
      contexto2D.fillRect(random(canvas.width), random(canvas.height), size, size);  
      //contexto2D.arc(random(canvas.width), random(canvas.height), random(50), 0, 2 * Math.PI);
      contexto2D.fill();
    }
  }

  function limpiarCanvas() {
    contexto2D.clearRect(0, 0, canvas.width, canvas.height);
    
  }