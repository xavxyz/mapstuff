export function PinMe {

  function pinMe() {
    console.log('PinMe.pinMe L = ' + L);
    if(L) {
      L.control.locate().addTo(map);
    }
  }
}
