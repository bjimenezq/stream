<?php 
function ratchetAutoload($className) {
    $baseDir = 'Ratchet-master/src/Ratchet'; // Reemplaza con la ubicación de la carpeta de Ratchet
    $fileName = $baseDir . '/' . str_replace('\\', '/', $className) . '.php';

    if (file_exists($fileName)) {
        require $fileName;
    }
}

spl_autoload_register('ratchetAutoload');


 ?>