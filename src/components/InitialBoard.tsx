import BotonReiniciar from "./BotonRestart";
import swal from "sweetalert2";
import { TogglerSwitch } from './Sugerencias';
import { DiagonalToggle } from "./ToggleDiagonalMovements";

export default function InitialBoard() {

  let BBackground: HTMLElement | null; // variable de referencia para el fondo negro
  const tamañoCeldas =75; // tamaño de celdas (pixeles)
  const gap = 20; // Separación entre cuadrados (pixeles)
  let capaDeFichas: HTMLElement | null; // variable de referencia para las fichas
  let capaDeSugerencias: HTMLElement | null; // variable de referencia para las sugerencias
  let turno = 1;
  let TpuntuacionBlanca: HTMLElement | null; // variable de referencia para la puntuación
  let TpuntuacionNegra: HTMLElement | null; // variable de referencia para la puntuación
  let FichasRestantesNegra: HTMLElement | null; // variable de referencia para las fichas restantes
  let FichasRestantesBlanca: HTMLElement | null; // variable de referencia para las fichas restantes
  let fichasRestantesNegra = 30; // fichas restantes negras
  let fichasRestantesBlanca = 30; // fichas restantes blancas
  let gameOver = false; // variable para decidir si el juego ha terminado
  let sugerencias = 0; // variable para decidir si se muestran las sugerencias
  let movimientoDiagonal = false // variable para activar y desactivar el movimiento diagonal
  const boardSize = 8; // tamaño del tablero

  // funcion para crear el tablero
  let fichas: number[][] = []
  function initializeBoard(size: number) {
    fichas = new Array(size);
    for (let i = 0; i < size; i++) {
      fichas[i] = new Array(size).fill(0);
    }
    const mid = Math.floor(size / 2);
    fichas[mid - 1][mid - 1] = 2;
    fichas[mid - 1][mid] = 1;
    fichas[mid][mid - 1] = 1;
    fichas[mid][mid] = 2;
  }
  


//función on load
window.onload = function() {
  TpuntuacionNegra = document.getElementById('puntuacionNegra');
  TpuntuacionBlanca = document.getElementById('puntuacionBlanca');
  FichasRestantesNegra = document.getElementById('FichasRestantesNegra');
  FichasRestantesBlanca = document.getElementById('FichasRestantesBlanca');
  initializeBoard(boardSize);
  if(sugerencias === 1 && capaDeSugerencias){
    creaCapaDeSugerencias();
  }

// fondo negro
  BBackground = document.getElementById('BBackground');
  if (BBackground) {
    BBackground.style.position = "absolute";
    BBackground.style.background = "black";
    BBackground.style.width = `${tamañoCeldas * boardSize + (gap * 4)}px`;
    BBackground.style.height = `${tamañoCeldas * boardSize + (gap * 4)}px`;
    BBackground.style.borderRadius = "10px";
    BBackground.style.top = "50%";
    BBackground.style.left = "50%";
    BBackground.style.transform = "translate(-50%, -50%)";
  }

// capa de fichas
  capaDeFichas = document.getElementById('capaDeFichas');
  if(capaDeFichas){
  BBackground?.appendChild(capaDeFichas)};
  creaCuadrosVerdes();
  creaFichas();
  if (capaDeFichas) {
    capaDeFichas.style.position = "absolute";
    capaDeFichas.style.top = "0px";
    capaDeFichas.style.left = "0px";
    capaDeFichas.style.zIndex = "1";
  }

// capa de sugerencias
capaDeSugerencias = document.getElementById('capaDeSugerencias');
  if(sugerencias === 1 && capaDeSugerencias){
    creaCapaDeSugerencias();
  }
};


// función para crear los cuadros verdes del mapa (se modificará para expandir el tablero)
function creaCuadrosVerdes() {
  for (let filas = 0; filas < boardSize; filas++) {
    for (let columnas = 0; columnas < boardSize; columnas++) {
        const greenSquare = document.createElement('div');
        greenSquare.className = 'absolute bg-green-600';
        greenSquare.style.width = `${tamañoCeldas+3}px`;
        greenSquare.style.height = `${tamañoCeldas+3}px`;
        greenSquare.style.top = `${(60 + gap) * filas + gap}px`;
        greenSquare.style.left = `${(60 + gap) * columnas + gap}px`;
        greenSquare.style.borderRadius = "5px";
        greenSquare.onclick = () => clickEnCuadro(filas, columnas);
        if(BBackground !== null){
        BBackground.appendChild(greenSquare);
        }
      }
    }
  }

// función que se ejecuta al hacer click en un cuadro vacio 
function clickEnCuadro(filas: number, columnas: number) {

    if(gameOver === true){return};

    if(fichas[filas][columnas] != 0){
      return;
    }

    if(puedeDarClick(turno, filas, columnas) === true)
    {
      let fichasAfectadas: [] = getFichasAfectadas(turno, filas, columnas);
      girarFichas(fichasAfectadas);
      fichas[filas][columnas] = turno;
      if (turno === 1) {

        fichasRestantesNegra--;
      } else {
        fichasRestantesBlanca--;
      }

      if(turno === 1) turno = 2;
      else if (turno === 2) turno = 1;

      if (!puedeMover(1) || !puedeMover(2) || fichasRestantesBlanca === 0 || fichasRestantesNegra === 0) {
        gameOver = true;
        terminarJuego();
      }

      actualizaFichasRestantes();
      creaFichas();

      if (sugerencias === 1) {
        creaCapaDeSugerencias();
      }
      creaPuntuaciones();
    }    
  }

// función para verificar el lugar de click

  function puedeDarClick(id: number, filas: number, columnas: number): boolean {
    let fichasAfectadas: [] = getFichasAfectadas(id, filas, columnas);
    if(fichasAfectadas.length === 0) return false;
    else return true;
  }

// funcioon para comprobar si se pueden mover

  function puedeMover(id: number) {
    for (let filas = 0; filas < boardSize; filas++) {
      for (let columnas = 0; columnas < boardSize; columnas++) {
      if (fichas[filas][columnas] === 0 && puedeDarClick(id, filas, columnas)) {
        return true;
      }
    }
  }
  return false;
}

// función para crear puntuaciones

function creaPuntuaciones(){
  let puntuacionBlanca = 0;
  let puntuacionNegra = 0;
    

  for (let filas = 0; filas < boardSize; filas++) {
    for (let columnas = 0; columnas < boardSize; columnas++) {
        let value = fichas[filas][columnas];
        if(value === 2){ 
          puntuacionBlanca++;
        }
        if(value === 1){ 
          puntuacionNegra++;
        }
      }
    }

  if(TpuntuacionNegra !== null){
      TpuntuacionNegra.innerHTML = `Black's Score: ${puntuacionNegra}`;
    };
  if(TpuntuacionBlanca !== null){
      TpuntuacionBlanca.innerHTML = `White's Score: ${puntuacionBlanca}`;
    };
  }

  // función para crear las fichas

  function creaFichas(){
    if(capaDeFichas !== null){
    capaDeFichas.innerHTML = "";}
    for (let filas = 0; filas < boardSize; filas++) {
      for (let columnas = 0; columnas < boardSize; columnas++) {
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

// función para crear la capa de sugerencias

    function creaCapaDeSugerencias(){
  if(capaDeSugerencias !== null){
    capaDeSugerencias.remove();
  }
  for (let filas = 0; filas < boardSize; filas++) {
    for (let columnas = 0; columnas < boardSize; columnas++) {
      let value = fichas[filas][columnas];
      if(value === 0 && puedeDarClick(turno, filas, columnas)){
        const fichaSugerencia = document.createElement('div');
        fichaSugerencia.className = 'absolute';
        fichaSugerencia.style.width = `${tamañoCeldas - 5}px`;
        fichaSugerencia.style.height = `${tamañoCeldas - 5}px`;
        fichaSugerencia.style.borderRadius = '50%';
        fichaSugerencia.style.top = `${(60 + gap) * filas + gap + 4}px`;
        fichaSugerencia.style.left = `${(60 + gap) * columnas + gap + 4}px`;
        fichaSugerencia.style.zIndex = "50";
        fichaSugerencia.onclick = () => clickEnCuadro(filas, columnas);
        if(turno === 1){
          fichaSugerencia.style.border = "2px solid black";
        }
        if(turno === 2){
          fichaSugerencia.style.border = "2px solid white";
        }
        if(capaDeFichas !== null){
          capaDeFichas.appendChild(fichaSugerencia);
        }           
      }
    }
  }
}

// función para obtener las fichas afectadas

  function getFichasAfectadas(id: number, filas: number, columnas: number): [] {

    // a la derecha
    let fichasAfectadas: any = [];
    let fichasAfectadasTemp: any = [];
    let iteradorColumnas = columnas;
    let iteradorFilas = filas;
    while(iteradorColumnas < boardSize - 1){
      iteradorColumnas++;
      let value = fichas[filas][iteradorColumnas];
      if(value === 0 || value === id){
        if(value === id){
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
      if(value === 0 || value === id){
        if(value === id){
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
      if(value === 0 || value === id){
        if(value === id){
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
    while(iteradorFilas < boardSize - 1){
      iteradorFilas++;
      let value = fichas[iteradorFilas][columnas];
      if(value === 0 || value === id){
        if(value === id){
          fichasAfectadas = fichasAfectadas.concat(fichasAfectadasTemp);
        }
        break;
      } else {
        let localizacionFicha = {filas: iteradorFilas, columnas: columnas};
        fichasAfectadasTemp.push(localizacionFicha);
      }
    }

    // diagonales

    if (movimientoDiagonal){

      // diagonal hacia abajo derecha
      fichasAfectadasTemp = [];
      iteradorFilas = filas;
      iteradorColumnas = columnas;
      while(iteradorFilas < boardSize - 1 && iteradorColumnas < boardSize - 1){
        iteradorFilas++;
        iteradorColumnas++;
      let value = fichas[iteradorFilas][iteradorColumnas];
      if(value === 0 || value === id){
        if(value === id){
          fichasAfectadas = fichasAfectadas.concat(fichasAfectadasTemp);
        }
        break;
      } else {
        let localizacionFicha = {filas: iteradorFilas, columnas: iteradorColumnas};
        fichasAfectadasTemp.push(localizacionFicha);
      }
    }

    // diagonal hacia abajo izquierda
      fichasAfectadasTemp = [];
      iteradorFilas = filas;
      iteradorColumnas = columnas;
      while(iteradorFilas < boardSize - 1 && iteradorColumnas > 0){
        iteradorFilas++;
        iteradorColumnas--;
      let value = fichas[iteradorFilas][iteradorColumnas];
      if(value === 0 || value === id){
        if(value === id){
          fichasAfectadas = fichasAfectadas.concat(fichasAfectadasTemp);
        }
        break;
      } else {
        let localizacionFicha = {filas: iteradorFilas, columnas: iteradorColumnas};
        fichasAfectadasTemp.push(localizacionFicha);
      }
    }

    // diagonal hacia arriba izquierda
    fichasAfectadasTemp = [];
      iteradorFilas = filas;
      iteradorColumnas = columnas;
      while(iteradorFilas > 0 && iteradorColumnas > 0){
        iteradorFilas--;
        iteradorColumnas--;
      let value = fichas[iteradorFilas][iteradorColumnas];
      if(value === 0 || value === id){
        if(value === id){
          fichasAfectadas = fichasAfectadas.concat(fichasAfectadasTemp);
        }
        break;
      } else {
        let localizacionFicha = {filas: iteradorFilas, columnas: iteradorColumnas};
        fichasAfectadasTemp.push(localizacionFicha);
      }
    }

    // diagonal hacia abajo izquierda
      fichasAfectadasTemp = [];
      iteradorFilas = filas;
      iteradorColumnas = columnas;
      while(iteradorFilas > 0 && iteradorColumnas < boardSize - 1){
        iteradorFilas--;
        iteradorColumnas++;
      let value = fichas[iteradorFilas][iteradorColumnas];
      if(value === 0 || value === id){
        if(value === id){
          fichasAfectadas = fichasAfectadas.concat(fichasAfectadasTemp);
        }
        break;
      } else {
        let localizacionFicha = {filas: iteradorFilas, columnas: iteradorColumnas};
        fichasAfectadasTemp.push(localizacionFicha);
      }
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

// funcion para actualizar fichas restantes
  function actualizaFichasRestantes(){

    if (FichasRestantesNegra) {
      FichasRestantesNegra.textContent = `You have: ${fichasRestantesNegra} chips left`;
    }
    if (FichasRestantesBlanca) {
      FichasRestantesBlanca.textContent = `You have: ${fichasRestantesBlanca} chips left`;
    }
  }

 // función para terminar el juego
function terminarJuego() {
  let ganador = "";
  let puntuacionBlanca = 0;
  let puntuacionNegra = 0;
  let mensaje = "";

  for (let filas = 0; filas < boardSize; filas++) {
    for (let columnas = 0; columnas < boardSize; columnas++) {
      let value = fichas[filas][columnas];
      if (value === 2) {
        puntuacionBlanca++;
      }
      if (value === 1) {
        puntuacionNegra++;
      }
    }
  }

  
  if (puntuacionBlanca > puntuacionNegra) {
    mensaje = "White player wins!";
    ganador = "White";
  } else if (puntuacionBlanca < puntuacionNegra) {
    mensaje = "Black player wins!";
    ganador = "Black";
  } else {
    mensaje = "It's a tie!";
    ganador = "TIE";
  }

  let alerta = () => {swal.fire({
    icon: "success",
    title: `Game over! \nwinner: ${ganador}`,
    text: "Restart the game?",
    showCancelButton: true,
    confirmButtonText: "Restart",
    cancelButtonText: "Cancel",
    customClass: {
      confirmButton: "boton-reiniciar",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      reiniciarTablero();
    }
  });
}

  setTimeout(alerta, 1000)
    
}



// función para reiniciar el tablero

  function reiniciarTablero() {
    initializeBoard(boardSize);
    turno = 1;
    fichasRestantesNegra = 30;
    fichasRestantesBlanca = 30;
    gameOver = false;
    creaFichas();
    creaPuntuaciones();
    actualizaFichasRestantes();
  }

// botón para activar y desactivar sugerencias

const toggleSugerencias = (state: boolean) => {
    sugerencias = state ? 1 : 0;
    console.log(sugerencias)
    if (sugerencias === 1) {
      creaCapaDeSugerencias();
    } else {
      if (capaDeSugerencias) {
        capaDeSugerencias.remove();
      }
    }
  };

// botón para activar y desactivar diagonal

  const handleToggleDiagonal = (state: boolean) => {
    movimientoDiagonal = state;
  };


 

  return (
    <div>      
      <div id="BBackground"></div>
      <div id="capaDeFichas"></div>
      <div id="capaDeSugerencias"></div>
      <BotonReiniciar reiniciarTablero={reiniciarTablero} />     
      <DiagonalToggle onToggle={handleToggleDiagonal} />
      <TogglerSwitch onToggle={toggleSugerencias} />
    </div>
  )
}