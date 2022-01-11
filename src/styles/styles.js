import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const Colours = {
  primary: '',
};

const Breakpoints = {
  sm: '420px',
  med: '768px',
  lg: '1040px',
  xl: '1280px',
  xxl: '1440px',
};

export const BreakPoints = {
  smallOnly: `(max-width: ${Breakpoints.sm})`,
  smallUp: `(min-width: ${Breakpoints.sm})`,
  betweenSmallAndLarge: `(min-width: ${Breakpoints.sm}) and (max-width: ${Breakpoints.lg})`,
  betweenSmallAndMedium: `(min-width: ${Breakpoints.sm}) and (max-width: ${Breakpoints.med})`,
  medDown: `(max-width: ${Breakpoints.med})`,
  medUp: `(min-width: ${Breakpoints.med})`,
  largeDown: `(max-width: ${Breakpoints.lg})`,
  largeUp: `(min-width: ${Breakpoints.lg})`,
  xlargeDown: `(max-width: ${Breakpoints.xl})`,
  xlargeUp: `(min-width: ${Breakpoints.xl})`,
  xxlargeUp: `(min-width: ${Breakpoints.xxl})`,
  xxlargeDown: `(max-width: ${Breakpoints.xxl})`,
};

export const TextButton = styled.button.attrs({type: 'button'})`  
  width: max-content;
  height: 50px;
  border: 2px solid var(--secondary-color);
  border-radius: 20px;
  font-size: 1.5rem;
  font-family: var(--primary-font);
  cursor: pointer;
  transition: 0.3s;
  margin-bottom: 30px;
  padding: 0 2rem;
  opacity: 0.5;
  &.active{
    opacity: 1;
    :hover{
      background: var(--secondary-color);
      color: var(--white);
    }
  }
`;

export const TabButton = styled.button.attrs({type: 'button'})`
  font-size: 1.5rem;
  font-family: var(--primary-font);
  flex: 1 1;
  border:none;
  border: 2px solid var(--primary-color);
  :hover{
    background: var(--off-white);
  }
  &.active{
    border-bottom: none;
    background: var(--off-white);
  }
  cursor: pointer;
`;


export const ButtonLink = styled(Link)`
  text-decoration: none;
  min-width: 150px;
  height: 50px;
  width: max-content;
  border: 2px solid var(--secondary-color);
  border-radius: 20px;
  font-size: 1.5rem;
  font-family: var(--primary-font);
  cursor: pointer;
  transition: 0.3s;
  padding: 0 2rem;
  :hover{
    background: var(--secondary-color);
    color: var(--white);
  }
`;

export const DirectionButton = styled(Link)`
  text-decoration: none;
  width: min-content;
  font-size: 5rem;
  cursor: pointer;
  color: var(--primary-color);
  transition: 0.2s;
  &:hover{
    color: var(--secondary-color);
  }

`;

export const DropDownList = styled.select`
  width: min-content;
  height: min-height;
  border-radius: 10px;
  border: 2px solid var(--secondary-color);
  background-image: none;
  text-align:center;
  cursor: pointer;
  font-size: 1.5rem;
  option{
    font-size: 1rem;
  }
`;