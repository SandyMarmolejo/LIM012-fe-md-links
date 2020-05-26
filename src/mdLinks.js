const main = require('./main.js');

const mdLinks = (ruta, options) => new Promise((resolve, reject) => {
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
          if (options === undefined || options.validate === false) {
            resolve(links);
          } else if (options.validate === true) {
            resolve(main.validarLinks(links));
          }
        } else {
          const error = new Error('No se encontraron links en este archivo');
          reject(error.message);
        }
      } else {
        const error = new Error('Tipo de archivo no válido');
        reject(error.message);
      }
    } else {
      // Navegar directorio en búsqueda de archivos md, retorna la ruta absoluta de los archivos md.
      // Paso como parámetro un array vacío, el resultado acum se guarda en rutaArchivosMdDelDirectorio.
      const rutaArchivosMdDelDirectorio = main.obtenerArchivosMdDelDirectorio(rutaAbsoluta, []);
      const linksDelDirectorio = [];

      rutaArchivosMdDelDirectorio.forEach((rutaArchivoMd) => {
        const links = main.obtenerLinks(rutaArchivoMd);
        if (links.length > 0) {
          links.forEach((link) => {
            linksDelDirectorio.push(link);
          });
        }
      });
      if (options === undefined || options.validate === false) {
        resolve(linksDelDirectorio);
      } else if (options.validate === true) {
        resolve(main.validarLinks(linksDelDirectorio));
      }
      if (linksDelDirectorio.length === 0) {
        const error = new Error('No hay links');
        reject(error.message);
      }
    }
  } else {
    const error = new Error('La ruta no es válida');
    reject(error.message);
  }
});

module.exports = {
  mdLinks,
};
