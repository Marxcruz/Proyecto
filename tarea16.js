//Sumar solo los números impares entre 1 y 50:
//•	Usa for para recorrer los números del 1 al 50.
//•	Usa if para sumar solo los impares.
//•	Usa while para verificar si la suma supera 500 y, si es así, detener el proceso.

let suma = 0;
let i = 1;

for (i = 1; i <= 50; i++) {
    if (i % 2 !== 0) { // Verifica si el número es impar
        suma += i; // Suma el número impar
    }

    while (suma > 500) { // Verifica si la suma supera 500
        console.log("La suma ha superado 500:", suma);
        break; // Detiene el bucle
    }
    
    if (suma > 500) {
        break; // Detiene el bucle `for` si la suma supera 500
    }
}

console.log("La suma de los números impares es:", suma);
