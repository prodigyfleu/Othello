import React from 'react';
import './SquareComponent.css';

const SquareComponent = () => {
  const rulesList = [
    'El juego se juega (en su modalidad clasica) en un tablero 8x8.',
    'Cada jugador coloca discos en el tablero para atrapar los discos del oponente entre dos de sus propios discos.',
    'El juego termina cuando el tablero está lleno o ninguno de los jugadores puede realizar un movimiento válido.',
    'El jugador con más discos de su color en el tablero al final del juego gana.',
  ];

  return (
    <div className="square bg-blur flex flex-col items-center justify-start p-4 space-y-4 font-oswald">
      <img
        className="w-48 mt-8 mb-4"
        src="https://unothello.keithhamiltoncobb.com/wp-content/uploads/2021/09/text-othello.png"
        alt="Othello"
      />
      <br />
      <h2 className='text-xl font-bold mb-4'>El objetivo del juego es tener más fichas de tu color que el oponente al final del juego.</h2>
      <br />
      <h2 className='text-xl font-semibold mb-4'>Estas son las reglas del juego:</h2>
      <div className="flex flex-col items-center space-y-2">
        {rulesList.map((rule, index) => (
          <p key={index} className="text-center font-medium">
            {index + 1}. {rule}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SquareComponent;