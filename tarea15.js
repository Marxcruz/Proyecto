//Mostrar menú hasta que el usuario salga:
//Muestra un menú con opciones y usa do while para repetir hasta que el usuario elija salir.

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const mostrarMenu = () => {
    console.log("\n--- Menú ---");
    console.log("1. Opción 1");
    console.log("2. Opción 2");
    console.log("3. Opción 3");
    console.log("4. Salir");

    rl.question("Elige una opción (1-4): ", (opcion) => {
        switch (opcion) {
            case '1':
                console.log("Has elegido la Opción 1.");
                mostrarMenu();
                break;
            case '2':
                console.log("Has elegido la Opción 2.");
                mostrarMenu();
                break;
            case '3':
                console.log("Has elegido la Opción 3.");
                mostrarMenu();
                break;
            case '4':
                console.log("Saliendo...");
                rl.close();
                break;
            default:
                console.log("Opción no válida. Intenta de nuevo.");
                mostrarMenu();
        }
    });
};

mostrarMenu();

