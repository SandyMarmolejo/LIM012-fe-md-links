#!/usr/bin/env node
const process = require('process');
const chalk = require('chalk');
const mdLinks = require('./mdLinks.js');

const cli = (ruta, opcionUno, opcionDos) => {
  if ((opcionUno === '--validate' && opcionDos === '--stats') || (opcionUno === '--stats' && opcionDos === '--validate')) {
    mdLinks.mdLinks(ruta, { validate: true })
      .then((links) => {
        if (links.length === 0) {
          console.log('No hay links');
        } else {
          const resultadoLinksConValidarYStats = mdLinks.validarConStats(links);

          console.log(chalk.greenBright(`Total : ${resultadoLinksConValidarYStats.total}`));
          console.log(chalk.greenBright(`Unique : ${resultadoLinksConValidarYStats.unique}`));
          console.log(chalk.redBright(`Broken : ${resultadoLinksConValidarYStats.broken}`));
        }
      })
      .catch(console.error);
  } else if (opcionUno === '--validate') {
    mdLinks.mdLinks(ruta, { validate: true })
      .then((links) => {
        if (links.length === 0) {
          console.log('No hay links');
        } else {
          links.forEach((link) => {
            console.log(`${link.file} ${chalk.blueBright(link.href)} ${chalk.magentaBright(link.status)} ${chalk.green(link.statusText)} ${link.text}`);
          });

        }
      })
      .catch(console.error);
  } else if (opcionUno === '--stats') {
    mdLinks.mdLinks(ruta, { validate: true })
      .then((links) => {
        if (links.length === 0) {
          console.log('No hay links');
        } else {
          const resultadoLinksConStats = mdLinks.stats(links);

          console.log(chalk.greenBright(`Total : ${resultadoLinksConStats.total}`));
          console.log(chalk.greenBright(`Unique : ${resultadoLinksConStats.unique}`));
        }
      })
      .catch(console.error);
  } else if (opcionUno === undefined && opcionDos === undefined) {
    mdLinks.mdLinks(ruta)
      .then((links) => {
        if (links.length === 0) {
          console.log('No hay links');
        } else {
          links.forEach((link) => {
            console.log(`${link.file} ${chalk.blueBright(link.href)} ${link.text}`);
          });
        }
      })
      .catch(console.error);
  } else {
    console.log('Opcion inválida');
  }
};

if (process.argv.length <= 2) {
  console.log(chalk.red('Opción invalida.'));
  console.log(chalk.yellow('Ingrese como primer parámetro una ruta.'));
  console.log('Puedes elegir las siguientes opciones.');
  console.log('--validate : muestra los links encontrados y si funcionan o no.');
  console.log('--stats : muestra la cantidad total y únicos de links encontrados.');
  console.log('--validate --stats : muestra la cantidad total, únicos y rotos de links encontrados.');
} else if (process.argv.length === 3) {
  if (process.argv[2] === '--help') {
    console.log(chalk.green('Bienvenidos a mdLinks.'));
    console.log(chalk.yellow('Ingrese como primer parámetro una ruta.'));
    console.log('Puedes elegir las siguientes opciones.');
    console.log('--validate : muestra los links encontrados y si funcionan o no.');
    console.log('--stats : muestra la cantidad total y únicos de links encontrados.');
    console.log('--validate --stats : muestra la cantidad total, únicos y rotos de links encontrados.');
  } else {
    cli(process.argv[2]);
  }
} else if (process.argv.length === 4) {
  cli(process.argv[2], process.argv[3]);
} else if (process.argv.length === 5) {
  cli(process.argv[2], process.argv[3], process.argv[4]);
}


// md-links readme01.md --validate --stats

// console.log(process.argv)
// [
//   "cosasdelnode",
//   "cosasdosdelnode",
//   "readme01.md",
//   "--validate",
//   "-stats"
// ]
