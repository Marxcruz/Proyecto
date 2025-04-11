//Sumar hasta que el usuario ingrese 0:
//Pide números al usuario y usa while para sumarlos hasta que ingrese 0.

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let suma = 0;

const pedirNumero = () => {
    rl.question("Ingresa un número (ingresa 0 para terminar): ", (numero) => {
        numero = parseInt(numero); // Convertir la entrada a un número entero

        if (numero === 0) {
            console.log("La suma total es:", suma);
            rl.close(); // Termina el proceso cuando el usuario ingresa 0
        } else {
            suma += numero; // Sumar el número ingresado
            pedirNumero(); // Volver a pedir otro número
        }
    });
};

pedirNumero();

