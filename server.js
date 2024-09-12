const http = require('http');

// Crear el servidor HTTP
const server = http.createServer((req, res) => {
    // Rutas según la URL solicitada
    if (req.url === '/saludo') {
        // Encabezado de la respuesta
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});

        // Escribir contenido para la ruta /saludo
        res.write('<h1>Hola, bienvenido a la página de saludo.</h1>');
        res.write('<h2></h2>');
        res.write('<table></table>')

        // Finalizar la respuesta
        //res.end(); sólo para terminar la respuesta.
        res.end('<p>Este es el fin del saludo.</p>');

    } else if (req.url === '/welcome') {
        // Encabezado de la respuesta
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

        // Escribir contenido para la ruta /welcome
        res.write('<h1>Welcome to the landing page!</h1>');

        // Simular procesamiento antes de finalizar
        setTimeout(() => {
            res.end('<h1>This is the end of the request.</h1>');
        }, 3000);  // Esperamos 1 segundo antes de finalizar

    } else {
        // Ruta no encontrada
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Ruta no encontrada.\n');
        process.exit(); // Ctrl + C 
    }
});

// Iniciar el servidor en el puerto 3000
server.listen(3000, () => {
    console.log('Servidor ejecutándose en http://localhost:3000');

    // setTimeout(() => {
    //     console.log('El servidor se cerrará ahora...');
    //     process.exit();
    // }, 6000);
});
