import React from "react"
import App from "./App"
import logo from "./logo.png"

export default function FirstPage() {
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
      {showGame ? <App /> :
        <div className="IntroPage">
          <img src={logo} className="logo" alt="logo" width="350px" height="275px" />
          <h1 className="IntroPage--tittle-1">Tenzies Game</h1>
          <h2 className="IntroPage--tittle-2">Hello user from {city}!</h2>
          <p className="IntroPage--instructions">Roll until all dice are the same.Click each die to freeze it <br />
            at its current value between rolls.</p>
          <button className="IntroPage--button" onClick={ClickHandler}>Start Game</button>
        </div>}
    </div>
  )
}