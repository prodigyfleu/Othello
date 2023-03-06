export default function InitialBoard() {

  let BBackground: any; // variable de referencia para el fondo negro
  const tamañoCeldas =75; // tamaño de celdas (pixeles)
  const gap = 20; // Separación entre cuadrados (pixeles)
  let capaDeFichas: HTMLElement | null; // variable de referencia para las fichas
  let turno = 1;


  // tablero
  let fichas = [
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,2,1,0,0,0],
    [0,0,0,1,2,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
  ]

  //función on load
  window.onload = function(){
    BBackground = document.getElementById('BBackground');
    BBackground.style.width = `${tamañoCeldas * 8 + (gap*4)}px` ;
    BBackground.style.height = `${tamañoCeldas * 8 + (gap*4)}px`;
    capaDeFichas = document.getElementById('capaDeFichas');
    creaCuadrosVerdes();
    creaFichas();
  }

  // función para crear los cuadros verdes del mapa (se modificará para expandir el tablero)
  function creaCuadrosVerdes() {
    for (let filas = 0; filas < 8; filas++) {
      for (let columnas = 0; columnas < 8; columnas++) {
        const greenSquare = document.createElement('div');
        greenSquare.className = 'absolute bg-green-600';
        greenSquare.style.width = `${tamañoCeldas+3}px`;
        greenSquare.style.height = `${tamañoCeldas+3}px`;
        greenSquare.style.top = `${(60 + gap) * filas + gap}px`;
        greenSquare.style.left = `${(60 + gap) * columnas + gap}px`;
        greenSquare.onclick = () => clickEnCuadro(filas, columnas);
        BBackground.appendChild(greenSquare);
      }
    }
  }

  // función para crear fichas al hacer click en un cuadro vacio
  
  function clickEnCuadro(filas: number, columnas: number) {

    if(fichas[filas][columnas] !== 0) return; // si la celda no está vacía, no hacer nada.

    if(puedeDarClick(filas, columnas) === true){
      let fichasAfectadas = getFichasAfectadas(filas, columnas);
      girarFichas(fichasAfectadas);
      fichas[filas][columnas] = turno;
      turno === 1 ? turno = 2 : turno = 1;
      creaFichas();
    }      
  }
  
   // función para verificar el lugar de click

   function puedeDarClick(filas: number, columnas: number): boolean {
    let fichasAfectadas = getFichasAfectadas(filas, columnas);
    if(fichasAfectadas.length === 0) return false;
    else return true;
  }

  // función para obtener las fichas afectadas

  function getFichasAfectadas(filas: number, columnas: number){

    // a la derecha
    let fichasAfectadas: any = [];
    let fichasAfectadasTemp: any = [];
    let iteradorColumnas = columnas;
    let iteradorFilas = filas;
    while(iteradorColumnas < 7){
      iteradorColumnas++;
      let value = fichas[filas][iteradorColumnas];
      if(value === 0 || value === turno){
        if(value === turno){
          fichasAfectadas = fichasAfectadas.concat(fichasAfectadasTemp);
        }
        break;
      } else {
        let localizacionFicha = {filas: filas, columnas: iteradorColumnas};
        fichasAfectadasTemp.push(localizacionFicha);
      }
    }
  
    // a la izquierda
    fichasAfectadasTemp = [];
    iteradorColumnas = columnas;
    while(iteradorColumnas > 0){
      iteradorColumnas--;
      let value = fichas[filas][iteradorColumnas];
      if(value === 0 || value === turno){
        if(value === turno){
          fichasAfectadas = fichasAfectadas.concat(fichasAfectadasTemp);
        }
        break;
      } else {
        let localizacionFicha = {filas: filas, columnas: iteradorColumnas};
        fichasAfectadasTemp.push(localizacionFicha);
      }
    }

    // hacia abajo
    fichasAfectadasTemp = [];
    iteradorFilas = filas;
    while(iteradorFilas > 0){
      iteradorFilas--;
      let value = fichas[iteradorFilas][columnas];
      if(value === 0 || value === turno){
        if(value === turno){
          fichasAfectadas = fichasAfectadas.concat(fichasAfectadasTemp);
        }
        break;
      } else {
        let localizacionFicha = {filas: iteradorFilas, columnas: columnas};
        fichasAfectadasTemp.push(localizacionFicha);
      }
    }

    // hacia arriba
    fichasAfectadasTemp = [];
    iteradorFilas = filas;
    while(iteradorFilas < 7){
      iteradorFilas++;
      let value = fichas[iteradorFilas][columnas];
      if(value === 0 || value === turno){
        if(value === turno){
          fichasAfectadas = fichasAfectadas.concat(fichasAfectadasTemp);
        }
        break;
      } else {
        let localizacionFicha = {filas: iteradorFilas, columnas: columnas};
        fichasAfectadasTemp.push(localizacionFicha);
      }
    }
  
    return fichasAfectadas;
  }

  // función para girar las fichas

  function girarFichas(fichasAfectadas: any){
    for(let i = 0; i < fichasAfectadas.length; i++){
      let lugar = fichasAfectadas[i];
      if(fichas[lugar.filas][lugar.columnas] == 1){
        fichas[lugar.filas][lugar.columnas] = 2;
      } else {
        fichas[lugar.filas][lugar.columnas] = 1;
      }
    }
  }

  // función para crear las fichas

  function creaFichas(){
    if(capaDeFichas !== null){
    capaDeFichas.innerHTML = "";}
    for(let filas = 0; filas < 8; filas ++){
      for (let columnas = 0; columnas < 8; columnas++) {
        let value = fichas[filas][columnas];
        if(value === 0){

        } else {
          const ficha = document.createElement('div');
          ficha.className = 'absolute';
          ficha.style.width = `${tamañoCeldas - 5}px`;
          ficha.style.height = `${tamañoCeldas - 5}px`;
          ficha.style.borderRadius = '50%';
          ficha.style.top = `${(60 + gap) * filas + gap + 4}px`;
          ficha.style.left = `${(60 + gap) * columnas + gap + 4}px`;
          
          if(value === 1){
            ficha.style.background = "rgb(2,0,36)";
            ficha.style.background = "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 35%, rgba(70,76,78,1) 100%)";
          }
          if(value === 2){
            ficha.style.background = "rgb(255,255,255)";
            ficha.style.background = "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(247,237,237,1) 35%, rgba(223,215,215,1) 100%)";
          }

          if(capaDeFichas !== null){
          capaDeFichas.appendChild(ficha);}
        }
      }
    }
  }

  return (
    <>
      <div id="BBackground" className='absolute left-0 top-0 bg-black w-2/5 h-4/5'></div>
      <div id="capaDeFichas"></div>
    </>
    
  )
}
