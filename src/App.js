import React from "react"
import "./app.css"
import "./die.css"
import Die from "./Components/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import Timer from "./Components/Timer"
import logo from "./app-logo.png"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [winTenzies, setWinTenzies] = React.useState(false)
    const [rollsCount, setRollsCount] = React.useState(0)
    const [resetTimer, setResetTimer] = React.useState(false)

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setWinTenzies(true)
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }

    function rollDice() {
        //freeze dice
        if (!winTenzies) {
            setResetTimer(false)
            setRollsCount(prevNum => prevNum + 1)
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ?
                    die :
                    generateNewDie()
            }))
        } else {
            //new game
            setRollsCount(0)
            setWinTenzies(false)
            setDice(allNewDice())
            setResetTimer(true)
        }
    }

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        }))
    }

    const diceElements = dice.map(die => (
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
    ))

    return (
        <main>
            <img src={logo} className="app-logo" alt="logo" />
            {winTenzies && <Confetti />}
            <div className="dice-container">
                {diceElements}
            </div>

            <div className="score-container">
                <Timer
                    winTenzies={winTenzies}
                    resetTimer={resetTimer}
                />
                <h3 className="rolls">Rolls: {rollsCount}</h3>
            </div>

            <button
                className="roll-dice--button"
                onClick={rollDice}
            >
                {winTenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}