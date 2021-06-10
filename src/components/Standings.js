import { useEffect, useState } from 'react';
import { mapDriversToSession } from '../services/sessionDataService';
import '../styles/Standings.css';
import Driver from './Driver';
import StandingsHeader from './StandingsHeader';

const FASTEST_TIME = 1 * 60 * 1000 + 14 * 1000 + 0;
const SLOWEST_TIME = FASTEST_TIME + 3 * 1000;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

function Standings({
  drivers,
  paused,
  restartFlag,
  currentSession,
  timeRemaining,
}) {
  const [currentDriverOrder, setCurrentDriverOrder] = useState(
    mapDriversToSession(drivers)
  );
  const [sessionStartOrder, setSessionStartOrder] = useState(
    mapDriversToSession(drivers)
  );

  const getBestLapTimeMillis = () => currentDriverOrder[0].lapTime;
  const generateNewLapTime = () => getRandomInt(SLOWEST_TIME, FASTEST_TIME);

  const updateOrder = () => {
    let newDriverOrder = currentDriverOrder.map((driver) => {
      const newLapTime = generateNewLapTime();
      const bestTime =
        driver.lapTime === 0
          ? newLapTime
          : driver.lapTime > newLapTime
          ? newLapTime
          : driver.lapTime;

      console.log(driver);
      return {
        ...driver,
        lapTime: bestTime,
      };
    });
    newDriverOrder.sort((a, b) => a.lapTime - b.lapTime);

    setCurrentDriverOrder(newDriverOrder);
  };

  const resetOrder = () => {
    setCurrentDriverOrder(sessionStartOrder);
  };

  useEffect(() => {
    if (timeRemaining > 0 && timeRemaining % (1 * 60 + 1) === 0) {
      updateOrder();
    }
  }, [timeRemaining]);

  useEffect(() => resetOrder(), [restartFlag]);

  return (
    <table className='Standings-table'>
      <col className='Standings-colSmall' />
      <col className='Standings-colSmall' />
      <col className='Standings-colStandard' />
      <col className='Standings-colStandard' />
      <col className='Standings-colStandard' />
      <col className='Standings-colStandard' />
      <thead>
        <StandingsHeader />
      </thead>
      <tbody>
        {currentDriverOrder.map((driver, index) => (
          <tr key={driver.id} className='Standings-row'>
            <td>{index + 1}.</td>
            <Driver
              driver={driver}
              lapTime={driver.lapTime}
              bestLap={getBestLapTimeMillis()}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Standings;
