function QualifyingSession({ currentSession, paused }) {
  const label = 'Qualifying session:';

  return (
    <span>{`${label} ${currentSession} ${paused ? '(Paused)' : ''}`}</span>
  );
}

export default QualifyingSession;
