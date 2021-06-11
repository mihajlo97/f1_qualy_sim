import {
  transformMillisToMinutesString,
  transformMillisToSecondsString,
  transformToMillisecondsString,
  getSessionPhases,
} from '../services/sessionDataService.js';
import Flag from './Flag.js';

function Driver({ driver, lapTime, bestLap, currentSession, pos }) {
  const convertTimeToNumber = (time) => parseInt(time);

  const checkIfLapSet = () => convertTimeToNumber(lapTime) > 0;

  const calcInterval = () => {
    if (!checkIfLapSet()) {
      return '- - : - - -';
    }

    const myTime = convertTimeToNumber(lapTime);
    const leaderTime = convertTimeToNumber(bestLap);
    const delta = myTime - leaderTime;
    const formattedDelta = `+${parseInt(
      delta / 1000
    )}:${transformToMillisecondsString(delta)}`;

    if (myTime === leaderTime) {
      const phases = getSessionPhases();
      return currentSession !== phases[phases.length - 1] ? 'Leader' : 'Pole';
    }

    const phases = getSessionPhases();
    if (currentSession === phases[phases.length - 1]) {
      return pos < 11 ? formattedDelta : pos < 16 ? 'Out in Q2' : 'Out in Q1';
    }

    return formattedDelta;
  };

  const formatLapTime = () => {
    if (!checkIfLapSet()) {
      return '- : - - : - - -';
    }

    const myTime = convertTimeToNumber(lapTime);

    return `${transformMillisToMinutesString(
      myTime
    )}:${transformMillisToSecondsString(
      myTime
    )}:${transformToMillisecondsString(myTime)}`;
  };

  return (
    <>
      <td>
        <Flag
          country={driver.country}
          countryCode={driver.countryCode}
          equalWidth={true}
        />
      </td>
      <td>{driver.driver}</td>
      <td>{driver.team}</td>
      <td>{formatLapTime()}</td>
      <td>{calcInterval()}</td>
    </>
  );
}

export default Driver;
