/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import sound from './assets/page-flip-02.mp3';

export default function Sound({ audio }) {
  let play;
  if (audio) {
    if (typeof audio === 'boolean') play = sound;
    play = audio;
  }
  if (!play) return null;

  return <audio id="audio" src={sound} style={{ display: 'none' }} />;
}

Sound.propTypes = {
  audio: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

Sound.defaultProps = {
  audio: false,
};
