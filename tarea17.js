//Contador de intentos:
//Simula un intento de login.
//Usa while para permitir 3 intentos.

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const usuarioCorrecto = 'admin';
const contrasenaCorrecta = '1234';
let intentos = 0;

const login = () => {
    rl.question("Ingresa tu nombre de usuario: ", (usuario) => {
        rl.question("Ingresa tu contraseña: ", (contrasena) => {
            if (usuario === usuarioCorrecto && contrasena === contrasenaCorrecta) {
                console.log("¡Login exitoso!");
                rl.close();
            } else {
                intentos++;
                if (intentos < 3) {
                    console.log(`Credenciales incorrectas. Te quedan ${3 - intentos} intento(s).`);
                    login(); // Vuelve a pedir las credenciales si los intentos no se agotaron
                } else {
                    console.log("Has superado el número máximo de intentos.");
                    rl.close();
                }
            }
        });
    });
};

login();

