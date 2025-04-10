/**
 * 1. Sumar números en un array
 * Función que recibe un array de números y devuelve la suma total.
 */
function sumarArray(numeros) {
    return numeros.reduce((total, num) => total + num, 0);
  }
  console.log("1. Suma del array [1, 2, 3]:", sumarArray([1, 2, 3])); // 6
  
  /**
   * 2. Encontrar el número mayor en un array
   * Función que devuelve el número más grande de un array.
   */
  function encontrarMayor(numeros) {
    return Math.max(...numeros);
  }
  console.log("2. Número mayor en [4, 1, 9, 3]:", encontrarMayor([4, 1, 9, 3])); // 9
  
  /**
   * 3. Invertir una cadena de texto
   * Función que invierte los caracteres de un string.
   */
  function invertirCadena(texto) {
    return texto.split("").reverse().join("");
  }
  console.log("3. 'Hola' invertido:", invertirCadena("Hola")); // "aloH"
  
  /**
   * 4. Verificar si un texto es palíndromo
   * Función que determina si una palabra se lee igual al derecho y al revés.
   */
  function esPalindromo(texto) {
    const textoNormalizado = texto.toLowerCase().replace(/[^a-z]/g, "");
    return textoNormalizado === invertirCadena(textoNormalizado);
  }
  console.log("4. ¿'Reconocer' es palíndromo?:", esPalindromo("Reconocer")); // true
  
  /**
   * 5. Contar vocales en una cadena
   * Función que cuenta cuántas vocales tiene un string.
   */
  function contarVocales(texto) {
    const vocales = texto.match(/[aeiouáéíóú]/gi);
    return vocales ? vocales.length : 0;
  }
  console.log("5. Vocales en 'JavaScript':", contarVocales("JavaScript")); // 3