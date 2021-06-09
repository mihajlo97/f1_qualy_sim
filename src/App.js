// resources
import logo from './logo.svg';
import './App.css';
import circuits from './mock_data/circuits.js';
import drivers from './mock_data/drivers.js';

import SimulatorFrame from './components/SimulatorFrame.js';

import tryAppendFlagCodes from './services/fetchCountryFlagAPI.js';
import { useEffect, useState } from 'react';

function App() {
  const [flagCodesLoaded, setFlagCodesLoaded] = useState(false);
  const [availCircuits, setAvailCircuits] = useState(circuits);
  const [availDrivers, setAvailDrivers] = useState(drivers);

  useEffect(() => {
    tryAppendFlagCodes(availCircuits).then((circuitsWithCountryCodes) =>
      setAvailCircuits(circuitsWithCountryCodes)
    );
    tryAppendFlagCodes(availDrivers).then((driversWithCountryCodes) =>
      setAvailDrivers(driversWithCountryCodes)
    );
    setFlagCodesLoaded(true);
  }, []);

  return (
    <div className='App'>
      <h2>F1 Qualifying Simulator</h2>
      {flagCodesLoaded && (
        <SimulatorFrame circuits={availCircuits} drivers={availDrivers} />
      )}
    </div>
  );
}

const original = (
  <div className='App'>
    <header className='App-header'>
      <img src={logo} className='App-logo' alt='logo' />
      <p>
        Edit <code>yourself</code> and save to reload.
      </p>
      <a
        className='App-link'
        href='https://reactjs.org'
        target='_blank'
        rel='noopener noreferrer'>
        Learn React
      </a>
    </header>
  </div>
);

export default App;
