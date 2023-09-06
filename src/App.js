import React from "react"
import Game from "./Components/Game"
import logo from "./App-logo.png"
import Background from "./Background"

export default function App() {
  const [showGame, setShowGame] = React.useState(false)
  const [city, setCity] = React.useState("")

  React.useEffect(() => {
    fetch('https://extreme-ip-lookup.com/json/?key=9nLcPDX63sfyU3VJ0Sg9')
      .then(res => res.json())
      .then(response => {
        setCity(response.city);
      })
      .catch((data, status) => {
        console.log('Request failed:', data);
      });
  }, [])

  function ClickHandler() {
    setShowGame(true)
  }

  return (
    <div>
      {showGame ? <Game /> :
        <div className="app">
          <Background />
          <img src={logo} className="logo" alt="logo" />
          <h2 className="tittle">🎉  Hello user from {city}! 🎉</h2>
          <p className="instructions">Roll until all dice are the same.Click each die to freeze it <br />
            at its current value between rolls.</p>
          <button className="app--button" onClick={ClickHandler}>Start Game</button>
        </div>}
    </div>
  )
}