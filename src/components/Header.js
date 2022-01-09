import React, {useState} from 'react';
import styled from 'styled-components'
import { BreakPoints } from '../styles/styles';

const HeaderDiv = styled.header`
height: 200px;
background: var(--secondary-color);
`;

export default function Header(){
  return (
    <HeaderDiv>
      <h1>Explore A City</h1>
    </HeaderDiv>
  )
}