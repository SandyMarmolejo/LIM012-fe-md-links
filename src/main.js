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

// Lectura sincrónica del contenido de un archivo
const obtenerContenidoDeArchivo = ruta => fs.readFileSync(ruta, 'utf8');

// Obteniendo los links de los archivos MD
// Retorna un array de objetos con tres propiedades por cada link
const obtenerLinks = (ruta) => {
  const arrayLinks = [];

  // Inicializando el marked Renderer para establecer una busqueda especifica (links)
  const renderer = new marked.Renderer();
  const file = ruta;

  // Preparando el marked options
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
    // Concateno la ruta del directorio y (nombre de archivo o directorio q estoy recorriendo)
    const rutaElemento = `${rutaDirectorio}\\${elemento}`;

    if (esArchivo(rutaElemento)) {
      if (esArchivoMd(rutaElemento)) {
        arrayArchivos.push(rutaElemento);
      }
    } else {
      // Llamar recurisavente a la funcion
      obtenerArchivosMdDelDirectorio(rutaElemento, arrayArchivos);
    }
  });

  return arrayArchivos;
};

// Validación de los links, retorna una promesa de array de objetos (links) con propiedades
const validarLinks = (arrayLinks) => {
  const arrayDePromesas = arrayLinks.map(link => new Promise(resolve => fetch(link.href)
    .then((resultado) => {
      const linkConEstado = {
        href: link.href,
        text: link.text,
        file: link.file,
      };

      linkConEstado.status = resultado.status;

      if (resultado.status >= 200 && resultado.status <= 308) {
        linkConEstado.statusText = 'ok';
      } else {
        linkConEstado.statusText = 'fail';
      }
      resolve(linkConEstado);
    })
    .catch(err => console.log(err))));

  return Promise.all(arrayDePromesas)
    .then(resultado => resultado);
};

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
