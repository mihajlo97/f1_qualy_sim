import React, { useEffect, useState } from 'react';

import Standings from './Standings';
import SessionControlMenu from './SessionControlMenu';
import SessionTimeToolbar from './SessionTimeToolbar';
import CircuitHeader from './CircuitHeader';

import {
  getSessionPhases,
  getStartTimes,
  getSimTick,
} from '../services/sessionDataService.js';

function SimulatorBody({ drivers, circuit }) {
  const [currentSession, setCurrentSession] = useState(getSessionPhases()[0]);
  const [paused, setPaused] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [sessionInProgress, setSessionInProgress] = useState(false);
  const [restartFlag, setRestartFlag] = useState(false);

  const beginSession = () => {
    setSessionInProgress(true);
    setTimeForSession();
  };

  const endSession = () => {
    setSessionInProgress(false);
  };

  const setTimeForSession = () => {
    const startTimes = getStartTimes();
    const sessionPhases = getSessionPhases();
    const id = sessionPhases.findIndex((phase) => phase === currentSession);

    if (id < sessionPhases.length - 1) {
      setCurrentSession(sessionPhases[id + 1]);
    }

    switch (sessionPhases[id + 1]) {
      case 'Q1':
        setTimeRemaining(startTimes.Q1);
        break;
      case 'Q2':
        setTimeRemaining(startTimes.Q2);
        break;
      case 'Q3':
        setTimeRemaining(startTimes.Q3);
        break;
      default:
        setTimeRemaining(0);
        break;
    }
  };

  const togglePauseSession = () => {
    setPaused(!paused);
    if (restartFlag) {
      setRestartFlag(false);
    }
  };

  const restartSession = () => {
    setPaused(true);
    setRestartFlag(true);
  };

  const timerTick = () => {
    if (timeRemaining > 0) {
      setTimeRemaining(timeRemaining - 1);
    } else {
      endSession();
    }
  };

  useEffect(() => {
    if (restartFlag) {
      const startTimes = getStartTimes();
      if (startTimes[currentSession] > timeRemaining) {
        setTimeRemaining(startTimes[currentSession]);
      }
    }
    if (!sessionInProgress || paused) return;

    const timerID = setTimeout(timerTick, getSimTick());
    return timerID;
  }, [timeRemaining, paused, restartFlag]);

  return (
    <div>
      <CircuitHeader circuit={circuit} />
      <SessionControlMenu
        session={currentSession}
        paused={paused}
        sessionInProgress={sessionInProgress}
        beginSession={beginSession}
      />
      <SessionTimeToolbar
        timeRemaining={timeRemaining}
        sessionInProgress={sessionInProgress}
        togglePauseSession={togglePauseSession}
        restartSession={restartSession}
        currentSession={currentSession}
        paused={paused}
      />
      <Standings
        drivers={drivers}
        paused={paused}
        restartFlag={restartFlag}
        currentSession={currentSession}
        timeRemaining={timeRemaining}
      />
    </div>
  );
}

export default SimulatorBody;
