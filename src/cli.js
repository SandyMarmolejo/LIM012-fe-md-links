const mdLinks = require('./mdLinks.js');

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

const cli = (ruta, opcionUno, opcionDos) => {
  if ((opcionUno === '--validate' && opcionDos === '--stats') || (opcionUno === '--stats' && opcionDos === '--validate')) {
    console.log('Validate & stats: ');
    mdLinks(ruta, { validate: true })
      .then((links) => {
        if (links.length === 0) {
          console.log('No hay archivos md. que analizar');
        } else {
          const resultadoLinksConValidarYStats = validarConStats(links);

          console.log(`Total : ${resultadoLinksConValidarYStats.total}`);
          console.log(`Unique : ${resultadoLinksConValidarYStats.unique}`);
          console.log(`Broken : ${resultadoLinksConValidarYStats.broken}`);
        }
      })
      .catch(console.error);
  } else if (opcionUno === '--validate') {
    console.log('Validate: ');
    mdLinks(ruta, { validate: true })
      .then((links) => {
        if (links.length === 0) {
          console.log('No hay archivos md. que analizar');
        } else {
          console.table(links);
        }
      })
      .catch(console.error);
  } else if (opcionUno === '--stats') {
    console.log('Stats: ');
    mdLinks(ruta, { validate: true })
      .then((links) => {
        if (links.length === 0) {
          console.log('No hay archivos md. que analizar');
        } else {
          const resultadoLinksConStats = stats(links);

          console.log(`Total : ${resultadoLinksConStats.total}`);
          console.log(`Unique : ${resultadoLinksConStats.unique}`);
        }
      })
      .catch(console.error);
  } else {
    console.log('Opcion inválida');
  }
};
