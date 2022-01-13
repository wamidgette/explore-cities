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
const MapLoadingMessage = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: #ffffff90;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  @media${BreakPoints.smallOnly}{
    font-size: 2rem;
  }
`;

const CityLoadingMessage = styled(MapLoadingMessage)`
  font-size: 20px;
`;
const MapArea = styled.div`
  background: var(--water-blue);
  border: 2px solid var(--primary-color);
  box-shadow: -2px 2px 2px var(--primary-color);
  height: 100%;
  @media${BreakPoints.largeDown}{
    flex: 0 0 500px;
  }
  @media${BreakPoints.medDown}{
    flex: 0 0 300px;
  }

`;
const DataDisplay = styled.div`
  background: var(--off-white);
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
  border-bottom-left-radius: 50px;
  overflow: hidden;
  border: 2px solid var(--primary-color);
  @media${BreakPoints.largeDown}{
    position: relative;
    width: 100%;
    border-bottom-left-radius: 0;
  }
`;
const DataNav = styled.nav`
  width: 100%;
  display: flex;
`;
const Tab = styled(TabButton)`
  padding:0;
  margin:0;
`;

const CityName = styled.h3`
  text-align: center;
  margin: 0 30px;
  font-size: 2rem;
  @media${BreakPoints.smallOnly}{
    font-size: 1.5rem
  }
`;
const Selection = styled.div``;

export default function Map({userChoices, setUserChoices}){
  //TODO: if selections have not been made redirect the user to the home page
  const [cityData, setCityData] = useState(null)
  const [selection, setSelection] = useState('salaries')
  const [mapLoading, setMapLoading] = useState(false)
  const [cityLoading, setCityLoading] = useState(false)
  const loader = new Loader({
    apiKey: "AIzaSyAOEAFF4EHYHpp9kiCkK-mnVD7DzRWT9Mg",
    version: "weekly",
  });
  useEffect(()=>{
    setMapLoading(true);
    loader.load().then((google) => {
      //Load the google map
      const zoom = 5;
      const map = new google.maps.Map(document.getElementById("map"), 
      {
        center: { lat: 48.13743, lng: 11.57549 },
        zoom: 4,
        minZoom: zoom - 3,
        maxZoom: zoom + 3,
        disableDefaultUI: true,
        gestureHandling: "greedy",
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
        setTimeout(()=>setMapLoading(false), 1000)
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
    //TODO: Create a cache that holds already clicked cities to reduce requests
    setCityLoading(true)
    Promise.all(urls.map((url)=>fetch(url))).then(async(values)=>{
      //TODO: Could probably add a forEach later to clean this up
      const salariesJsonData = await values[0].json();
      const reportsJsonData = await values[1].json();
      const statsJsonData = await values[2].json();
      dataForUser.salaries = salariesJsonData.salaries.find((object)=>object.job.id===userChoices.job)
      dataForUser.reports = reportsJsonData.categories.find((object)=>object.id===userChoices.priority)
      userChoices.stats.forEach((stat)=>dataForUser.stats.push(statsJsonData.categories.find((object)=>object.name===stat)))
      setCityData(dataForUser)
      setCityLoading(false)
    })
  }
  return (
    <MapWrapper>
      {mapLoading && <MapLoadingMessage><span>Loading Map...</span></MapLoadingMessage>}
      <MapArea id='map'></MapArea>
      <Data>
        {cityLoading && <CityLoadingMessage>Loading city data...</CityLoadingMessage>}
        <DataNav>
          <Tab className={selection==='salaries'? "active" : ""} onClick={()=>setSelection('salaries')}>Salaries</Tab>
          <Tab className={selection==='stats'? "active" : ""} onClick={()=>setSelection('stats')}>Stats</Tab>
          <Tab className={selection==='reports'? "active" : ""} onClick={()=>setSelection('reports')}>Report</Tab>
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