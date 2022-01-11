import styled from "styled-components"
import { useEffect, useRef, useState } from 'react'

const ReportContainer = styled.div`
margin: auto;
`;
const ReportTitle = styled.h4`
  text-align: center;
`;
const ReportDetails = styled.div`
  padding: 0 30px 30px 30px;
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
  let value = object['float_value'] || object['int_value'] || object['string_value'] || object['currency_dollar_value'] || object['percent_value'] 
  const type = object.type
  switch(type){
    case 'percent':
      value = `${(value*100).toFixed(2)}%`
      break;
    case 'currency_dollar':
      value = `$${value}`
      break; 
    case 'float':
      value = value.toFixed(2)
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
      <ReportDetails>
        {reportData? (reportData.data.map((object)=><ReportLine><span>{`${object.label}: `}</span><span>{getValueFromData(object)}</span></     ReportLine>)) : ('')}
      </ReportDetails>
    </ReportContainer>
  )
}