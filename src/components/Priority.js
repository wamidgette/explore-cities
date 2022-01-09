import React, {useState} from 'react';
import styled from 'styled-components'
import { BreakPoints, DirectionButton, DropDownList } from '../styles/styles';
import { FormWrapper } from './FormWrapper';

export default function UserChoices({userChoices, setUserChoices, data}){
  const [editing, setEditing] = useState('priority');
  function handleSelectChange(event){
    setUserChoices({...userChoices, [editing]: event.target.value})
  }
  function lastFormSection(){
    //start editing next userChoice
    const newIndex = (Object.keys(userChoices).indexOf(editing) - 1);
    setEditing(Object.keys(userChoices)[newIndex])
  }
  function nextFormSection(){
    //start editing next userChoice
    const newIndex = (Object.keys(userChoices).indexOf(editing) + 1);
    setEditing(Object.keys(userChoices)[newIndex])
  }
  console.log(userChoices)
  return (
    <>
      <FormWrapper>
        <div>
          <h3>My top priority is:</h3>
          <DropDownList value={userChoices.priority} onChange={handleSelectChange}>
            {data.map((data, index) => <option key={index} value={data.id}>{data.title}</option>)}
          </DropDownList>
          <div>
            <DirectionButton to={"../stats"}>&#8594;</DirectionButton>
          </div>
        </div>
      </FormWrapper>
    </>
  )
}