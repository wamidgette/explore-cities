import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import { BreakPoints, TextButton, DirectionButton } from '../styles/styles';
import { Link } from 'react-router-dom';
import formData from '../data/form-data';
import { FormWrapper } from './FormWrapper';
import { useNavigate } from "react-router";

const MapWrapper = styled.div`
  background: red;
  width: 100%;
  flex: 1 0;
  display: flex;
`;
const MapArea = styled.div`
  flex: 0 1 1500px;
  background: green; 
`;
const Data = styled.div`
  flex: 0 0 600px;
  background: yellow;
  padding: 3px;
`;
const DataNav = styled.nav`
  height: min-height;
  width: 100%;
  display: flex;
  gap: 10px;
`;
const Tab = styled(TextButton)`
  border-radius: 0;
  flex: 1 1;
  border:none;
  margin-bottom: 0;
  opacity: 1;
  background: var(--off-white);
  border: 2px solid var(--primary-color);
  border-bottom: 2px solid var(--primary-color);
  &.active{
    border-bottom: none;
  }
  cursor: pointer;
`;
const DataDisplay = styled.div`
background: var(--off-white);
height: 60%;
border: 2px solid var(--primary-color);
margin-top: -2px;
`;
const Selection = styled.div``;

export default function Map({userChoices, setUserChoices}){
  //if selections have not been made redirect the user to the home page
  const [loading, setLoading] = useState(true);
  return <MapWrapper>
    <MapArea></MapArea>
    <Data>
      <DataNav>
        <Tab className="active">Salaries</Tab>
        <Tab>Report</Tab>
        <Tab>Stats</Tab>
      </DataNav>
      <DataDisplay>
        {/* put the 3 info type graphs here and toggle visibility */}
        {/* <Salaries/>
        <Reports/>
        <Stats/> */}
      </DataDisplay>
      <Selection></Selection>
    </Data>
  </MapWrapper>
}