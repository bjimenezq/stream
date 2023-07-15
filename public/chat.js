const socket = io();

const videoFileInput = document.getElementById('video-file');
const videoElement = document.getElementById('movie');

videoFileInput.addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const videoData = e.target.result;
      socket.emit('video:load', videoData); // Envía el video cargado a través del socket
    };
    reader.readAsDataURL(file);
  }
});

socket.on('video:load', function(videoData) {
  videoElement.src = videoData; // Actualiza el video cargado en el elemento de video
  socket.emit('video:play'); // Inicia la reproducción del video para todos los clientes
});

socket.on('video:play', function() {
  videoElement.play(); // Inicia la reproducción del video
});

socket.on('video:pause', function() {
  videoElement.pause(); // Pausa la reproducción del video
});
