const path = require('path');
const fs = require('fs');

const esRutaAbsoluta = (ruta) => {
  // Determina si es una ruta absoluta
  const esAbsoluta = path.isAbsolute(ruta);
  return esAbsoluta;
};

const convertirARutaAbsoluta = (ruta) => {
  // Convirtiendo de ruta relativa a ruta absoluta
  const rutaAbsoluta = path.resolve(ruta);
  return rutaAbsoluta;
};

const esRutaValida = (ruta) => {
  // Comprobando si existe un archivo o directorio
  try {
    fs.statSync(ruta);
    return true;
  } catch (err) {
    return false;
  }
};


exports.esRutaAbsoluta = esRutaAbsoluta;
exports.convertirARutaAbsoluta = convertirARutaAbsoluta;
exports.esRutaValida = esRutaValida;
