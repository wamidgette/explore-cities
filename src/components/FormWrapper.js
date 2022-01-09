import React, {useState} from 'react';
import styled from 'styled-components'
import { BreakPoints, TextButton } from '../styles/styles';
import { Link } from 'react-router-dom';

const FormWrapperDiv = styled.div`
  text-align: center;
  margin: 
`;
const Form = styled.form`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 800px;
  margin: 40px auto;
  padding: 10px 50px;
  text-align: center !important;
  height: min-content;
  border-top: 1px solid var(--primary-color);
  border-bottom: 1px solid var(--primary-color);
  border-radius: 
  >div{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export function FormWrapper({children}){
  return(
    <FormWrapperDiv>
      <h2>What would you like to see?</h2>
      <p>The application will show salaries, general data reports, and up to 5 rankings compared to other countries/cities</p>
      <Form>
        {children}
      </Form>
      <p>Don't worry, you can edit these selections later.</p>
    </FormWrapperDiv>
  )
}