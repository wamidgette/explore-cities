//Holds functions calling Teleport API
export async function getAllCities(){
  const mainCities = [];
    await fetch('https://api.teleport.org/api/urban_areas/?embed=ua%3Aitem%2Fua%3Aidentifying%2Dcity').then(
        function(response){
          return response.json();
        }
    ).then((data)=>{
        const urbanAreas = data._embedded["ua:item"];
        //Add name and coordinates of each city to the mainCitites array
        urbanAreas.forEach((urbanArea)=>{
          const cityCoordinates = urbanArea._embedded['ua:identifying-city'].location.latlon
          const urabAreaUrl = urbanArea._embedded['ua:identifying-city']._links["city:urban_area"].href;
          mainCities.push({
            name: urbanArea.name,
            lat: cityCoordinates.latitude,
            lng: cityCoordinates.longitude,
            urbanAreaUrl: urabAreaUrl
          })
        })
      }
    )
    return mainCities;
}