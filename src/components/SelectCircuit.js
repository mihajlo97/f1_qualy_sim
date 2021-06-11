function SelectCircuit({ circuits, performCircuitSelection }) {
  const label = 'Select circuit: ';
  const circuitFullName = circuits.map(
    (data) => `${data.name}, ${data.country}`
  );

  return (
    <>
      <label htmlFor='circuits'>{label}</label>
      <select name='circuits' onChange={performCircuitSelection}>
        {circuits.map((data) => (
          <option key={data.id} value={data.id}>
            {circuitFullName[data.id]}
          </option>
        ))}
      </select>
    </>
  );
}

export default SelectCircuit;
