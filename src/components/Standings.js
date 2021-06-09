import '../styles/Standings.css';
import StandingsHeader from './StandingsHeader';

function Standings(props) {
  return (
    <table className='Standings-table'>
      <col class='Standings-colSmall' />
      <col class='Standings-colSmall' />
      <col class='Standings-colStandard' />
      <col class='Standings-colStandard' />
      <col class='Standings-colStandard' />
      <col class='Standings-colStandard' />
      <thead>
        <StandingsHeader />
      </thead>
      {props.drivers.map((driver) => (
        <tr key={driver.id} className='Standings-row'>
          <td>{driver.id + 1}.</td>
          <td style={{ verticalAlign: '' }}>
            <img
              className='Standings-flags'
              src={`https://flagcdn.com/w40/${driver.countryCode}.png`}
              srcset={`https://flagcdn.com/w80/${driver.countryCode}.png 2x`}
              width='40'
              alt={driver.country}
            />
          </td>
          <td>{driver.driver}</td>
          <td>{driver.team}</td>
          <td>
            {'1:21:0' +
              (driver.id * 4 < 10 ? '0' + driver.id * 4 : driver.id * 4)}
          </td>
          <td>
            {'+0:0' +
              (driver.id * 4 < 10 ? '0' + driver.id * 4 : driver.id * 4)}
          </td>
        </tr>
      ))}
    </table>
  );
}

export default Standings;
