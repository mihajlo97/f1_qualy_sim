import Standings from './Standings';
import SessionControlMenu from './SessionControlMenu';
import SessionTimeToolbar from './SessionTimeToolbar';
import CircuitHeader from './CircuitHeader';

function SimulatorBody(props) {
  return (
    <div>
      <CircuitHeader circuit={props.circuit} />
      <SessionControlMenu />
      <Standings drivers={props.drivers} />
      <SessionTimeToolbar />
    </div>
  );
}

export default SimulatorBody;
