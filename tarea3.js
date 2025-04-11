//Contar elementos pares:
//Dado un array de números, cuenta cuántos son pares y devuelve el total.

const contarPares = (numeros) => numeros.filter(n => n % 2 === 0).length;

console.log(contarPares([1, 2, 3, 4, 5, 6])); 
