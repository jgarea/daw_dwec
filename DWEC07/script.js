//Guardamos las variables de las peticiones
let peticion;
let peticion2;
let peticion3;
let peticion4;
//Recogemos los div de los resultados
const resultados = document.querySelector("#resultados");
const resultados2 = document.querySelector("#resultados2");

/**
 * Función que crea un obgeto XMLHttpRequest y recoge los resultados
 * 
 */
const iniciar = () => {
    peticion = new XMLHttpRequest();
    peticion.open("GET", "https://api.geekdo.com/xmlapi/geeklist/315772");
    peticion.send();
    peticion.addEventListener("load", cargada);
};

/**
 * Función que una vez cargada la página es llamada, recoge el XML y muestra los datos
 * 
 */
const cargada = () => {
    let title = peticion.responseXML.querySelector("title"); //Recoge el titulo
    let game = peticion.responseXML.querySelectorAll("item"); //Recoge todos los juegos

    const tituloPag = document.createElement("h1");
    tituloPag.textContent = title.textContent;

    resultados.appendChild(tituloPag);
    const lista = document.createElement("h1");

    let order = document.createElement("ol");
    order.setAttribute(
        "class",
        "list-group list-group-flush list-group-numbered"
    );
    //Para cada uno de los juegos crea un titilo de juego y la descripción del juego
    for (let index = 0; index < game.length; index++) {
        let cabecera = document.createElement("h3");
        cabecera.setAttribute("class", "text-light-emphasis");
        cabecera.textContent = game[index].getAttribute("objectname");
        order.appendChild(cabecera);

        let contenido = document.createElement("li");
        contenido.setAttribute("class", "list-group-item");
        contenido.textContent = game[index].textContent;
        order.appendChild(contenido);

    }
    resultados.appendChild(order);
};

/**
 *  Función que crea un obgeto XMLHttpRequest y recoge los resultados
 *   
 */
const iniciar2 = () => {
    peticion2 = new XMLHttpRequest();
    peticion2.open("GET", "https://www.dnd5eapi.co/api/ability-scores/cha");
    peticion2.send();
    peticion2.addEventListener("load", cargada2);
};

/**
 *  Función que una vez cargada la página es llamada, recoge el JSON y muestra los datos
 */
const cargada2 = () => {
    //Parsea el JSON para que sea más facil de manipular
    let skill = JSON.parse(peticion2.responseText); 
    
    //Creamos los elementos
    let defList = document.createElement("dl");
    let ter = document.createElement("dt");
    let def = document.createElement("dd");

    //El termino
    ter.textContent = skill.full_name;
    defList.appendChild(ter);

    //La descripcion
    def.textContent = `Descripcion: ${skill.desc[0]} ${skill.desc[1]}`;
    defList.appendChild(def);

    //Creamos una lista donde mostramos las skills
    let lista = document.createElement("ol");
    for (let i = 0; i < skill.skills.length; i++) {
        let items = document.createElement("li");
        items.textContent =
            skill.skills[i].name + " " + "Url: " + skill.skills[i].url;
        lista.appendChild(items);
    }
    //Por último lo añadimos al html
    resultados2.appendChild(defList);
    resultados2.appendChild(lista);
};

/**
 * Función que recoge un XML y muestra los datos, para realizar esta petición
 * además hay que incluir en la cabecera Accept: "application/xml" para que 
 * nos devuelve en formato XML
 * Con Jquery
 */
const iniciar3 = () => {
    //Iniciamos una consulta asincrona por GET con el header del HTTP apropiado
    $.ajax({
        url: "https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome",
        type: "GET",
        headers: {
            Accept: "application/xml",
        },
        //Si hay respuesta
        success: (response) => {
            //Creamos una lista la cual es un item por cada diputado
            let nombres = $("<ol>");
            $(response)
                .find("deputado_") //Para encontrar la etiqueta deputado_
                .each(function () { //Itera por cada resultado
                    let nombre = $("<li>");
                    nombre.text(
                        $(this).find("nome")[0].textContent +
                            ", Sigla del partido: " +
                            $(this).find("siglaPartido")[0].textContent
                    );
                    nombres.append(nombre);
                });
            //Añade el resultado al html
            $("#resultados3").html(nombres);
        },
        //En caso de error lo muestra
        error: function (xhr, status, error) {
            console.log(error);
        },
    });
};

/**
 * Función que recoge un JSON y muestra los datos, para realizar esta petición
 * además NO hay que incluir en la cabecera Accept: "application/JSON" para que 
 * nos devuelva en formato JSON
 * Con Jquery
 */
const iniciar4 = () => {
        $.ajax({
            url: "https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome",
            type: "GET",
            async: true,
            success: (respuesta) => {
                //Si recibe la respuesta crea una tabla con sus cabeceras
                let $table = $("<table>");
                $table.attr('class','table table-hover');
                let $caption = $("<caption>").text("Diputados");
                let $tr = $("<tr>").append($("<th>").text("Nombre"));
                $tr.append($("<th>").text("Partido"));
                $tr.append($("<th>").text("Foto"));
                $table.append($caption, $tr);

                //Por cada diputado crea una fila en la tabla y le añade los datos
                $(respuesta.dados).each(function (datos) {
                    let $tr = $("<tr>");
                    let $td1 = $("<td>").text($(respuesta.dados)[datos].nome);
                    let $td2 = $("<td>").text($(respuesta.dados)[datos].siglaPartido);
                    //Para añadir la foto del diputado creamos una etiqueta img y recogemos el resultado
                    let $img = $("<img>").attr('src',$(respuesta.dados)[datos].urlFoto);
                    $img.attr('width','100');
                    let $td3 = $("<td>").append($img);
                    $table.append($tr, $td1,$td2,$td3);
                });
                //Añadimos la tabla
                $("#resultados4").append($table);
            },
        });
};

//Creamos los eventos para que cuando cargue la página inicie las funciones correspondientes
window.addEventListener("load", iniciar, false);
window.addEventListener("load", iniciar2, false);
window.addEventListener("load", iniciar3, false);
window.addEventListener("load", iniciar4, false);
