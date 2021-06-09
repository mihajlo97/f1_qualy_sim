import '../styles/CircuitHeader.css';

function CircuitHeader(props) {
  return (
    <div className='CircuitHeader-style'>
      <img
        src={`https://flagcdn.com/h24/${props.circuit.countryCode}.png`}
        srcset={`https://flagcdn.com/h48/${props.circuit.countryCode}.png 2x`}
        height='24'
        alt={`${props.circuit.country}`}
      />
      <span className='CircuitHeader-track'>{`${props.circuit.name}, ${props.circuit.country}`}</span>
    </div>
  );
}

export default CircuitHeader;
