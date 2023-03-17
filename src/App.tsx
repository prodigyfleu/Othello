import './App.css'
import InitialBoard from './components/InitialBoard'
import { ScoreBlack } from './components/ScoreBlack'
import { ScoreWhithe } from './components/ScoreWhithe'

function App() {
  
   return (
    <div className="w-full flex justify-center">
        <InitialBoard />
        <ScoreBlack/>
        <ScoreWhithe/>
    </div>
  )
}

export default App
