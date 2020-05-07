const path = require('path');
const fs = require('fs');
const marked = require('marked');

// Determina si es una ruta absoluta, retorna un booleano.
const esRutaAbsoluta = (ruta) => {
  const esAbsoluta = path.isAbsolute(ruta);
  return esAbsoluta;
};

// Convirtiendo de ruta relativa a ruta absoluta.
const convertirARutaAbsoluta = (ruta) => {
  const rutaAbsoluta = path.resolve(ruta);
  return rutaAbsoluta;
};

// Comprobando si la ruta es válida tanto si es fichero o carpeta, retorna un booleano.
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

    arrayLinks.push(link);
  };

  const contenidoArchivo = obtenerContenidoDeArchivo(ruta);

  // Convierte el contenido en html y usa el renderer para buscar lo que hemos establecido (links) pero puede ser otro tag html.
  marked(contenidoArchivo, { renderer });

  return arrayLinks;
};

// Lectura sincrónica del contenido de un directorio, retorna un array (nombre de archivos y directorios).
const obtenerElementosDelDirectorio = rutaDirectorio => fs.readdirSync(rutaDirectorio, 'utf8');

const arrayArchivos = [];

const procesarElementosDelDirectorio = (rutaDirectorio) => {
  const elementos = obtenerElementosDelDirectorio(rutaDirectorio);

  elementos.forEach((elemento) => {
    const rutaElemento = `${rutaDirectorio}\\${elemento}`;

    if (esArchivo(rutaElemento)) {
      if (esArchivoMd(rutaElemento)) {
        arrayArchivos.push(rutaElemento);
      }
    } else {
      procesarElementosDelDirectorio(rutaElemento);
    }
  });

  return arrayArchivos;
};

console.log(procesarElementosDelDirectorio('E:\\Laboratoria Sandy\\Proyectos Sandy\\LIM012-fe-md-links\\Dir01Prueba'));


module.exports = {
  esRutaAbsoluta,
  convertirARutaAbsoluta,
  esRutaValida,
  esArchivo,
  esArchivoMd,
  obtenerLinks,
};
