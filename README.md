# Md Links

## Información General
Markdown es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, etc), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio. 
(Ejemplo: README.md).

Estos archivos Markdown normalmente contienen _links_ que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

`Md links` es una herramienta que usa Node.js, para leer y analizar archivos en formato Markdown, para verificar los links contenidos y reportar algunas estadísticas.

## Instalación

npm install sandymarmolejo/md-links

## Usos

const mdLinks = require('sandymarmolejo-md-links');

#### Ejemplo

```js
const mdLinks = require("md-links");

mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);
```

### CLI (Command Line Interface - Interfaz de Línea de Comando)

Al colocar md-links en la terminal y --help se muestra el mensaje de bienvenida y las opciones que puedes escoger.

Por ejemplo:

<img src="Imagenes guia de uso\help.png">

Si no se ingresa ninguna ruta ni alguna de las opciones, se mostrará un mensaje de opción inválida y te volverá a mostar el mensaje de bienvenida y las opciones que puedes escoger.

<img src="Imagenes guia de uso\no se ingresa ninguna opcion ni ruta.png">

`md-links <path-to-file> [options]`

Por ejemplo:

<img src="Imagenes guia de uso\solo ruta.png">

Por default identifica el archivo markdown (a partir de la ruta que recibe como
argumento), analiza el archivo Markdown e imprimir los links que vaya
encontrando, junto con la ruta del archivo donde aparece y el texto
que hay dentro del link.

#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo debe hacer una petición HTTP para
averiguar si el link funciona o no, incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

Por ejemplo:

<img src="Imagenes guia de uso\opcion validate.png">

##### `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

Por ejemplo:

<img src="Imagenes guia de uso\opcion stats.png">

##### `--stats` y `--validate`

También podemos combinar las opciones para obtener estadísticas que
necesiten de los resultados de la validación.

Por ejemplo:

<img src="Imagenes guia de uso\opcion validate y stats.png">

## Objetivos de aprendizaje

Recuerda colocar en esta seccion los objetivos de aprendizaje que quedaron 
pendientes de tu proyecto anterior.

### Javascript
- [ ] Uso de callbacks
- [X] Consumo de Promesas
- [X] Creacion de Promesas
- [X] Modulos de Js
- [X] Recursión

### Node
- [X] Sistema de archivos
- [X] package.json
- [X] crear modules
- [X] Instalar y usar modules
- [X] npm scripts
- [X] CLI (Command Line Interface - Interfaz de Línea de Comando)

### Testing
- [X] Testeo de tus funciones
- [ ] Testeo asíncrono
- [ ] Uso de librerias de Mock
- [X] Mocks manuales
- [ ] Testeo para multiples Sistemas Operativos

### Git y Github
- [X] Organización en Github

### Buenas prácticas de desarrollo
- [X] Modularización
- [X] Nomenclatura / Semántica
- [ ] Linting
