//Adivinar un número:
//Genera un número aleatorio del 1 al 10 y usa un while para pedir al usuario que lo adivine hasta que lo haga correctamente.

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const numeroSecreto = Math.floor(Math.random() * 10) + 1; 

let intento;

const adivinarNumero = () => {
    rl.question("Adivina el número entre 1 y 10: ", (respuesta) => {
        intento = parseInt(respuesta);

        if (intento === numeroSecreto) {
            console.log("¡Felicidades! Adivinaste el número.");
            rl.close();
        } else {
            console.log("Intenta de nuevo.");
            adivinarNumero(); 
        }
    });
};

adivinarNumero();


