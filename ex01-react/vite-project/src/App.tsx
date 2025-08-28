import { useEffect, useState } from 'react';
import './App.css';

import { getRandomQuote } from './service/getRandomQuote';
import { getRandomNumber } from './service/getRandomNumber';

function App() {
  const [randomNumber, setRandomNumber] = useState(0);
  const [randomQuote, setRandomQuote] = useState('');
  
  useEffect(() => {
    const quote = getRandomQuote();
    quote.then((data) => setRandomQuote(data));

    const number = getRandomNumber();
    number.then((data) => setRandomNumber(data));
  }, []);

  return (
    <div className='App'>
      <div className='card_quote__container'>
        <h1>Random Quote</h1>
        <p>{randomQuote}</p>
      </div>
      <div className='card_number__container'>
        <h1>Random Number</h1>
        <input type='text' value={randomNumber} readOnly />
      </div>
    </div>
  )
}

export default App
