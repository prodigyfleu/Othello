import './App.css'
import InitialBoard from './components/InitialBoard'
import { ScoreBlack } from './components/ScoreBlack'
import { ScoreWhithe } from './components/ScoreWhithe'

function App() {
  
   return (
    <div>
        <InitialBoard />
        <ScoreBlack/>
        <ScoreWhithe/>
    </div>
  )
}

export default App
