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

// Funcion Stats, retorna total y unicos.
const stats = (links) => {
  const totalLinks = links.length;
  const linksUnicos = [];

  links.forEach((link) => {
    // Con indexOf se hace la busqueda de un elemento, si el elemento pasado como argumento a la función no existe entonces el valor retornado será -1
    if (linksUnicos.indexOf(link.href) === -1) {
      linksUnicos.push(link.href);
    }
  });

  const stat = {
    total: totalLinks,
    unique: linksUnicos.length,
  };

  return stat;
};

// Funcion Validar con Stats, retorna total, unicos y rotos
const validarConStats = (links) => {
  const stat = stats(links);
  const linksRotos = links => links.filter(link => link.statusText === 'Fail');

  const validarConStat = {
    total: stat.total,
    unique: stat.unique,
    broken: linksRotos.length,
  };

  return validarConStat;
};

module.exports = {
  mdLinks,
  stats,
  validarConStats,
};
