import React, {useState} from 'react';
import styled from 'styled-components'
import { BreakPoints, TextButton, DirectionButton, DropDownList } from '../styles/styles';
import { Link } from 'react-router-dom';
import { FormWrapper } from './FormWrapper';

export default function UserChoices({userChoices, setUserChoices, data}){
  const [editing, setEditing] = useState('job');
  function handleSelectChange(event){
    setUserChoices({...userChoices, [editing]: event.target.value})
  }
  function nextFormSection(){
    //start editing next userChoice
    const newIndex = (Object.keys(userChoices).indexOf(editing) + 1);
    setEditing(Object.keys(userChoices)[newIndex])
  }
  return (
    <>
      <FormWrapper>
        <div>
          <h3>I want to see salaries for:</h3>
          <DropDownList value={userChoices.job} onChange={handleSelectChange}>
            {data.map((data, index) => <option key={index} value={data.id}>{data.title}</option>)}
          </DropDownList>
          <div>
            <DirectionButton to={"../priority"} onClick={nextFormSection}>&#8594;</DirectionButton>
          </div>
        </div>
      </FormWrapper>
    </>
  )
}