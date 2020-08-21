import styled from 'styled-components';
import imageButton from './close-n.svg';

export const DivClose = styled.div`
  width: ${({ size }) => `${size}px` || '32px'};
  height: ${({ size }) => `${size}px` || '32px'};
  top: ${({ size }) => `${Math.ceil(size / 1.618)}px` || '2%'};
`;

export const ButtonClose = styled.button`
  background-image: url(${imageButton});
`;

export const DivContainer = styled.div`
  display: block;
  box-sizing: border-box;
  width: ${({ width }) => `${width}px` || 'auto'};
  height: ${({ height }) => `${height}px` || 'auto'};
`;
