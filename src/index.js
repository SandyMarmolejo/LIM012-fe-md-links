const main = require('./main.js');

const ejecutaPrograma = (ruta, stats, validar) => {
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
          if (stats && validar) {

          } else if (stats) {
            const totalLinks = links.length;
            const linksUnicos = [];

            links.forEach((link) => {
              if (linksUnicos.indexOf(link.href) === -1) {
                linksUnicos.push(link.href);
              }
            });

            const totalLinksUnicos = linksUnicos.length;
            console.log('Total:' + totalLinks);
            console.log('Unique:' + totalLinksUnicos);

          } else if (validar) {
            main.validarLinks(links);
          } else {
            links.forEach(link => {
              console.log(link.file + ' ' + link.href + ' ' + link.text);
            });
          };

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
          links.forEach(link => {
            linksDelDirectorio.push(link);
          })    
        }
      });
      
      if(stats && validar){

      }else if (stats){
        const totalLinks = linksDelDirectorio.length;
        const linksUnicos = [];

        linksDelDirectorio.forEach(link =>{
          if(linksUnicos.indexOf(link.href) === -1){
            linksUnicos.push(link.href);
          }
        });
        const totalLinksUnicos = linksUnicos.length;
        console.log('Total:' + ' ' + totalLinks);
        console.log('Unique:' + ' ' + totalLinksUnicos);

      }else if (validar){
         // Si pasamos la opción -validar, es para averiguar si el link funciona o no con 5 propiedades
         main.validarLinks(linksDelDirectorio);
      }else{
         // Retorna un array de objeto con 3 propiedades
         linksDelDirectorio.forEach(link => {
          console.log(link.file + ' ' + link.href + ' ' + link.text);
        });
      }

      if (linksDelDirectorio.length === 0) {
        console.log('No hay links');
      }
    }
  } else {
    console.log('La ruta no es válida');
  }
};

//ejecutaPrograma('E:\\Laboratoria Sandy\\Proyectos Sandy\\LIM012-fe-md-links\\Dir01Prueba\\PRUEBA02.md', true, false);

ejecutaPrograma('E:\\Laboratoria Sandy\\Proyectos Sandy\\LIM012-fe-md-links\\Dir01Prueba', true, false);
