const sessionPhases = ['Warm up', 'Q1', 'Q2', 'Q3', 'Results'];

const startTimes = {
  Q1: 20 * 60,
  Q2: 15 * 60,
  Q3: 12 * 60,
};

const SIM_TICK = 200;

export const getSessionPhases = () => sessionPhases;
export const getStartTimes = () => startTimes;
export const getSimTick = () => SIM_TICK;

export const transformToMinutesString = (seconds) =>
  seconds / 60 > 9 ? parseInt(seconds / 60) : '0' + parseInt(seconds / 60);

export const transformToSecondsString = (seconds) =>
  seconds % 60 > 9 ? seconds % 60 : '0' + (seconds % 60);

export const transformToMillisecondsString = (millis) =>
  millis % 1000 > 9
    ? millis % 1000 > 99
      ? millis % 1000
      : '0' + (millis % 1000)
    : '00' + (millis % 1000);

export const transformMillisToMinutesString = (millis) =>
  parseInt(millis / (1000 * 60));

export const transformMillisToSecondsString = (millis) =>
  millis % (60 * 1000) >= 10 * 1000
    ? parseInt((millis % (60 * 1000)) / 1000)
    : '0' + parseInt((millis % (60 * 1000)) / 1000);

export const mapDriversToSession = (drivers) =>
  drivers.map((driver) => ({
    ...driver,
    lapTime: 0,
    posChange: 0,
  }));
