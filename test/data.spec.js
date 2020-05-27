const main = require('../src/main.js');
const mdLinks = require('../src/mdLinks.js');

describe('esRutaAbsoluta', () => {
  it('is a function', () => {
    expect(typeof main.esRutaAbsoluta).toBe('function');
  });
  it('Ruta relativa deberia retornar un false', () => {
    const input = 'rutaPrueba';
    const output = false;
    expect(main.esRutaAbsoluta(input)).toEqual(output);
  });
  it('Ruta absoluta deberia retornar un true', () => {
    const input = 'C:/foo/..';
    const output = true;
    expect(main.esRutaAbsoluta(input)).toEqual(output);
  });
});

describe('convertirARutaAbsoluta', () => {
  it('is a function', () => {
    expect(typeof main.convertirARutaAbsoluta).toBe('function');
  });
  it('Deberia retornar una ruta absoluta', () => {
    const inputDos = 'foo';
    const outputDos = 'E:\\Laboratoria Sandy\\Proyectos Sandy\\LIM012-fe-md-links\\foo';
    expect(main.convertirARutaAbsoluta(inputDos)).toEqual(outputDos);
  });
});

describe('esRutaValida', () => {
  it('is a function', () => {
    expect(typeof main.esRutaValida).toBe('function');
  });
  it('Deberia retornar true', () => {
    const inputTres = 'rutaPruebaTres';
    const outputTres = true;
    expect(main.esRutaValida(inputTres)).toEqual(outputTres);
  });
});


describe('mdLinks', () => {
  it('Es una funcion', () => {
    expect(typeof mdLinks).toBe('function');
  });


// describe('mdLinks', () => {
//   it('deberia devolver un arreglo de objetos, donde cada objeto representa un link', (done) => 
