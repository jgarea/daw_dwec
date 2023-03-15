## Observaciones:
1. PIEZA 1: en el DWEC-Core-JS-Boletin 02-bucles parte 1.odt, ejercicio 9, se trabajó el problema de crear el cuadrado
de asteríscos vacío
2. PIEZA 2: en DWEC-Core-JS-Boletin 04-funciones.odt, ejercicio 4, se trabajó crear una función que genere los
términos (números) de la serie de Fibonacci:

* llamémosla: ``fibonacci(termino)``
3. PIEZA 3: podemos crear un par de funciones sencillas:

* ``numeroDeTerminos(ladoCuadrado)``: calcula el número total de términos a imprimir
    * en el primer ejemplo del enunciado número = 4 --> nos da 12 términos
    * en el segundo ejemplo del enunciado número = 3 --> nos da 8 términos
* ``longitudUltimoTerminoFibo(termino)``: indica cuántos digitos (ancho de campo) tendrá el último término
de la serie de fibonacci a imprimir (es decir, el anchoDeCampo)
    * en el primer ejemplo del enunciado número = 4 --> nos devuelve: 3
    * en el segundo ejemplo del enunciado número = 3 --> nos devuleve: 2

*   **imprimirFiboConFormato**(fibonacci (termino), anchocampo): por ejemplo
    * ``imprimirFiboConFormato(fibonacci(2), 2)`` imprime: .2
    * ``imprimirFiboConFormato(fibonacci(11), 3)`` imprime: .89

Por lo tanto: si en la PIEZA 1 substituímos cada línea de código que imprime
* un asterísco por:

 `imprimirFiboConFormato(fibonacci(termino), anchoDeCampo)`

* un espacio por:

 `imprimirEspacios(anchoDeCampo)`

Tenemos el problema resuelto (nota: anchoDeCampo lo puedes calcular con
`longitudUltimoTerminoFibo(termino)`)

Resumiendo:
1. Leer el enunciado del problema detenidamente

2. Descomponer el problema en piezas o partes

3. Ver que piezas o partes ya tenemos hechas.
 En el ejemplo anterior:
• dibujar un cuadrado vacío por dentro
• calcular un término de la sucesión de Fibonacci

4. Elaborar las nuevas.
 En el ejemplo anterior:
    * numeroDeTerminos
    * longitudUltimoTerminoFibo
    * imprimirFiboConFormato

5. Acoplar todas las piezas
En el ejemplo anterior, por ejemplo:
    1. Copiar el código de solución de DWEC-Core-JS-Boletin 02-bucles parte 1.odt, ejercicio 9 que tengas
    2. Añadirle al anterior, la función de DWEC-Core-JS-Boletin 04-funciones.odt que tengas
    3. Añadirle las funciones del paso 4)
6. Probar para varias entradas

7. Depurar errores (si hace falta) (volver al paso 6) )
Es decir, no hay que empezar desde cero para resolver estos problemas.
• al empezar el examen, prepara tu repositorio de código de referencia: descárgate e incorpora al entorno Visual
Studio Code el código ya trabajado y/o el que estimes oportuno