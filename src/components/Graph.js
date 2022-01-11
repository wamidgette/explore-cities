import styled from "styled-components"
import { useEffect, useRef, useState } from 'react'
import Chart from "chart.js/auto";

const Canvas = styled.canvas``;
const GraphContainer = styled.div`
  padding: 0 30px 30px 30px;
`;
const GraphTitle = styled.h4`
  text-align: center;
`;
export function Graph({cityData, selection}){
  const chartContainer = useRef(null)
  const [graphName, setGraphName] = useState(null)
  const [chartInstance, setChartInstance] = useState(null)
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
        label: `${cityData.city_name}`,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [data['percentile_25'], data['percentile_50'], data['percentile_75']],     
      }  
      options = {
        scales: {
          y: {
            title:{
              display: true,
              text: 'Annual Salary USD',
              font: {
                size: 14
              }
            },
          }
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              font: {
                size: 18
              }
            }
          }
        }
      }
    }
    else if(selection==="stats"){
      setGraphName('Stats (Out of 10)')
      data = cityData.stats
      labels = data.map((stat=>stat.name))
      dataset = {
        label: `${cityData.city_name}`,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: data.map((stat)=>stat['score_out_of_10'])   
      }  
      options = {
        scales: {
          y: {
            title:{
              display: true,
              text: 'Rank out of 10',
              font: {
                size: 14
              }
            },
            min:0,
            max:10
          }
        },
        plugins: {
          legend: {
            display: true,
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
    console.log('initialize chart')
    //else create the new chart
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityData, selection])

  return(
    <GraphContainer>
      <GraphTitle>{graphName}</GraphTitle>
      <Canvas ref={chartContainer}></Canvas>
    </GraphContainer>
  )
}