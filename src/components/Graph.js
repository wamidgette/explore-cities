import styled from "styled-components"
import { useEffect, useRef, useState } from 'react'
import Chart from "chart.js/auto";
import { BreakPoints } from '../styles/styles';

const GraphContainer = styled.div`
`;
const Canvas = styled.canvas`
  width: 400px;
  @media${BreakPoints.smallOnly}{
    width: 300px;
    height: 400px;
  }
`;
const GraphTitle = styled.h4`
  text-align: center;
  font-size:1.3rem;
`;
export function Graph({cityData, selection}){
  const chartContainer = useRef(null)
  const [graphName, setGraphName] = useState(null)
  const [chartInstance, setChartInstance] = useState(null)
  //sets configuration settings for the graph when the cityData or selection is updated
  function newGraphConfig(){
    let data;
    let labels;
    let dataset;
    let options;
    if(selection==='salaries'){
      setGraphName(`${cityData.salaries.job.title} Salaries`)
      data = cityData.salaries['salary_percentiles']
      labels = ['low-end', 'medium', 'high-end']
      dataset = {
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: '#AADAFF',
        borderColor: '#020077',
        data: [data['percentile_25'], data['percentile_50'], data['percentile_75']],     
      }  
      options = {
        responsive: true,
        scales: {
          y: {
            grid: {
              color: 'black',
            },
            title:{
              display: true,
              text: 'Annual Salary USD',
              font: {
                size: 14
              }
            },
          },
          x: {
            grid: {
              display: false,
            }
          }
        },
        plugins: {
          legend: {
            display: false,
            labels: {
              font: {
                size: 18,
                color: 'red'
              },
            }
          }
        }
      }
    }
    else if(selection==="stats"){
      setGraphName('(Ranked 0 to 10)')
      data = cityData.stats
      labels = data.map((stat=>stat.name))
      dataset = {
        borderWidth: 2,
        borderRadius: 5,
        label: `${cityData.city_name}`,
        backgroundColor: '#AADAFF',
        borderColor: '#020077',
        data: data.map((stat)=>stat['score_out_of_10'])   
      }  
      options = {
        scales: {
          y: {
            grid: {
              color: 'black',
            },
            title:{
              display: true,
              text: 'Rank out of 10',
              font: {
                size: 14
              }
            },
            min:0,
            max:10
          },
          x: {
            color: 'black',
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false,
            labels: {
              font: {
                size: 18
              }
            }
          }
        }
      }
    }
    const newDataConfig = {
      type:'bar',
      data: {
        labels: labels,
        datasets: [dataset]
      },
      options: options
    }
    return newDataConfig;
  }
  //Create new chart on component load
  useEffect(()=>{
    let config = {
      type: 'bar',
      data: {
        labels: null,
        datasets: []
      },
      options: {
      }
    };
    //If CityData has already been selected add data to basic config
    if(cityData){
      config = newGraphConfig();
    }
    setChartInstance(new Chart(
      chartContainer.current.getContext('2d'), 
      config
    ));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartContainer])

  //When selections and citydata change the graph data
  useEffect(()=>{
    //If chart exists, update it with new data
    if(chartInstance){
      if(!cityData){
        return
      }
      const {data, options} = newGraphConfig();
      chartInstance.data = data;
      chartInstance.options = options; 
      chartInstance.update();
      return
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityData, selection])

  return(
    <GraphContainer>
      <GraphTitle>{graphName}</GraphTitle>
      <Canvas ref={chartContainer}></Canvas>
    </GraphContainer>
  )
}