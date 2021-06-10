import '../styles/CircuitHeader.css';

function CircuitHeader({ circuit }) {
  return (
    <div className='CircuitHeader-style'>
      <img
        src={`https://flagcdn.com/h24/${
          circuit.countryCode ? circuit.countryCode : 'es'
        }.png`}
        srcSet={`https://flagcdn.com/h48/${
          circuit.countryCode ? circuit.countryCode : 'es'
        }.png 2x`}
        height='24'
        alt={`${circuit.country}`}
      />
      <span className='CircuitHeader-track'>{`${circuit.name}, ${circuit.country}`}</span>
    </div>
  );
}

export default CircuitHeader;
