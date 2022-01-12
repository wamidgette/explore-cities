import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components'
import { BreakPoints, TextButton, DirectionButton, TabButton } from '../styles/styles';
import { Link } from 'react-router-dom';
import { Loader } from "@googlemaps/js-api-loader"
import {getAllCities} from '../helpers/teleport'
import { Graph } from './Graph';
import { Report } from './Report';

const MapWrapper = styled.div`
  width: 100%;
  flex: 1 0;
  position: relative;
  height: 75vh;
  min-height:500px;
  display:flex;
  flex-direction: column;
  @media${BreakPoints.largeDown}{
    height: max-content;
  }
`;
const Loading = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: #ffffff90;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
`;
const MapArea = styled.div`
  background: var(--water-blue);
  border-radius-top-left: 50%;
  border: 2px solid var(--primary-color);
  box-shadow: -2px 2px 2px var(--primary-color);
  height: 100%;
  @media${BreakPoints.largeDown}{
    flex: 0 0 500px;
  }
`;
const DataDisplay = styled.div`
  background: var(--off-white);
  border: 2px solid var(--primary-color);
  margin-top: -2px;
  padding: 20px;
  @media${BreakPoints.largeDown}{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
  }
`;
const Data = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 400px;
  @media${BreakPoints.largeDown}{
    position: relative;
    width: 100%;
  }
`;
const DataNav = styled.nav`
  width: 100%;
  display: flex;
  border: 2px solid var(--primary-color);
  border-bottom: none;
`;
const Tab = styled(TabButton)`
`;

const CityName = styled.h3`
  text-align: center;
  margin: 0 30px;
  font-size: 2rem;
`;
const Selection = styled.div``;

export default function Map({userChoices, setUserChoices}){
  //TODO: if selections have not been made redirect the user to the home page
  const [cityData, setCityData] = useState(null)
  const [selection, setSelection] = useState('salaries')
  const [loading, setLoading] = useState(false)
  const loader = new Loader({
    apiKey: "AIzaSyAOEAFF4EHYHpp9kiCkK-mnVD7DzRWT9Mg",
    version: "weekly",
  });
  useEffect(()=>{
    setLoading(true);
    loader.load().then((google) => {
      //Load the google map
      const zoom = 5;
      const map = new google.maps.Map(document.getElementById("map"), 
      {
        center: { lat: 48.13743, lng: 11.57549 },
        zoom: 4,
        minZoom: zoom - 3,
        maxZoom: zoom + 3,
        restriction: {
          latLngBounds: {
            north: 80,
            south: -70,
            east: 185,
            west: 190,
          },
        },
      })
      //Populate map with city locations
      getAllCities().then((cities)=>{
        cities.forEach(async(city, index)=>{
          console.log('adding marker')
          const marker = await new google.maps.Marker({
            position: {lat : city.lat, lng : city.lng},
            map: map,
            title: city.name,
            optimized : true,
            index: index
          });
          marker.addListener("click", function(){
            handleClick(marker, map, cities);
        });
        })
        //A bit eye-jerky for the user removing the loading div - make less abrupt
        setTimeout(()=>setLoading(false), 1000)
      })
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleClick(marker, map, cities){
    //Then pan to the new location
    map.panTo({lat:marker.position.lat(), lng:marker.position.lng()});
    //While map is panning, set the new cityData based on the marker clicked
    const city = cities[marker.index]
    const urbanAreaUrl =city.urbanAreaUrl
    const urls = [
      urbanAreaUrl + 'salaries',
      urbanAreaUrl +'details',
      urbanAreaUrl + 'scores'
    ]
    let dataForUser =  {
      city_name: city.name,
      salaries: [],
      reports: [],
      stats: []
    }
    Promise.all(urls.map((url)=>fetch(url))).then(async(values)=>{
      //TODO: Could probably add a forEach later to clean this up
      const salariesJsonData = await values[0].json();
      const reportsJsonData = await values[1].json();
      const statsJsonData = await values[2].json();
      dataForUser.salaries = salariesJsonData.salaries.find((object)=>object.job.id===userChoices.job)
      dataForUser.reports = reportsJsonData.categories.find((object)=>object.id===userChoices.priority)
      userChoices.stats.forEach((stat)=>dataForUser.stats.push(statsJsonData.categories.find((object)=>object.name===stat)))
      setCityData(dataForUser)
    })
  }
  useEffect(()=>{
    console.log(cityData)
  },[cityData])
  return (
    <MapWrapper>
      {loading && <Loading><span>Loading Map...</span></Loading>}
      <MapArea id='map'></MapArea>
      <Data>
        <DataNav>
          <Tab className={selection==='salaries'? "active" : ""} onClick={()=>setSelection('salaries')}>Salaries</Tab>
          <Tab className={selection==='reports'? "active" : ""} onClick={()=>setSelection('reports')}>Report</Tab>
          <Tab className={selection==='stats'? "active" : ""} onClick={()=>setSelection('stats')}>Stats</Tab>
        </DataNav>
        <DataDisplay>
          <CityName>{cityData? cityData.city_name : "click a city"}</CityName>
          {selection==='reports'? <Report cityData={cityData}></Report> : <Graph cityData={cityData} selection={selection}></Graph> }    
        </DataDisplay>
        <Selection></Selection>
      </Data>
    </MapWrapper>
  )
}