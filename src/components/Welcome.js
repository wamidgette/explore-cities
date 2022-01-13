import React, {useState} from 'react';
import styled from 'styled-components'
import { BreakPoints, ButtonLink } from '../styles/styles';

const Intro = styled.div`
  text-align: center;
  padding: 0 10px;
  p{
    margin-bottom: 30px;
  }
`;

export default function Welcome(){
  return(
    <Intro>
      <h2>Welcome to the Explore Cities App</h2>
      <p>I built this application as a tool to help people browse and compare statistics of cities around the world in an easy, interactive way.<br/><br/>Just select the statistics that matter most to you, and click on an area of the map to have a data summary populated!</p>
      <ButtonLink to = {'./job'}>Start</ButtonLink>
    </Intro>
  )
}
