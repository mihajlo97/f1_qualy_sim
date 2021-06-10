import { getSessionPhases } from '../services/sessionDataService';
import '../styles/SessionTimeToolbar.css';
import SessionTime from './SessionTime';

function SessionTimeToolbar({
  timeRemaining,
  sessionInProgress,
  togglePauseSession,
  restartSession,
  paused,
  currentSession,
}) {
  const labelPause = 'Pause';
  const labelResume = 'Resume';
  const labelStop = 'Restart';

  const isQualyOver = () => {
    const phases = getSessionPhases();
    return currentSession === phases[phases.length - 1];
  };

  return (
    <div className='SessionTimeToolbar-style'>
      <SessionTime timeRemaining={timeRemaining} />
      <div>
        <button
          className='SessionTimeToolbar-button'
          disabled={!sessionInProgress || isQualyOver()}
          onClick={togglePauseSession}>
          {paused ? labelResume : labelPause}
        </button>
        <button
          className='SessionTimeToolbar-button'
          disabled={!sessionInProgress || isQualyOver()}
          onClick={restartSession}>
          {labelStop}
        </button>
      </div>
    </div>
  );
}

export default SessionTimeToolbar;
