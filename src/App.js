import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withdraw, deposit, addInterest, charges } from './store/counter';
import './App.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const dispatch = useDispatch();

  const handleOperation = (operation) => {
    const amount = Number(userInput);

    // Check if the user input is a valid number
    if (!isNaN(amount)) {
      switch (operation) {
        case 'withdraw':
          dispatch(withdraw(amount));
          break;
        case 'deposit':
          dispatch(deposit(amount));
          break;
        case 'addInterest':
          dispatch(addInterest(amount));
          break;
        case 'charges':
          dispatch(charges(amount));
          break;
        default:
          break;
      }

      setUserInput(''); // Reset input after performing operation
    }
  };

  const count = useSelector((state) => state.counter.value);

  // Fetch current time from an API
  const [fetchedTime, setFetchedTime] = useState(null);

  // Fetch current time from an API and set it in the state
  const fetchTime = async () => {
    try {
      const response = await fetch('https://worldtimeapi.org/api/ip');
      const data = await response.json();
      setFetchedTime(data.datetime);
    } catch (error) {
      console.error('Error fetching time:', error);
    }
  };

  return (
    <div className="page">
      <div className="App">
        <h1>£{count}</h1>
      </div>
      <div className="buttons">
        <button onClick={() => handleOperation('withdraw')}>Withdraw</button>
        <button onClick={() => handleOperation('deposit')}>Deposit</button>
        <button onClick={() => handleOperation('addInterest')}>Add Interest</button>
        <button onClick={() => handleOperation('charges')}>Charges</button>
        <button onClick={fetchTime}>Date and time</button>
      </div>
  
      <form className="form">
        <label>
          Value:
          <input
            type="text"
            name="value"
            onChange={(e) => setUserInput(e.target.value)}
            value={userInput}
          />
        </label>
      </form>
  
      {/* Display fetched time */}
      <h1>Date and time: {fetchedTime}</h1>
      
    </div>
  );
  }

export default App;
