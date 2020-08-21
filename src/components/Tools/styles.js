import styled from 'styled-components';

export const DivContainer = styled.div`
  z-index: 1000;
  padding: 0 1%;
  box-sizing: border-box;
  position: absolute;
  bottom: 2%;
  right: 15px;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  height: 44px;
  min-width: 44px;
  width: auto;
  border: 0;
  transform: translateX(-50%);
`;

export const Button = styled.button`
  padding: 4px;
  margin: 0 4px;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  display: block;
  width: 44px;
  height: 44px;
  background-size: 40px;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url(${({ icon }) => icon});
  outline: none;
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;
