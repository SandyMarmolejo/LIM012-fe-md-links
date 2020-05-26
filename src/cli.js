#!/usr/bin/env node
const process = require('process');
const mdLinks = require('./mdLinks.js');
const chalk = require('chalk');

const cli = (ruta, opcionUno, opcionDos) => {
  if ((opcionUno === '--validate' && opcionDos === '--stats') || (opcionUno === '--stats' && opcionDos === '--validate')) {
    mdLinks.mdLinks(ruta, { validate: true })
      .then((links) => {
        if (links.length === 0) {
          console.log('No hay links');
        } else {
          const resultadoLinksConValidarYStats = mdLinks.validarConStats(links);

          console.log(`Total : ${resultadoLinksConValidarYStats.total}`);
          console.log(`Unique : ${resultadoLinksConValidarYStats.unique}`);
          console.log(`Broken : ${resultadoLinksConValidarYStats.broken}`);
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
            console.log(`${link.file} ${link.href} ${link.text} ${chalk.green(link.status)} ${link.statusText}`);
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

          console.log(`Total : ${resultadoLinksConStats.total}`);
          console.log(`Unique : ${resultadoLinksConStats.unique}`);
        }
      })
      .catch(console.error);
  } else if (opcionUno == undefined && opcionDos == undefined) {
    mdLinks.mdLinks(ruta)
      .then((links) => {
        if (links.length === 0) {
          console.log('No hay links');
        } else {
          links.forEach((link) => {
            console.log(`${link.file} ${link.href} ${link.text}`);
          });
        }
      })
      .catch(console.error);
  } else {
    console.log('Opcion inválida');
  }
};

if (process.argv.length <= 2) {
  console.log(chalk.red('Opción invalida'));
  console.log(chalk.yellow('Ingrese como primer parámetro una ruta'));
  console.log('Y además tiene las siguientes opciones');
  console.log('--validate : ');
  console.log('--stats : ');
  console.log('--validate --stats : ');
} else if (process.argv.length === 3) {
  if (process.argv[2] === '--help') {
    console.log(chalk.green('Bienvenidos a mdLinks'));
    console.log(chalk.yellow('Ingrese como primer parámetro una ruta'));
    console.log('Y además tiene las siguientes opciones');
    console.log('--validate : ');
    console.log('--stats : ');
    console.log('--validate --stats : ');
  } else {
    cli(process.argv[2]);
  }
} else if (process.argv.length === 4) {
  cli(process.argv[2], process.argv[3]);
} else if (process.argv.length === 5) {
  cli(process.argv[2], process.argv[3], process.argv[4]);
}