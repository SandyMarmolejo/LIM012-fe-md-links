const chalk = require('chalk');
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
            links.forEach((link) => {
              console.log(`${link.file} ${link.href} ${link.text}`);
            });
          } else if (options.validate === true) {
            main.validarLinks(links);
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
        linksDelDirectorio.forEach((link) => {
          console.log(`${link.file} ${link.href} ${link.text}`);
        });
      } else if (options.validate === true) {
        main.validarLinks(linksDelDirectorio);
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


mdLinks('E:\\Laboratoria Sandy\\Proyectos Sandy\\LIM012-fe-md-links\\Dir01Prueba\\PRUEBA02.md', { validate: false })
// mdLinks('E:\\Laboratoria Sandy\\Proyectos Sandy\\LIM012-fe-md-links\\Dir01Prueba', { validate: true })
// mdLinks('E:\\Laboratoria Sandy\\Proyecto Sandy\\LIM012-fe-md-links\\Dir01Prueba')
  .then(element => console.log(element))
  .catch(error => console.log(chalk.red(error)));


module.exports = {
  mdLinks,
};
