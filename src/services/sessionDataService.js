const sessionPhases = ['Warm up', 'Q1', 'Q2', 'Q3', 'Results'];

const startTimes = {
  Q1: 3 * 60,
  Q2: 2 * 60,
  Q3: 1 * 60,
};

export const getSessionPhases = () => sessionPhases;
export const getStartTimes = () => startTimes;

export const transformToMinutesString = (time) =>
  time / 60 > 9 ? parseInt(time / 60) : '0' + parseInt(time / 60);

export const transformToSecondsString = (time) =>
  time % 60 > 9 ? time % 60 : '0' + (time % 60);
