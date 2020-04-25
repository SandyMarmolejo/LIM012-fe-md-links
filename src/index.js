const main = require('./main.js');

const ejecutaPrograma = (ruta) => {
    let rutaAbsoluta = ruta
    
   if(main.esRutaAbsoluta(rutaAbsoluta) == false){
     rutaAbsoluta = main.convertirARutaAbsoluta(rutaAbsoluta) 
   }

  if(main.esRutaValida(rutaAbsoluta)){
    
  }else{
      console.log('La ruta no es válida');
  }
};




ejecutaPrograma('rutaPrueba');