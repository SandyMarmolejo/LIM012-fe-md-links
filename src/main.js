const path = require('path');
const fs = require('fs');
const marked = require('marked');
const fetch = require('node-fetch');
const validUrl = require('valid-url');

// Determina si es una ruta absoluta, retorna un booleano.
const esRutaAbsoluta = ruta => path.isAbsolute(ruta);

// Convirtiendo de ruta relativa a ruta absoluta.
const convertirARutaAbsoluta = ruta => path.resolve(ruta);

// Comprobando si la ruta es válida tanto si es archivo o directorio, retorna un booleano.
const esRutaValida = (ruta) => {
  try {
    fs.statSync(ruta);
    return true;
  } catch (err) {
    return false;
  }
};

// Determinando si es un archivo, retorna un booleano.
const esArchivo = ruta => fs.statSync(ruta).isFile();

// Comprobando si existen archivos en formato MD, retorna la extensión de la ruta.
const esArchivoMd = (ruta) => {
  const extension = path.extname(ruta);
  return extension === '.md';
};

// Lectura sincrónica del contenido de un archivo.
const obtenerContenidoDeArchivo = ruta => fs.readFileSync(ruta, 'utf8');

// Obteniendo los links de los archivos MD.
const obtenerLinks = (ruta) => {
  const arrayLinks = [];

  // Inicializando el marked Renderer para establecer una busqueda especifica (links)
  const renderer = new marked.Renderer();
  const file = ruta;

  // Preparando el marked options, retorna un array de objetos con tres propiedades por cada link.
  renderer.link = (href, title, text) => {
    const link = {
      text,
      href,
      file,
    };
    // Validando que sean url absolutas
    if (validUrl.isUri(link.href)) {
      arrayLinks.push(link);
    }
  };

  const contenidoArchivo = obtenerContenidoDeArchivo(ruta);

  // Convierte el contenido en html y usa el renderer para buscar lo que hemos establecido (links).

  marked(contenidoArchivo, { renderer });

  return arrayLinks;
};

// Lectura sincrónica del contenido de un directorio, retorna un array (nombre de archiv y direct).
const obtenerElementosDelDirectorio = rutaDirectorio => fs.readdirSync(rutaDirectorio, 'utf8');

const obtenerArchivosMdDelDirectorio = (rutaDirectorio, arrayArchivos) => {
  const elementos = obtenerElementosDelDirectorio(rutaDirectorio);

  elementos.forEach((elemento) => {
    const rutaElemento = `${rutaDirectorio}\\${elemento}`;

    if (esArchivo(rutaElemento)) {
      if (esArchivoMd(rutaElemento)) {
        arrayArchivos.push(rutaElemento);
      }
    } else {
      obtenerArchivosMdDelDirectorio(rutaElemento, arrayArchivos);
    }
  });

  return arrayArchivos;
};

const validarLinks = (links) => {
// map every url to the promise of the fetch
  const requests = links.map(elem => fetch(elem.href)
    .then((resultado) => {
      const objetoCincoPropiedades = {
        href: elem.href,
        text: elem.text,
        file: elem.file,
      };

      objetoCincoPropiedades.status = resultado.status;
      if (resultado.status >= 200 && resultado.status <= 308) {
        objetoCincoPropiedades.statusText = 'ok';
      } else {
        objetoCincoPropiedades.statusText = 'fail';
      }
      return objetoCincoPropiedades;
    }));

  return Promise.all(requests)
    .then(response => console.log(response))
    .catch(err => console.error(err));
};


/* Ejemplos de links prueba para su validacion
404 - Not Found
https://github.com/node-fetch/node-fetch/blob/HEAD/ERROR-HANDLING.md

link roto
https://github.cp


// Link valida
https://www.google.com
*/

// Ruta de un archivo md
// 'E:\\Laboratoria Sandy\\Proyectos Sandy\\LIM012-fe-md-links\\PRUEBA01.md'

// La función mdLinks retorna una promesa
// const mdLinks = (ruta, options = { validate: true }) => new Promise((resolve, reject) => {


module.exports = {
  esRutaAbsoluta,
  convertirARutaAbsoluta,
  esRutaValida,
  esArchivo,
  esArchivoMd,
  obtenerLinks,
  obtenerArchivosMdDelDirectorio,
  validarLinks,
};
