const mdLinks = require('./mdLinks.js');


const cli = (ruta, opcionUno, opcionDos) => {
  if (opcionUno === '--stats' && opcionDos === '--validate') {
    // Retorna una promesa la funcion md link con array de objetos con 5 propiedades)
    mdLinks(ruta, { validate: true }).then((resp) => {
      console.log(resp);
    });
  } else if (opcionUno === '--stats') {
    mdLinks(ruta, { validate: false })
      .then((resp) => {
        const totalLinks = links.length;
        const linksUnicos = [];

        links.forEach((link) => {
        // Con indexOf se hace la busqueda de un elemento, si el elemento pasado como argumento a la función no existe entonces el valor retornado será -1
          if (linksUnicos.indexOf(link.href) === -1) {
            linksUnicos.push(link.href);
          }
        });

        const totalLinksUnicos = linksUnicos.length;
        console.log(`Total:${totalLinks}`);
        console.log(`Unique:${totalLinksUnicos}`);
      });
  }
};
