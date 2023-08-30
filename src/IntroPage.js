import React from "react"
import App from "./App"
import logo from "./IntroPage-logo.png"

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
        <div className="introPage">
          <img src={logo} className="logo" alt="logo" />
          <h2 className="introPage--tittle">Hello user from {city}!</h2>
          <p className="introPage--instructions">Roll until all dice are the same.Click each die to freeze it <br />
            at its current value between rolls.</p>
          <button className="introPage--button" onClick={ClickHandler}>Start Game</button>
        </div>}
    </div>
  )
}