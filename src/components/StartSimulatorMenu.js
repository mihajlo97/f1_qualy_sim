import { useState } from 'react';
import '../styles/StartSimulatorMenu.css';

import SelectCircuit from './SelectCircuit';

function StartSimulatorMenu(props) {
  const [disableStartSimButton, setDisableStartSimButton] = useState(false);
  const [disableEndSimButton, setDisableEndSimButton] = useState(true);

  const startNewSimLabel = 'Start new simulation';
  const closeSimLabel = 'Close simulation';

  const startsSimulation = () => {
    setDisableStartSimButton(true);
    setDisableEndSimButton(false);
    props.startNewSimulation();
  };

  const endsSimulation = () => {
    setDisableEndSimButton(true);
    setDisableStartSimButton(false);
    props.endSimulation();
  };

  return (
    <div className='StartSimulatorMenu-style'>
      <SelectCircuit
        circuits={props.circuits}
        performCircuitSelection={props.performCircuitSelection}
      />
      <button
        className='StartSimulatorMenu-button'
        onClick={startsSimulation}
        disabled={disableStartSimButton}>
        {startNewSimLabel}
      </button>
      <button
        className='StartSimulatorMenu-button'
        onClick={endsSimulation}
        disabled={disableEndSimButton}>
        {closeSimLabel}
      </button>
    </div>
  );
}

export default StartSimulatorMenu;
