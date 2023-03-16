import React from 'react';

type Props = {
  reiniciarTablero: () => void;
};

const BotonReiniciar: React.FC<Props> = ({ reiniciarTablero }) => {
  return (
    <button
      className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-black text-white py-2 px-4 rounded-lg"
      onClick={reiniciarTablero}
    >
      Restart Game
    </button>
  );
};

export default BotonReiniciar;