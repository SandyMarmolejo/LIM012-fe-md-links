const main = require('./main.js');

const ejecutaPrograma = (ruta, validar) => {
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
          if (validar) {
            main.validarLinks(links);
          } else {
            console.log(links);
          }
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
      const linksDelDirectorio = [];

      rutaArchivosMdDelDirectorio.forEach((rutaArchivoMd) => {
        const links = main.obtenerLinks(rutaArchivoMd);
        if (links.length > 0) {
          // Validar cada link
          if (validar) {
            main.validarLinks(links);
          } else {
            console.log(links);
          }
          linksDelDirectorio.push(links);
        }
      });
      if (linksDelDirectorio.length === 0) {
        console.log('No hay links');
      }
    }
  } else {
    console.log('La ruta no es válida');
  }
};

ejecutaPrograma('E:\\Laboratoria Sandy\\Proyectos Sandy\\LIM012-fe-md-links\\Dir01Prueba\\Dir02Prueba', true);
