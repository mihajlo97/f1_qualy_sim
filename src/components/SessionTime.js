import {
  transformToMinutesString,
  transformToSecondsString,
} from '../services/sessionDataService.js';

function SessionTime({ timeRemaining }) {
  const label = 'Session time remaining:';

  const displayMinutes = () => transformToMinutesString(timeRemaining);
  const displaySeconds = () => transformToSecondsString(timeRemaining);

  return <span>{`${label} ${displayMinutes()}:${displaySeconds()}`}</span>;
}

export default SessionTime;
