// resources
import './App.css';
import circuits from './mock_data/circuits.js';
import drivers from './mock_data/drivers.js';

import SimulatorFrame from './components/SimulatorFrame.js';

import tryAppendFlagCodes from './services/fetchCountryFlagAPI.js';
import { useEffect, useState } from 'react';

function App() {
  const [flagCodesLoaded, setFlagCodesLoaded] = useState(false);
  const [fetchingFailed, setFetchingFailed] = useState(false);
  const [availCircuits, setAvailCircuits] = useState(circuits);
  const [availDrivers, setAvailDrivers] = useState(drivers);

  const fetchFlagCodes = async () => {
    tryAppendFlagCodes(availCircuits).then((circuitsWithCountryCodes) =>
      setAvailCircuits(circuitsWithCountryCodes)
    );
    tryAppendFlagCodes(availDrivers).then((driversWithCountryCodes) =>
      setAvailDrivers(driversWithCountryCodes)
    );
  };

  useEffect(() => {
    fetchFlagCodes()
      .then(() => setFlagCodesLoaded(true))
      .catch(() => setFetchingFailed(true));
  }, []);

  return (
    <div className='App'>
      <h2>F1 Qualifying Simulator</h2>
      {flagCodesLoaded && (
        <SimulatorFrame circuits={availCircuits} drivers={availDrivers} />
      )}
      {fetchingFailed && (
        <p style={{ color: 'red' }}>
          Something went wrong while loading the app, please refresh the page.
        </p>
      )}
    </div>
  );
}

export default App;
