class edificio {
  calle;
  numero;
  codigop;
  plantas;

  /**
   *
   * @param {*} calle
   * @param {*} numero
   * @param {*} codigop
   */
  constructor(calle, numero, codigop) {
    this.calle = calle;
    this.numero = numero;
    this.codigop = codigop;
    this.plantas = 0;
    this.puertas = 0;
    this.propietario = [];

    document.write(
      `<p>Construido nuevo edificio en calle: ${calle}, nº: ${numero}, CP: ${codigop}</p>`
    );
  }
  /**
   * Se le pasa el número de plantas que queremos crear en el piso
   * y el número de puertas por planta. Cada vez que se llame a este método,
   * añadirá el número de plantas y puertas indicadas en los parámetros, a las que ya están creadas en el edificio
   * @param {*} numplantas
   * @param {*} puertas
   */
  agregarPlantasYPuertas(numplantas, puertas) {
    this.plantas += numplantas;
    this.puertas += puertas;
    let i = 0;
    //Comprobamos si es la primera iteración
    if (numplantas != this.plantas) i = numplantas + 1;

    let j;
    for (; i < this.plantas; i++) {
      this.propietario[i] = new Array(puertas);
      for (j = 0; j < puertas; j++) {
        this.propietario[i][j] = "";
      }
    }
  }
  // Se le pasa el nuevo número del edificio para que lo actualice.
  modificarNumero(numero) {
    this.numero = numero;
  }
  /**
   * Se le pasa el nuevo nombre de la calle para que lo actualice.
   * @param {*} calle
   */
  modificarCalle(calle) {
    this.calle = calle;
  }
  /**
   * Se le pasa el nuevo codigo postal para que lo actualice.
   * @param {*} codigo
   */
  modificarCodigoPostal(codigo) {
    this.codigop = codigo;
  }
  /**
   *
   * @returns Devuelve el nombre de la calle del edificio.
   */
  imprimeCalle() {
    return this.calle;
  }
  /**
   *
   * @returns Devuelve el número del edificio
   */
  imprimeNumero() {
    return this.numero;
  }
  /**
   *
   * @returns Devuelve el código postal del edificio.
   */
  imprimeCodigoPostal() {
    return this.codigop;
  }
  /**
   * Se le pasa un nombre de propietario, un número de planta y un número de puerta y lo asignará como propietario de ese piso.
   * @param {*} nombre
   * @param {*} planta
   * @param {*} puerta
   */
  agregarPropietario(nombre, planta, puerta) {
    this.propietario[planta - 1][puerta - 1] = nombre;
    document.write(
      `<p>${nombre} es ahora el propietario de la puerta ${puerta} de la planta ${planta}</p>`
    );
  }
  /**
   * Recorrerá el edificio e imprimirá todos los propietarios de cada puerta.
   */
  imprimePlantas() {
    for (let i = 0; i < this.propietario.length; i++) {
      for (let j = 0; j < this.propietario[i].length; j++) {
        document.write(
          `Propietario del piso ${j + 1} de la planta ${i + 1}: ${
            this.propietario[i][j]
          }</p>`
        );
      }
    }
  }
}
//Creamos los 3 edificios
let edificio1 = new edificio("Garcia Prieto", 58, 15706);
let edificio2 = new edificio("Camino Caneiro", 29, 32004);
let edificio3 = new edificio("San Clemente", "s/n", 15705);

document.write(
  "<hr><p>El código postal del edificio A es: " +
    edificio1.imprimeCodigoPostal() +
    "</p>"
);
document.write(
  "<p>La calle del edificio C es: " + edificio3.imprimeCalle() + "</p>"
);
document.write(
  `<p>El edificio B está situado en la calle ${edificio2.imprimeCalle()} numero ${edificio2.imprimeNumero()}</p><hr>`
);
//Agregamos 2 plantas y 3 puertas por planta al edificio A...
edificio1.agregarPlantasYPuertas(2, 3);

// Agregamos 4 propietarios al edificio A...
edificio1.agregarPropietario("Jose Antonio Lopez", 1, 1);
edificio1.agregarPropietario("Luisa Martinez", 1, 2);
edificio1.agregarPropietario("Marta Castellón", 1, 3);
edificio1.agregarPropietario("Antonio Pereira", 2, 2);

document.write(
  `<hr><h4>Listado de propietarios del edificio calle García Prieto número 58</h4>`
);

edificio1.imprimePlantas();

//Agregamos 1 planta más al edificio A...
edificio1.agregarPlantasYPuertas(1, 3);

//Agregamos 1 propietario más al edificio A planta 3, puerta 2...
edificio1.agregarPropietario("Pedro Meijide", 3, 2);

document.write(
  `<hr><h4>Listado de propietarios del edificio calle García Prieto número 58</h4>`
);
edificio1.imprimePlantas();
