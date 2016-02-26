export const action1 = () => {
	alert('w00t');
};

export const action2 = () => {
	alert('pipo');
};

export const pinMe = () => {
  console.log('PinMe.pinMe L.control() = ', L.control());
  if(L) {
    L.control.locate().addTo(map);
  }
}
