import { useEffect, useState } from 'react';
import {
  getSessionPhases,
  mapDriversToSession,
} from '../services/sessionDataService';
import '../styles/Standings.css';
import Driver from './Driver';
import StandingsHeader from './StandingsHeader';

// in milliseconds: minutes + seconds
const lapTimeLimits = {
  Q1: {
    fastest: 1 * 60 * 1000 + 14 * 1000,
    offset: 2 * 1000,
  },
  Q2: {
    fastest: 1 * 60 * 1000 + 13 * 1000,
    offset: Math.floor(1.5 * 1000),
  },
  Q3: {
    fastest: 1 * 60 * 1000 + 12 * 1000,
    offset: 1 * 1000,
  },
};
const phases = getSessionPhases();
const activeSessions = { Q1: phases[1], Q2: phases[2], Q3: phases[3] };
const qualyOver = phases[phases.length - 1];
const lastQualifiedIn = { Q1: 15, Q2: 10 };

function Standings({ drivers, restartFlag, currentSession, timeRemaining }) {
  const [currentDriverOrder, setCurrentDriverOrder] = useState(
    mapDriversToSession(drivers)
  );
  const [sessionStartOrder, setSessionStartOrder] = useState(
    mapDriversToSession(drivers)
  );
  const [qualyStandings, setQualyStandings] = useState([]);

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  };

  const generateNewLapTime = (session, coeff) => {
    const sessionLimits = lapTimeLimits[session];
    return Math.floor(
      getRandomInt(
        sessionLimits.fastest + sessionLimits.offset,
        sessionLimits.fastest
      ) * coeff
    );
  };

  const getBestSessionTimeMillis = () => currentDriverOrder[0].lapTime;

  const evalBestTime = (currBest, newTime) =>
    currBest === 0 ? newTime : currBest > newTime ? newTime : currBest;

  const evalRowStyle = (index) => {
    const pos = index + 1;
    const eliminated = 'Standings-row-eliminated';
    const qualified = 'Standings-row-qualified';

    if (timeRemaining > 0) {
      return;
    }

    if (currentSession === activeSessions.Q1) {
      return pos > lastQualifiedIn.Q1 ? eliminated : qualified;
    }

    if (currentSession === activeSessions.Q2) {
      return pos > lastQualifiedIn.Q2 ? eliminated : qualified;
    }

    if (currentSession === activeSessions.Q3 || currentSession === qualyOver) {
      return pos === 1 ? qualified : '';
    }

    return '';
  };

  const updateOrder = () => {
    if (
      (timeRemaining === 0 || timeRemaining % (4 * 60 + 1) !== 0) &&
      timeRemaining !== 10
    ) {
      return;
    }

    let newDriverOrder = currentDriverOrder.map((driver) => {
      const newLapTime = generateNewLapTime(currentSession, driver.coeff);
      const bestTime = evalBestTime(driver.lapTime, newLapTime);

      console.log(driver);
      return {
        ...driver,
        lapTime: bestTime,
      };
    });
    newDriverOrder.sort((a, b) => a.lapTime - b.lapTime);

    setCurrentDriverOrder(newDriverOrder);
  };

  const resetOrder = () => setCurrentDriverOrder(sessionStartOrder);

  const proceedToNextSession = () => {
    const doElimination =
      currentSession === activeSessions.Q2 ||
      currentSession === activeSessions.Q3;
    const eliminateBelow =
      currentSession === activeSessions.Q2
        ? lastQualifiedIn.Q1
        : lastQualifiedIn.Q2;

    if (doElimination) {
      const eliminated = currentDriverOrder.filter(
        (driver, index) => index + 1 > eliminateBelow
      );
      const qualified = currentDriverOrder
        .filter((driver, index) => index < eliminateBelow)
        .map((driver) => ({ ...driver, lapTime: 0 }));

      setQualyStandings([...eliminated, ...qualyStandings]);
      setCurrentDriverOrder(qualified);
      setSessionStartOrder(qualified);
    } else if (currentSession === qualyOver) {
      setCurrentDriverOrder([...currentDriverOrder, ...qualyStandings]);
    }
  };

  useEffect(() => updateOrder(), [timeRemaining]);
  useEffect(() => resetOrder(), [restartFlag]);
  useEffect(() => proceedToNextSession(), [currentSession]);

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
          <tr
            key={driver.id}
            className={`Standings-row ${evalRowStyle(index)}`}>
            <td>{index + 1}.</td>
            <Driver
              driver={driver}
              lapTime={driver.lapTime}
              bestLap={getBestSessionTimeMillis()}
              currentSession={currentSession}
              pos={index + 1}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Standings;
