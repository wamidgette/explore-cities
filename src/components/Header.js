import React, {useState} from 'react';
import styled from 'styled-components'
import { BreakPoints, ButtonLink } from '../styles/styles';

const HeaderDiv = styled.header`
  background: var(--secondary-color);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media${BreakPoints.medDown}{
    h1{
      margin-bottom: 0;
    }
  }
`;
const MainSiteLink = styled.a`
  color: var(--white);
  text-decoration: none;
  font-size: 1.3rem;
  transition: 0.3s;
  position: absolute;
  left:0;
  top:0;
  margin: 10px;
  padding: 5px 10px;
  border-radius: 10px;
  color: var(--white);
  :hover{
    background: var(--white);
    color: var(--black);
  }
  @media${BreakPoints.medDown}{
    position: relative;
    margin: 10px;
    font-size: 0.8rem;
    background: var(--white);
    color: black;
    :hover{
      color: var(--white);
      background: var(--black);
    }
  }
`;

export default function Header(){
  return (
    <HeaderDiv>
      <h1>Explore A City</h1>
      <MainSiteLink href="https://willmidgette.com">Back to main site</MainSiteLink>
    </HeaderDiv>
  )
}