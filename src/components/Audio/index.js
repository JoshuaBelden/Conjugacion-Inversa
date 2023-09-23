import React, { Fragment, useRef } from 'react';

import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';

const Audio = ({ verb }) => {
  const playerRef = useRef();

  const playAudio = () => {
    playerRef.current.play();
  };

  return (
    <Fragment>
      <audio
        key={verb}
        ref={playerRef}
        id={'audio-element-params-' + verb}
        className="audio-element"
      >
        <source
          src={`https://audio1.spanishdict.com/audio?lang=es&format=mp3&text=${verb}`}
        ></source>
      </audio>
      <FontAwesomeIcon
        className="audio-player"
        onClick={(e) => playAudio()}
        icon={faPlayCircle}
      ></FontAwesomeIcon>
    </Fragment>
  );
};

export default Audio;
