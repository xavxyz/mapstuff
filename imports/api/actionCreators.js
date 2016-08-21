// add a pin {lng, lat, media} on the map
export const addPin = (pin) => ({
  type: 'ADD_PIN',
  pin,
});

export const displayMedia = (media) => ({
  type: 'DISPLAY_MEDIA',
  media
});

export const hideMedia = () => ({
  type: 'HIDE_MEDIA',
});

export const setCenter = (center) => ({
  type: 'SET_CENTER',
  center
});