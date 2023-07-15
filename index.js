const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

let currentVideoURL = null; // URL del video actualmente cargado
let currentVideoTime = 0; // Tiempo actual del video

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado:', socket.id);

    if (currentVideoURL) {
        socket.emit('video:load', currentVideoURL, currentVideoTime);
    }

    socket.on('video:load', (videoURL) => {
        currentVideoURL = videoURL;
        currentVideoTime = 0;
        io.emit('video:load', videoURL, currentVideoTime);
    });

    socket.on('video:play', () => {
        io.emit('video:play');
    });

    socket.on('video:pause', () => {
        io.emit('video:pause');
    });

    socket.on('video:seek', (currentTime) => {
        currentVideoTime = currentTime;
        io.emit('video:seek', currentTime);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});

http.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
