import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import './global.scss'
import Header from './components/Header'
import Welcome from './components/Welcome';
import Job from './components/Job'
import Priority from './components/Priority'
import Stats from './components/Stats'
import MainApp from './components/Map'
import styled from 'styled-components'
import { Helmet } from 'react-helmet';
import formData from './data/form-data';
const AppDiv = styled.div`
`;
function App() {
  const [userChoices, setUserChoices] = useState({
    job: formData.jobs[0].id,
    priority: formData.reports[0].id,
    stats: []
  }) 
  //if cached, use cached userchoices (preserves when user refreshes)
  console.log(userChoices)
  return (
    <AppDiv className = "app">  
      <Helmet>
        <meta charSet="utf-8" />
        <title>Urban Area Info Finder</title>
      </Helmet>
      <Header/>
      <main>
        <Routes>
          <Route path='/' element={<Welcome/>}/>
          <Route path='/welcome' element={<Welcome/>}/>
          <Route path='/job' element={<Job userChoices={userChoices} setUserChoices={setUserChoices} data={formData.jobs}/>} />
          <Route path='/priority' element={<Priority userChoices={userChoices} setUserChoices={setUserChoices} data={formData.reports}/>}/>
          <Route path='/stats' element={<Stats userChoices={userChoices} setUserChoices={setUserChoices} data={formData.scores}/>}/>
          <Route path='/map' element={<MainApp userChoices={userChoices} setUserChoices={setUserChoices}/>}/>
        </Routes>
      </main>
    </AppDiv>
  );
}
export default App;