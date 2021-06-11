import {
  getSessionPhases,
  transformToMinutesString,
  transformToSecondsString,
} from '../services/sessionDataService.js';
import '../styles/SessionTimeToolbar.css';

const lastLapWarningTime = 2 * 60;
const phases = getSessionPhases();
const qualyWarmup = phases[0];
const qualyOver = phases[phases.length - 1];

function SessionTime({ timeRemaining, currentSession }) {
  const label = 'Session time remaining:';

  const displayMinutes = () => transformToMinutesString(timeRemaining);
  const displaySeconds = () => transformToSecondsString(timeRemaining);

  const isActiveQualifyingSession = () =>
    currentSession !== qualyWarmup && currentSession !== qualyOver;

  const displayTime = () =>
    isActiveQualifyingSession()
      ? `${displayMinutes()}:${displaySeconds()}`
      : '--:--';

  return (
    <span
      className={
        timeRemaining > lastLapWarningTime || !isActiveQualifyingSession()
          ? ''
          : 'SessionTimeToolbar-twoMinutesLeft'
      }>{`${label} ${displayTime()}`}</span>
  );
}

export default SessionTime;
