import '../styles/Standings.css';

function Flag({ country, countryCode, equalWidth }) {
  return equalWidth ? (
    <>
      <img
        className='Standings-flags'
        src={`https://flagcdn.com/w40/${countryCode}.png`}
        srcSet={`https://flagcdn.com/w80/${countryCode}.png 2x`}
        width='40'
        alt={country}
      />
    </>
  ) : (
    <>
      <img
        src={`https://flagcdn.com/h24/${countryCode ? countryCode : 'es'}.png`}
        srcSet={`https://flagcdn.com/h48/${
          countryCode ? countryCode : 'es'
        }.png 2x`}
        height='24'
        alt={`${country}`}
      />
    </>
  );
}

export default Flag;
