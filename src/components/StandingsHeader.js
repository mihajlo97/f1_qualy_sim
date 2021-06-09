import '../styles/StandingsHeader.css';

function StandingsHeader(props) {
  return (
    <tr className='StadningsHeader-style'>
      <th>Pos.</th>
      <th>Country</th>
      <th>Driver</th>
      <th>Team</th>
      <th>Best lap</th>
      <th>Interval</th>
    </tr>
  );
}

export default StandingsHeader;
