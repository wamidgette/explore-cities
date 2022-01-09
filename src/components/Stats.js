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
  width: 500px;
  margin: auto;
`;
const CheckBoxLabel = styled.label`
  input{
    position: absolute;
    opacity: 0;
  }
  transition: 0.3s;
  width: max-content;
  height: min-height;
  border-radius: 10px;
  border: 2px solid var(--secondary-color);
  margin: 10px;
  padding: 5px;
  cursor: pointer;
  background: white;
  &.checked{
    background: orange;
  }
`;
const ForwardBackButtons = styled.div`
  display: flex;
  gap: 50px;
  justify-content: center;
`;
const ForwardButton = styled(Link)`
  width: min-content;
  background: transparent;
  border: none;
  font-size: 3rem;
  cursor: pointer;
`;
const WarningText = styled.p`
  color: var(--error-color);
`;
export default function Stats({userChoices, setUserChoices, data}){
  const navigate = useNavigate();
  const [editing, setEditing] = useState('stats');
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
    } //remove the value from the array
    else{
      stats.splice(stats.indexOf(event.currentTarget.value), 1);
      event.currentTarget.parentElement.classList.remove('checked')
    }
    setUserChoices({...userChoices, stats: stats})
  }
  function navigateToMap(){
    navigate("../map");
  }
  console.log(userChoices)
  return (
    <>
      <FormWrapper>
        <div className={editing==="job"? "visible" : "" }>
          <h3>I want to see world rankings for:</h3>
          <span>(Select up to five)</span>
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
          <WarningText>{choiceLengthWarning? "You already have 5 choices" : <p/>}</WarningText>
          <TextButton onClick={userChoices.stats.length && navigateToMap} className = {userChoices.stats.length && "active"}>Continue to Map</TextButton>
        </div>
      </FormWrapper>
    </>
  )
}
