import './Die.css';

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? '#59E391' : 'white',
  };

  function dotsValue(value) {
    const dotsArray = [];
    for (let i = 1; i <= value; i++) {
      dotsArray.push(
        <div className={`dot dot--${value}`} key={Math.random()}></div>
      );
    }
    return dotsArray;
  }

  return (
    <div className='die-face' style={styles} onClick={props.holdDice}>
      {dotsValue(props.value)}
    </div>
  );
}
