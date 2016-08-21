import React from 'react';

const MediaOverlay = (props) => {

  return props.overlay && props.overlay.show ? (
    <div style={{width: props.overlay.media.width, height: props.overlay.media.height, zIndex: 10, position: 'absolute', top: '10%', left: '30%'}}>
      <img src={props.overlay.media.url} />
    </div>
  ) : null;
};

export default MediaOverlay;