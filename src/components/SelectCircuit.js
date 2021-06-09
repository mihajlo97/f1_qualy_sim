function SelectCircuit(props) {
  const label = 'Select circuit: ';
  const circuitFullName = props.circuits.map(
    (data) => `${data.name}, ${data.country}`
  );

  return (
    <>
      <label for='circuits'>{label}</label>
      <select name='circuits' onChange={props.performCircuitSelection}>
        {props.circuits.map((data) => (
          <option key={data.id} value={data.id}>
            {circuitFullName[data.id]}
          </option>
        ))}
      </select>
    </>
  );
}

export default SelectCircuit;
