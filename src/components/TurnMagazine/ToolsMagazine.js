import React, { useContext, memo, useRef, useCallback, useState } from 'react';

import { publicUrl } from '../../config';
import { downloadDom } from '../../helpers/donwload';

// COMPONENTS
import { Tools, ToolsButton } from '../Tools';

// LOCAl IMPORTS
import TurnContext from './TurnContext';
import { useIsMounted } from '../_layout/customHooks';
import imgFull from './assets/fullscreen.svg';
import imgFullExit from './assets/fullscreenExit.svg';
import imgDown from './assets/journalDown.svg';

function ToolsMaganize() {
  const ref = useRef(false);
  const { isFullScreen, handleToggleFullScreen, registerButtonFullscreen } = useContext(
    TurnContext,
  );
  const [isDonw, setIsDown] = useState(false);
  const isMounted = useIsMounted();

  registerButtonFullscreen(ref && ref.current);

  const goDownload = useCallback(async () => {
    setIsDown(true);
    const response = await fetch(`${publicUrl}/revista.pdf`);
    if (isMounted.current) {
      setIsDown(false);
      if (response) {
        const blob = await response.blob();
        if (blob) {
          downloadDom(blob, 'revista.pdf');
        }
      }
    }
  }, [isMounted]);

  function onFullScreenClick() {
    if (handleToggleFullScreen) handleToggleFullScreen();
  }

  return (
    <Tools>
      <ToolsButton
        ref={ref}
        onClick={onFullScreenClick}
        icon={isFullScreen() ? imgFullExit : imgFull}
      />
      <ToolsButton
        onClick={goDownload}
        className={isDonw ? 'donwloading' : ''}
        disabled={!!isDonw}
        icon={imgDown}
      />
    </Tools>
  );
}

export default memo(ToolsMaganize);
