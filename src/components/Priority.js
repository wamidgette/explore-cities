import React, {useState} from 'react';
import styled from 'styled-components'
import { BreakPoints, DirectionButton, DropDownList } from '../styles/styles';
import { FormWrapper } from './FormWrapper';

export default function UserChoices({userChoices, setUserChoices, data}){
  function handleSelectChange(event){
    localStorage.setItem('priority', event.target.value )
    setUserChoices({...userChoices, 'priority': event.target.value})
  }
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