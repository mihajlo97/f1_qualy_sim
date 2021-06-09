import React, { useEffect, useState } from 'react';
import '../styles/SimulatorFrame.css';

import StartSimulatorMenu from './StartSimulatorMenu';
import SimulatorBody from './SimulatorBody';

function SimulatorFrame(props) {
  const [selectedCircuit, setSelectedCircuit] = useState(props.circuits[0]);
  const [showSimulatorBody, setShowSimulatorBody] = useState(false);
  const [resetMenu, setResetMenu] = useState(false);

  const endSimulation = () => {
    setShowSimulatorBody(false);
    setSelectedCircuit(props.circuits[0]);
    setResetMenu(!resetMenu);
  };
  const startNewSimulation = () => {
    setShowSimulatorBody(true);
  };

  const performCircuitSelection = (ev) => {
    if (showSimulatorBody) return;

    const targetCircuit = props.circuits.find(
      (circuit) => circuit.id === parseInt(ev.target.value)
    );
    setSelectedCircuit(targetCircuit);
  };

  return (
    <div className='SimulatorFrame-style'>
      <StartSimulatorMenu
        circuits={props.circuits}
        startNewSimulation={startNewSimulation}
        endSimulation={endSimulation}
        performCircuitSelection={performCircuitSelection}
        key={String(resetMenu)}
      />
      {showSimulatorBody && (
        <SimulatorBody drivers={props.drivers} circuit={selectedCircuit} />
      )}
    </div>
  );
}

export default SimulatorFrame;
