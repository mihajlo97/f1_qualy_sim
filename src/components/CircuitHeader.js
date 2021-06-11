import '../styles/CircuitHeader.css';
import Flag from './Flag';

function CircuitHeader({ circuit }) {
  return (
    <div className='CircuitHeader-style'>
      <Flag
        country={circuit.country}
        countryCode={circuit.countryCode}
        equalWidth={false}
      />
      <span className='CircuitHeader-track'>{`${circuit.name}, ${circuit.country}`}</span>
    </div>
  );
}

export default CircuitHeader;
