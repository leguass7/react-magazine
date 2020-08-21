import React from 'react';
import PropTypes from 'prop-types';

import { DivContainer } from './styles';
import ToolsContext from './ToolsContext';

export default function ToolsContainer({ children, size }) {
  return (
    <DivContainer>
      <ToolsContext.Provider
        value={{
          contextSize: size,
        }}
      >
        {children}
      </ToolsContext.Provider>
    </DivContainer>
  );
}

ToolsContainer.propTypes = {
  // children: PropTypes.arrayOf(PropTypes.instanceOf(ToolsButton)),
  children: PropTypes.any,
  size: PropTypes.number,
};

ToolsContainer.defaultProps = {
  children: null,
  size: 44,
};
