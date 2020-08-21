import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import ToolsContext from './ToolsContext';
import { Button } from './styles';
import ndIcon from './nd-icon.svg';

const ToolsButton = React.forwardRef((props, ref) => {
  const { sizeContext } = useContext(ToolsContext);
  const { size, icon, ...rest } = props;
  return <Button ref={ref} size={sizeContext || size} icon={icon} {...rest} />;
});

ToolsButton.propTypes = {
  size: PropTypes.number,
  icon: PropTypes.string,
};

ToolsButton.defaultProps = {
  size: 44,
  icon: ndIcon,
};

export default ToolsButton;
