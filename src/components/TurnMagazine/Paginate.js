/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { memo, useContext, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import 'turn.js';

import TurnContext from './TurnContext';
import Turn from './Turn';

function Paginate(props) {
  const { pages, width, height, orientation } = props;
  const { setPageTurn, imageClick } = useContext(TurnContext);

  const options = useMemo(() => {
    return {
      width,
      height,
      autoCenter: true,
      display: 'double',
      acceleration: true,
      duration: orientation === 90 ? 1500 : 1500,
      elevation: 50,
      gradients: !$.isTouch,
      when: {
        turned: (e, page) => {
          setPageTurn(page);
          $('.app-magazine-btn').show();
        },
        turning: () => {
          $('.app-magazine-btn').hide();
          try {
            const audio = document.getElementById('audio');
            if (audio) audio.play();
          } catch (error) {
            // console.log('ERRO', error);
          }
        },
      },
    };
  }, [width, height, setPageTurn, orientation]);

  useEffect(() => {
    $('.react-transform-component').addClass('bgpage');
    return () => {};
  }, []);

  return (
    <Turn options={options} className="magazine">
      {pages.map((page, i) => {
        const key = `page-${page}-${i}`;
        return (
          <div key={key} className="page">
            <img
              src={page}
              alt=""
              onClick={imageClick}
              // onDoubleClick={imageClick}
            />
          </div>
        );
      })}
    </Turn>
  );
}

Paginate.defaultProps = {
  pages: [],
  width: 'auto',
  height: 'auto',
  orientation: 0,
};
Paginate.propTypes = {
  pages: PropTypes.array,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  orientation: PropTypes.number,
};

export default memo(Paginate);
