let peticion;
            const resultados=document.querySelector("#resultados");
            
			const iniciar = () => {
				peticion = new XMLHttpRequest();
				peticion.open('GET', "https://api.geekdo.com/xmlapi/geeklist/315772"); 
				peticion.send();
				peticion.addEventListener("load", cargada);
			}

			const cargada = () => {
				let respuesta = peticion.responseXML;
                let title = peticion.responseXML.querySelector("title");
                let game = peticion.responseXML.querySelectorAll("item");
                
                
                console.log(respuesta);
                const tituloPag = document.createElement("h1");
                tituloPag.textContent= title.textContent;

				resultados.appendChild(tituloPag);
                const lista = document.createElement("h1");

                console.log(game);
                for (let index = 0; index < game.length; index++) {
                    
                    let cabecera = document.createElement("h3");
                    cabecera.textContent=index+1 + " " + game[index].getAttribute("objectname");
                    resultados.appendChild(cabecera);
                    
                    
                    let contenido = document.createElement("p");
                    contenido.textContent=game[index].textContent;
                    resultados.appendChild(contenido);

                    resultados.innerHTML+="<hr class=\"col-1 my-4\"></hr>";
                }


				//document.getElementById("resultados").innerHTML = resultados;
			}

			window.addEventListener("load", iniciar, false);