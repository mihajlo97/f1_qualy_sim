import { useEffect, useState } from 'react';
import '../styles/SessionControlMenu.css';
import QualifyingSession from './QualifyingSession';
import { getSessionPhases } from '../services/sessionDataService.js';

const actionLabels = ['Start qualifying', 'Start next session', 'View results'];

function SessionControlMenu({
  session,
  paused,
  sessionInProgress,
  beginSession,
}) {
  const [label, setLabel] = useState(actionLabels[0]);

  const updateLabel = () => {
    const phases = getSessionPhases();
    const phaseIndex = phases.findIndex((phase) => session === phase);

    setLabel(
      phaseIndex < phases.length - 3 ? actionLabels[1] : actionLabels[2]
    );
  };

  const moveToNextSession = () => {
    updateLabel();
    //updateSession();
    beginSession();
  };

  return (
    <div className='SessionControlMenu-style'>
      <QualifyingSession currentSession={session} paused={paused} />
      <button
        className='SessionControlMenu-button'
        disabled={sessionInProgress}
        onClick={moveToNextSession}>
        {label}
      </button>
    </div>
  );
}

export default SessionControlMenu;
