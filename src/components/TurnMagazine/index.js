import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import fscreen from 'fscreen';

import './magazine.css';
import { useIsMounted } from '../_layout/customHooks';
import useWindowSize from '../_layout/useWindowSize';

// COMPONENTS
import MyUseResize from '../MyUseResize';
import AlertPortrait from '../AlertPortrait';
import ZoomSrc from '../ZoomSrc';

import Paginate from './Paginate';
import ToolsMagazine from './ToolsMagazine';
import NavigateButton from './NavigateButton';
import Sound from './Sound';

// LOCAl IMPORTS
import TurnContext from './TurnContext';
import { calculateDimension, debounceEvent } from './utils';

export default function TurnMagazine({ images, zoom, alertPortrait, autoFullScreen, audio }) {
  const turn = useRef(false);
  const refMagazine = useRef(false);
  const isMounted = useIsMounted();
  const [vWidth, vHeight, vOrientation] = useWindowSize();

  const [resized, seResized] = useState(0);
  const [isFull, setIsFull] = useState(false);
  const [zooming, setZooming] = useState(false);

  const maxLen = useMemo(() => images.length - 1, [images]);

  let buttonFullScreen;
  const handleToggleFullScreen = useCallback(() => {
    if (!fscreen.fullscreenElement) {
      return fscreen.requestFullscreen(document.documentElement);
    }
    return fscreen.exitFullscreen();
  }, []);

  fscreen.onfullscreenchange = () => {
    setIsFull(fscreen.fullscreenElement !== null);
  };
  const isFullScreen = () => !!isFull;

  function registerButtonFullscreen(a) {
    buttonFullScreen = a;
  }

  const [dimension, setDimension] = useState(calculateDimension(vWidth, vHeight));
  const [actualPage, setActualPage] = useState(0);

  const registerTurn = useCallback(
    (registered) => {
      turn.current = registered;
      return turn.current;
    },
    [turn],
  );

  const gotoPage = (p) => {
    if (turn.current && p > 1) {
      // turn.current.hide();
      turn.current.addClass('myhide');
      turn.current.turn('page', p);
      debounceEvent(() => {
        turn.current.removeClass('myhide');
      }, 300)();
      // turn.current.turn('page', p);

      // turn.current.show();
    }
  };

  const setPageTurn = useCallback((p) => setActualPage(p), []);

  const getPageTurn = useCallback(() => {
    const r = refMagazine.current ? refMagazine.current.getAttribute('data-actualpage') : false;
    const p = actualPage || parseInt(r, 10) || 0;
    return p;
  }, [actualPage]);

  const isResized = useCallback(() => {
    return resized;
  }, [resized]);

  function onResize(w, h, _o) {
    setDimension(calculateDimension(w, h));
    seResized(actualPage);
  }

  const handleKeyDown = useCallback(
    (e) => {
      const previous = 37;
      const next = 39;
      const esc = 27;
      switch (e.keyCode) {
        case previous:
          e.preventDefault();
          if (turn.current && !zooming) turn.current.turn('previous');
          break;
        case next:
          e.preventDefault();
          if (turn.current && !zooming) turn.current.turn('next');
          break;
        case esc:
          if (zooming) {
            e.preventDefault();
            setZooming(false);
          }
          break;
        default:
          break;
      }
    },
    [zooming],
  );

  useEffect(() => {
    if (isMounted.current && refMagazine.current) {
      if (resized && resized > 1) {
        gotoPage(resized);
        seResized(0);
      }
    }

    document.addEventListener('keydown', handleKeyDown, false);
    // add events

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // remove events
    };
  }, [isMounted, resized, handleKeyDown]);

  function btnClick(e, position) {
    const turnPage = (p) => {
      if (turn.current) {
        if (p < 0) turn.current.turn('previous');
        if (p > 0) turn.current.turn('next');
      }
    };

    if (autoFullScreen && buttonFullScreen && !isFull) {
      e.preventDefault();
      buttonFullScreen.click();
      debounceEvent(() => {
        turnPage(position);
      }, 800)();
    } else {
      e.preventDefault();
      turnPage(position);
    }
  }

  const imageClick = useCallback(
    (e) => {
      if (zoom && e && e.target && e.target.src) {
        setZooming({
          event: e,
          src: e.target.src,
          onCloseZoom: () => setZooming(false),
          screenWidth: vHeight || vWidth,
          screenHeight: vHeight,
          screenOrientation: vOrientation,
          dimension,
        });
      }
    },
    [zoom, vWidth, vHeight, dimension, vOrientation],
  );

  return (
    <>
      {alertPortrait && <AlertPortrait />}
      <Sound audio={audio} />
      <div ref={refMagazine} className="app-magazine" data-actualpage={actualPage}>
        <TurnContext.Provider
          value={{
            registerTurn,
            setPageTurn,
            getPageTurn,
            isResized,
            handleToggleFullScreen,
            isFullScreen,
            registerButtonFullscreen,
            imageClick,
          }}
        >
          <MyUseResize onResize={onResize} />
          <ToolsMagazine />
          {dimension.width > 0 && dimension.height > 0 ? (
            <>
              <NavigateButton
                width={dimension.buttonWidth}
                onClick={btnClick}
                value={-1}
                hide={!!(actualPage <= 1)}
              />
              <div
                className="app-magazine-content"
                style={{
                  width: dimension.width,
                  maxWidth: dimension.width,
                  height: dimension.height,
                  maxHeight: dimension.height,
                }}
              >
                <Paginate
                  pages={images}
                  height={dimension.height}
                  width={dimension.width}
                  key={`${dimension.width}x${dimension.height}-${vOrientation}`}
                  id={`${dimension.width}x${dimension.height}-${vOrientation}`}
                  orientation={vOrientation}
                />
              </div>
              <NavigateButton
                right
                width={dimension.buttonWidth}
                onClick={btnClick}
                value={1}
                hide={!!(actualPage >= maxLen)}
              />
            </>
          ) : null}
        </TurnContext.Provider>
      </div>
      {zooming ? <ZoomSrc {...zooming} /> : null}
    </>
  );
}

TurnMagazine.defaultProps = {
  images: [],
  zoom: false,
  alertPortrait: false,
  autoFullScreen: false,
  audio: false,
};

TurnMagazine.propTypes = {
  images: PropTypes.array,
  zoom: PropTypes.bool,
  alertPortrait: PropTypes.bool,
  autoFullScreen: PropTypes.bool,
  audio: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};
