import '../styles/SessionTimeToolbar.css';
import SessionTime from './SessionTime';

function SessionTimeToolbar(props) {
  const labelPause = 'Pause';
  const labelStop = 'Restart';
  return (
    <div className='SessionTimeToolbar-style'>
      <SessionTime />
      <div>
        <button className='SessionTimeToolbar-button'>{labelPause}</button>
        <button
          className='SessionTimeToolbar-button'
          style={{ marginLeft: '10px' }}>
          {labelStop}
        </button>
      </div>
    </div>
  );
}

export default SessionTimeToolbar;
