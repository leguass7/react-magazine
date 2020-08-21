import React from 'react';
import styled from 'styled-components';

import img from './portrait.svg';
import useWindowSize from '../_layout/useWindowSize';

import './alert-portrait.css';

const DivAlertPortrait = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1004;
`;

const Iimg = styled.img`
  transform: rotate(90deg);
  width: ${({ width }) => width || '192px'};
`;

export default function AlertPortrait() {
  const [vWidth, vHeight, vOrientation] = useWindowSize();

  if (vWidth > vHeight || vOrientation === 90) return null;

  return (
    <DivAlertPortrait className="AlertPortrait">
      <div className="AlertPortrait-center">
        <div className="img-landscape">
          <Iimg src={img} alt="" />
        </div>
      </div>
    </DivAlertPortrait>
  );
}
