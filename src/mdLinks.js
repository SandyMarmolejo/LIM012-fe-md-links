/* eslint-disable no-console */
/* eslint-disable max-len */
const main = require('./main.js');


const mdLinks = (ruta, options) => {
  // eslint-disable-next-line no-new
  new Promise((resolve, reject) => {
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
            // Si se le pasa la opcion de validar o cuando el programa se ejecuta por default
            if (options === undefined || options.validate === false) {
              links.forEach((link) => {
                // RESOLVE MOSTRAR POR DEFAULT UN ARRAY DE OBJETOS CON 3 PROPIEDADES POR CADA LINK
                // FILE HREF Y TEXT(TRUNCADO A 50 CARACTERES)
                console.log(`${link.file} ${link.href} ${link.text}`);
              });
            } else if (options.validate === true) {
              // RESOLVE CON LA OPCION VALIDAR, MOSTRAR UN ARRAY DE OBJETOS CON 5 PROPIEDADES
              return main.validarLinks(links);
            }
          } else {
            // REJECT
            console.log('No se encontraron links en este archivo');
          }
        } else {
          // REJECT, MOSTRAR MENSAJE
          console.log('Tipo de archivo no válido');
        }
      } else {
        // Navegar directorio en búsqueda de archivos md, retorna la ruta absoluta de los archivos md.
        // eslint-disable-next-line max-len
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
        // RESOLVE, MOSTRAR POR DEFAULT UN ARRAY DE OBJETOS CON 3 PROPIEDADES X CADA LINK
        // FILE HREF Y TEXT(TRUNCADO A 50 CARACTERES)
        if (options === undefined || options.validate === false) {
          linksDelDirectorio.forEach((link) => {
            console.log(`${link.file} ${link.href} ${link.text}`);
          });
        } else if (options.validate === true) {
          main.validarLinks(linksDelDirectorio);
        }

        // REJECT, SI NO ENCUENTRA LINKS EN EL DIRECTORIO, MUESTRA MENSAJE
        if (linksDelDirectorio.length === 0) {
          console.log('No hay links');
        }
      }
    } else {
      console.log('La ruta no es válida');
    }
  });
};

//mdLinks('E:\\Laboratoria Sandy\\Proyectos Sandy\\LIM012-fe-md-links\\Dir01Prueba\\PRUEBA02.md');

mdLinks('E:\\Laboratoria Sandy\\Proyectos Sandy\\LIM012-fe-md-links\\Dir01Prueba');

module.exports = {
  mdLinks,
};
