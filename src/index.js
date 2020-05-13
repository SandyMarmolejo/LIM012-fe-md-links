const main = require('./main.js');

const ejecutaPrograma = (ruta) => {
  let rutaAbsoluta = '';

  if (main.esRutaAbsoluta(ruta)) {
    rutaAbsoluta = ruta;
  } else {
    rutaAbsoluta = main.convertirARutaAbsoluta(ruta);
  }
  if (main.esRutaValida(rutaAbsoluta)) {
    if (main.esArchivo(rutaAbsoluta)) {
      if (main.esArchivoMd(rutaAbsoluta)) {
        const links = main.obtenerLinks(rutaAbsoluta);
        if (links.length > 0) {
          //
        } else {
          console.log('No se encontraron links en este archivo');
        }
      } else {
        console.log('Tipo de archivo no válido');
      }
    } else {
      // Navegar directorio en búsqueda de archivos md, retorna la ruta absoluta de los archivos md.
      // Paso como parámetro un array vacío, el resultado acum se guarda en rutaArchivosMdDelDirectorio.
      const rutaArchivosMdDelDirectorio = main.obtenerArchivosMdDelDirectorio(rutaAbsoluta, []);

      rutaArchivosMdDelDirectorio.forEach((rutaArchivoMd) => {
        const links = main.obtenerLinks(rutaArchivoMd);
        if (links.length > 0) {
          // Validar cada link
        } else {
          console.log('No hay links');
        }
      });
    }
  } else {
    console.log('La ruta no es válida');
  }
};

ejecutaPrograma('ruta');
