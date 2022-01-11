import React, {useState} from 'react';
import styled from 'styled-components'
import { BreakPoints, DirectionButton, DropDownList } from '../styles/styles';
import { FormWrapper } from './FormWrapper';

export default function UserChoices({userChoices, setUserChoices, data}){
  function handleSelectChange(event){
    localStorage.setItem('job', event.target.value )
    setUserChoices({...userChoices, 'job': event.target.value})
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
            <DirectionButton to={"../priority"}>&#8594;</DirectionButton>
          </div>
        </div>
      </FormWrapper>
    </>
  )
}