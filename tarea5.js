//Buscar un elemento:
//Dado un array de nombres, busca si un nombre específico está en la lista y devuelve su posición.

const buscarNombre = (nombres, nombre) => nombres.indexOf(nombre);

console.log(buscarNombre(["Ana", "Juan", "Luis", "Maria"], "Luis")); 
console.log(buscarNombre(["Ana", "Juan", "Luis", "Maria"], "Marx")); 

