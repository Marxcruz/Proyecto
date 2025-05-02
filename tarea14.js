//Validar entrada de usuario:
//Pide al usuario que ingrese un número mayor que 0. Si ingresa un número inválido, vuelve a pedirlo usando do while.

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let numero;

const pedirNumero = () => {
    rl.question("Ingresa un número mayor que 0: ", (entrada) => {
        numero = parseInt(entrada);

        if (numero > 0) {
            console.log(`Número válido: ${numero}`);
            rl.close();
        } else {
            console.log("El número debe ser mayor que 0. Intenta de nuevo.");
            pedirNumero();
        }
    });
};

pedirNumero();

