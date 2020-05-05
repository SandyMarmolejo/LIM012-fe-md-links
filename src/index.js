const main = require('./main.js');

/*const mdLinks = (route, option) => {}*/


const ejecutaPrograma = (ruta) => {
  let rutaAbsoluta = ruta;

  if (main.esRutaAbsoluta(rutaAbsoluta) === false) {
    rutaAbsoluta = main.convertirARutaAbsoluta(rutaAbsoluta);
  }

  if (main.esRutaValida(rutaAbsoluta)) {
    if (main.esArchivo(rutaAbsoluta)) {
      // Búsqueda de archivos.md
      if (main.esArchivoMd(rutaAbsoluta)) {

        // Lectura del archivo y obtención de links
        let links = main.obtenerLinks(rutaAbsoluta);

        if (links.length > 0 ) {
         
         

        }else{
          console.log('No se encontraron links en este archivo');
        }

      } else {
        console.log('Tipo de archivo no válido');
      }

    } else {
      // Recorrer el directorio en búsqueda de archivos
    }
    
  } else {
    console.log('La ruta no es válida');
  }

};


ejecutaPrograma('ruta');
