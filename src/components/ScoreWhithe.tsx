import React from 'react'
import "tailwindcss/tailwind.css"; // importar Tailwind

export const ScoreWhithe = () => {

  return (
    <div className='absolute top-80 right-80 ml-80 font-bold font-sans text-2xl'>
      <h1 id="puntuacionBlanca">White's score: 2</h1>
      <br />
      <h1 id="FichasRestantesBlanca">You have: 30 chips left</h1>
    </div>
  )
}
