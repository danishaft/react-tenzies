import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import Die from "./die"

function App() {
  const [diceArr, setDiceArr] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [rollCount, setRollCount] = useState(0)
  const [score, setScore] = useState(()=> JSON.parse(localStorage.getItem("allTimeScores")) || [])

  useEffect(()=>{
    const allHeld = diceArr.every(die=> die.isHeld)
    const allSameValue = diceArr.every(die=> diceArr[0].value === die.value)
    if(allHeld && allSameValue){
      setTenzies(true)
    }
  },[diceArr])

  useEffect(()=>{
    localStorage.setItem("allTimeScores", JSON.stringify(score))
  },[tenzies])

  function generateDice(){
    return {
      value:Math.floor(Math.random()*6), 
      isHeld:false, 
      id:nanoid()
    }
  }
  function allNewDice(){
    const newDice = []
    for(let i = 0; i< 10; i++){
      newDice.push(generateDice())
    }
    return newDice
  }
  function highestScore(){
    return Math.round(1000 / rollCount)
  }

  function rollDice(){
    if(!tenzies){
      setDiceArr(prevSate=>{
        return prevSate.map(die=>{
          return die.isHeld ? die : generateDice()
        })
      })
      setRollCount(prevSate=>prevSate + 1)
    }else{
      setDiceArr(allNewDice())
      setScore(prev=>[...prev, highestScore()])
      setRollCount(0)
      setTenzies(false)
    }
  }

  function holdDie(id){
    setDiceArr(prevSate=>{
      return prevSate.map(die=>{
        return die.id === id ? {...die, isHeld: !die.isHeld} : die
      })
    })
  }

  
  const diceElements = diceArr.map(die=>{
    return <Die key={die.id} value={die} holdDie={()=>holdDie(die.id)} />
  })
  console.log(score)
  return (
    <main>
      {tenzies &&  <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="extra-details">
        <p className="highest-score">Highest Score: {Math.max(...score)}</p>
        <p className="roll-count">Rolls: {rollCount}</p>
      </div>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice} >{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App
