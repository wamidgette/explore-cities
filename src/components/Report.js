import styled from "styled-components"
import { useEffect, useRef, useState } from 'react'

const ReportContainer = styled.div`
  margin: auto;
  width: 100%;
`;
const ReportTitle = styled.h4`
  text-align: center;
  font-size: 1.3rem;
`;
const ReportLine = styled.div`
  font-weight: bold;
  color: black;
  font-size: 1rem;
  margin: 0;
  border-bottom: 2px solid var(--primary-color);
  display: flex;
  justify-content: space-between;
  align-items: end;
  span:first-child{
    max-width: 300px;
  }
  padding:10px;
`;

function getValueFromData(object){
  console.log(object)
  let value = object['float_value'] || object['int_value'] || object['string_value'] || object['currency_dollar_value'] || object['percent_value']; 
  const type = object.type;
  console.log(value)
  switch(type){
    case 'percent':
      value = `${parseInt(value*100).toFixed(2)}%`;
      break;
    case 'currency_dollar':
      value = `$${value}`
      break; 
    case 'float':
      value = parseInt(value).toFixed(2);
      break;
    default:
      break;
  }
  return value
}

export function Report({cityData}){
  const [reportData, setReportData] = useState(null);
  useEffect(()=>{
    if(!cityData){
      setReportData(null)
      return
    }
    setReportData(cityData.reports)
  },[cityData])
  return(
    <ReportContainer>
      <ReportTitle>{reportData? reportData.label : 'no data'}</ReportTitle>
      <div>
        {reportData && reportData.data.map((object, index)=><ReportLine key={index}><span>{`${object.label}: `}</span><span>{getValueFromData(object)}</span></ReportLine>)}
      </div>
    </ReportContainer>
  )
}