//Sumar solo los números impares entre 1 y 50:
//•	Usa for para recorrer los números del 1 al 50.
//•	Usa if para sumar solo los impares.
//•	Usa while para verificar si la suma supera 500 y, si es así, detener el proceso.

let suma = 0;  // Acumulador para la suma
let i = 1;     // Variable de control del bucle

for (i = 1; i <= 50; i++) {
    if (i % 2 !== 0) { // Verifica si es impar
        suma += i;     // Suma el número impar
    }

    while (suma > 500) { // Comprueba si suma > 500
        console.log("La suma ha superado 500:", suma);
        break;          // Rompe el while (innecesario)
    }
    
    if (suma > 500) {  // Verificación adicional
        break;         // Rompe el bucle for
    }
}

console.log("La suma final es:", suma);
