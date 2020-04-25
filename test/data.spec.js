const main = require('../src/main.js');

describe('esRutaAbsoluta', () => {
    it('is a function', () => {
        expect(typeof main.esRutaAbsoluta).toBe('function');
    });
    it('Deberia retornar un true', () => {
        const input = 'rutaPrueba';
        const output = true;
        expect(main.esRutaAbsoluta(input)).toEqual(output);
      });
});

describe('convertirARutaAbsoluta', () => {
    it('is a function', () => {
        expect(typeof main.convertirARutaAbsoluta).toBe('function');
    });
    it('Deberia retornar un string', () => {
        const inputDos = 'rutaPruebaDos';
        const outputDos = 'rutaAbsoluta';
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
