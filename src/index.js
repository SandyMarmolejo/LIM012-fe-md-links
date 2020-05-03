const main = require('./main.js');

const ejecutaPrograma = (ruta) => {
  let rutaAbsoluta = ruta;

  if (main.esRutaAbsoluta(rutaAbsoluta) === false) {
    rutaAbsoluta = main.convertirARutaAbsoluta(rutaAbsoluta); 
    console.log(rutaAbsoluta);
  }

  if (main.esRutaValida(rutaAbsoluta)) {
    /* condicion */
    console.log('La ruta es válida');
  } else {
    console.log('La ruta no es válida');
  }
};


ejecutaPrograma('package.json');
