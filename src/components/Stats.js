import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import { BreakPoints, TextButton, DirectionButton } from '../styles/styles';
import { Link } from 'react-router-dom';
import formData from '../data/form-data';
import { FormWrapper } from './FormWrapper';
import { useNavigate } from "react-router";

const CheckBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto;
  width: 500px;
  gap: 10px;
  @media${BreakPoints.medDown}{
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;
const CheckBoxLabel = styled.label`
  input{
    position: absolute;
    opacity: 0;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  width: max-content;
  height: min-height;
  border-radius: 10px;
  border: 2px solid var(--secondary-color);
  padding: 5px;
  cursor: pointer;
  background: white;
  &.checked{
    background: orange;
  }
  @media${BreakPoints.medDown}{
    width: 100%;
  }
`;
const RemainingChoices = styled.p`
  span{
    color: black;
    &.warning{
      color: var(--error-color);
    }
  }
`;
const ToMapButton = styled(TextButton)`
  align-self: center;
`;

export default function Stats({userChoices, setUserChoices, data}){
  const navigate = useNavigate();
  const [choiceLengthWarning, setChoiceLengthWarning] = useState(null);
  function handleSelectChange(event){
    const stats = userChoices.stats;
    //If the user is trying to add a 6th choice, return and setwarn
    if(stats.length >=5 && event.currentTarget.checked){
      setChoiceLengthWarning(true);
      event.currentTarget.checked = false;
      return;
    }
    setChoiceLengthWarning(false)
    //add the choice value to the array if checked
    if(event.currentTarget.checked){
      stats.push(String(event.currentTarget.value));
      event.currentTarget.parentElement.classList.add('checked')
    } //else remove the value from the array
    else{
      stats.splice(stats.indexOf(event.currentTarget.value), 1);
      event.currentTarget.parentElement.classList.remove('checked')
    }
    localStorage.setItem('stats', stats)
    setUserChoices({...userChoices, stats: stats})
  }
  function navigateToMap(){
    if(userChoices.stats.length){
      navigate("../map");
    }
  }
  return (
    <>
      <FormWrapper>
        <h3>I want to see world rankings for:</h3>
        <p>(Select up to five)</p>
        <CheckBoxContainer>
          {data.map((data, index) => 
            <CheckBoxLabel className={userChoices.stats.includes(data) && "checked"} key={index} htmlFor={data}>
              <input checked={userChoices.stats.includes(data)} onChange={handleSelectChange} type="checkbox" id={data} name ={data} key={index} value={data}/>
              <div>
                <span>{data}</span>
              </div>
            </CheckBoxLabel>
          )}
        </CheckBoxContainer>
        <RemainingChoices>{choiceLengthWarning? <span className="warning">You already have 5 choices</span> : <span>{`You have ${5 - userChoices.stats.length} choices remaining`}</span>}</RemainingChoices>
        <ToMapButton onClick={navigateToMap} className = {userChoices.stats.length && "active"}>Continue to Map</ToMapButton>
      </FormWrapper>
    </>
  )
}
