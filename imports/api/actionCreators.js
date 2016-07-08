// add a pin {lng, lat} on the map
export const addPin = (pin) => {
  return {
    type: 'ADD_PIN',
    pin,
  }
};