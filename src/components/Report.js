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

export function Report({cityData}){
  const [reportData, setReportData] = useState(null);
  useEffect(()=>{
    if(!cityData){
      setReportData(null)
      return
    }
    setReportData(cityData.reports)
  },[cityData])
  console.log(reportData)
  return(
    <ReportContainer>
      <ReportTitle>{reportData? reportData.label : 'no data'}</ReportTitle>
      <ReportDetails>
        {reportData? (reportData.data.map((object)=><ReportLine><span>{`${object.label}: `}</span><span>{object[Object.keys(object)[0]]}</span></     ReportLine>)) : ('')}
      </ReportDetails>
    </ReportContainer>
  )
}