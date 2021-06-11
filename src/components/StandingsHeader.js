import '../styles/StandingsHeader.css';

function StandingsHeader(props) {
  return (
    <tr className='StadningsHeader-style'>
      <th>Pos.</th>
      <th>Country</th>
      <th>Driver</th>
      <th>Constructor</th>
      <th>Time</th>
      <th>Gap to leader</th>
    </tr>
  );
}

export default StandingsHeader;
