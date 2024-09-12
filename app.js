const fs = require('fs');

function escribirArchivo(valor1, valor2) {
    const objeto = { valor1, valor2 };
    const contenido = JSON.stringify(objeto);
    
    fs.appendFile('datos.txt', contenido + '\n', 'utf8', (err) => {
        if (err) {
            console.error('Error al escribir en el archivo:', err);
        } else {
            console.log('Objeto agregado correctamente al archivo');
        }
    });
}

function leerArchivo() {
    fs.readFile('datos.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
        } else {
            const lineas = data.split('\n').filter(linea => linea.trim() !== '');
            const objetos = lineas.map(linea => JSON.parse(linea));
            console.log('Arreglo de objetos:');
            console.log(objetos);
        }
    });
}

function modificarObjeto(valor1, nuevoValor2) {

    fs.readFile('datos.txt', 'utf8', (err, data) => {
        if (err) return console.error('Error al leer el archivo:', err);

        // Convertir el contenido en un array de objetos
        let objetos = data.split('\n').filter(linea => linea).map(JSON.parse);

        // Buscar y modificar el objeto con el valor1 dado
        const index = objetos.findIndex(obj => obj.valor1 === valor1);
        if (index === -1) return console.log(`No se encontró ningún objeto con valor1: ${valor1}`);

        objetos[index].valor2 = nuevoValor2;  // Cambiar valor2

        // Guardar de nuevo el archivo con el objeto modificado
        fs.writeFile('datos.txt', objetos.map(JSON.stringify).join('\n'), 'utf8', (err) => {
            if (err) return console.error('Error al escribir en el archivo:', err);
            console.log(`Objeto con valor1: ${valor1} modificado correctamente.`);
        });
    });
}

// Obtener los argumentos de la línea de comandos
const args = process.argv.slice(2);

// Lógica para verificar los argumentos
if (args.length === 2) {
    const [valor1, valor2] = args;
    escribirArchivo(valor1, valor2);
} else if (args.length === 1 && args[0].toLowerCase() === 'leer') {
    leerArchivo();
} else if (args.length === 3 && args[0].toLowerCase() === 'modificar') {
    const [_, valor1, nuevoValor2] = args;
    modificarObjeto(valor1, nuevoValor2);
} else {
    console.log('Uso incorrecto !. Proporciona dos argumentos para escribir: node archivo.js valor1 valor2');
    console.log('O proporciona "leer" como argumento para leer el archivo: node archivo.js leer');
    console.log('O utiliza "modificar valor1 nuevoValor2" para modificar un objeto existente');
}
