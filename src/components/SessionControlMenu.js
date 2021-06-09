import '../styles/SessionControlMenu.css';
import QualifyingSession from './QualifyingSession';

function SessionControlMenu(props) {
  const label = 'Proceed to next session';

  return (
    <div className='SessionControlMenu-style'>
      <QualifyingSession qualySession='--' />
      <button className='SessionControlMenu-button'>{label}</button>
    </div>
  );
}

export default SessionControlMenu;
