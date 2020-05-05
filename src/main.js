const path = require('path');
const fs = require('fs');
const marked = require('marked');

// Determina si es una ruta absoluta, retorna un booleano
const esRutaAbsoluta = (ruta) => {
  const esAbsoluta = path.isAbsolute(ruta);
  return esAbsoluta;
};

// Convirtiendo de ruta relativa a ruta absoluta
const convertirARutaAbsoluta = (ruta) => {
  const rutaAbsoluta = path.resolve(ruta);
  return rutaAbsoluta;
};

// Comprobando si la ruta es válida tanto si es fichero o carpeta, retorna un booleano
const esRutaValida = (ruta) => {
  try {
    fs.statSync(ruta);
    return true;
  } catch (err) {
    return false;
  }
};

// Determina si es un archivo, retorna un booleano
const esArchivo = ruta => fs.statSync.isFile(ruta);

// Comprobando si existen archivos en formato MD 
const esArchivoMd = (ruta) => {
  const extension = path.extname(ruta);
  return extension === '.md';
};

// Lectura de los archivos, retorna los contenidos y datos almacenados en el archivo o error si alguno.
const obtenerContenidoDeArchivo = ruta => fs.readFileSync(ruta, 'utf8');

const obtenerLinks = (ruta) => {
  //creo array para guardar los links
  const links = [];

  //Inicializando el marked renderer
  const renderer = new marked.Renderer();
  const file = ruta;

  //Preparando el marked options para obtener los links
  renderer.link = (href, title, text) => {
    const link = {
      text,
      href,
      file,
    };
    links.push(link);
  };

  const contenidoArchivo = obtenerContenidoDeArchivo(ruta);
  marked(contenidoArchivo, { renderer });

  return links;
};

console.log(obtenerLinks('E:\\Laboratoria Sandy\\Proyectos Sandy\\LIM012-fe-md-links\\Readme.md'));



exports.esRutaAbsoluta = esRutaAbsoluta;
exports.convertirARutaAbsoluta = convertirARutaAbsoluta;
exports.esRutaValida = esRutaValida;
exports.esArchivo = esArchivo;
exports.esArchivoMd = esArchivoMd;
exports.obtenerLinks = obtenerLinks;
