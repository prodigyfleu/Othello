import React from 'react'
import "tailwindcss/tailwind.css"; // importar Tailwind

export const ScoreWhithe = () => {

  return (
    <div className='fixed top-1/2 right-10 transform -translate-y-1/2 font-bold font-sans text-4xl'>
      <h1 id="puntuacionBlanca">White's Score: 2</h1>
      <br />
      <h1 id="FichasRestantesBlanca">You have: 30 chips left</h1>
    </div>
  )
}
