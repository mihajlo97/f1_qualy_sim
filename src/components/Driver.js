import {
  transformMillisToMinutesString,
  transformMillisToSecondsString,
  transformToMillisecondsString,
  getSessionPhases,
} from '../services/sessionDataService.js';

function Driver({ driver, lapTime, bestLap }) {
  const convertTimeToNumber = (time) => parseInt(time);

  const checkIfLapSet = () => convertTimeToNumber(lapTime) > 0;

  const calcInterval = () => {
    if (!checkIfLapSet()) {
      return '- - : - - -';
    }

    const myTime = convertTimeToNumber(lapTime);
    const leaderTime = convertTimeToNumber(bestLap);

    if (myTime === leaderTime) {
      return 'Pole';
    }

    const delta = myTime - leaderTime;
    return `+${parseInt(delta / 1000)}:${transformToMillisecondsString(delta)}`;
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
        <img
          className='Standings-flags'
          src={`https://flagcdn.com/w40/${driver.countryCode}.png`}
          srcSet={`https://flagcdn.com/w80/${driver.countryCode}.png 2x`}
          width='40'
          alt={driver.country}
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
