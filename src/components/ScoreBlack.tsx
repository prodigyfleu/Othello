import React from 'react'
import "tailwindcss/tailwind.css";

export const ScoreBlack = () => {

  return (
    <div className='fixed top-1/2 left-10 transform -translate-y-1/2 font-bold font-sans text-4xl'>
      <h1 id="puntuacionNegra">Black's Score: 2</h1>
      <br />
      <h1 id="FichasRestantesNegra">You have: 30 chips left</h1>
    </div>
  )
}
