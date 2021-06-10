import React, { useEffect, useState } from 'react';
import '../styles/SimulatorFrame.css';

import StartSimulatorMenu from './StartSimulatorMenu';
import SimulatorBody from './SimulatorBody';

function SimulatorFrame({ circuits, drivers }) {
  const [selectedCircuit, setSelectedCircuit] = useState(circuits[0]);
  const [showSimulatorBody, setShowSimulatorBody] = useState(false);
  const [resetMenu, setResetMenu] = useState(false);

  const endSimulation = () => {
    setShowSimulatorBody(false);
    setSelectedCircuit(circuits[0]);
    setResetMenu(!resetMenu);
  };
  const startNewSimulation = () => {
    setShowSimulatorBody(true);
  };

  const performCircuitSelection = (ev) => {
    if (showSimulatorBody) return;

    const targetCircuit = circuits.find(
      (circuit) => circuit.id === parseInt(ev.target.value)
    );
    setSelectedCircuit(targetCircuit);
  };

  return (
    <div className='SimulatorFrame-style'>
      <StartSimulatorMenu
        circuits={circuits}
        startNewSimulation={startNewSimulation}
        endSimulation={endSimulation}
        performCircuitSelection={performCircuitSelection}
        key={String(resetMenu)}
      />
      {showSimulatorBody && (
        <SimulatorBody drivers={drivers} circuit={selectedCircuit} />
      )}
    </div>
  );
}

export default SimulatorFrame;
