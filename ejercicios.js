// Ejercicio 1: Calcular el mayor de tres números
function mayorDeTres(a, b, c) {
    if (a > b && a > c) return a;
    if (b > a && b > c) return b;
    return c;
}

console.log("Ejercicio 1:");
console.log("El mayor de 5, 3 y 7 es:", mayorDeTres(5, 3, 7));

// Ejercicio 2: Calcular la nota media de un arreglo de notas
function notaMedia(notas) {
    let sum = 0;
    for (let nota of notas) {
        sum += nota;
    }
    return sum / notas.length;
}

console.log("\nEjercicio 2:");
let notas = [9, 7, 6, 8];
console.log("La nota media de", notas, "es:", notaMedia(notas));

// Ejercicio 3: Contar el número de veces que aparece cada palabra en un texto
function contarPalabras(texto) {
    let palabras = texto.split(" ");
    let diccionario = {};

    for (let palabra of palabras) {
        let lowerCase = palabra.toLowerCase(); // Para no contar mayúsculas como distintas
        if (diccionario[lowerCase]) {
            diccionario[lowerCase]++;
        } else {
            diccionario[lowerCase] = 1;
        }
    }

    return diccionario;
}

console.log("\nEjercicio 3:");
let texto = "hola hola mundo como estás";
console.log("Frecuencia de palabras en:", texto, "es:", contarPalabras(texto));

// Ejercicio 4: Calcular el factorial de un número
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    else return n * factorial(n - 1);
}

console.log("\nEjercicio 4:");
console.log("El factorial de 5 es:", factorial(5));

// Ejercicio 5: Invertir un arreglo
function invertirArreglo(arr) {
    return arr.reverse();
}

console.log("\nEjercicio 5:");
let miArreglo = [1, 2, 3, 4, 5];
console.log("El arreglo", miArreglo, "invertido es:", invertirArreglo([...miArreglo])); // Al hacer copia evitamos modificar el arreglo original
