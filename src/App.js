import './App.css';
import MyCalendar from './MyCalendar/MyCalendar';
import * as React from 'react'
import { Reset } from 'styled-reset'
import { Route } from 'react-router-dom';
import SideTemplate from './SideBar/SideTemplate';

function App() {

  return (
    <>
      <React.Fragment>
        <Reset />
      </React.Fragment>
      
      <div id='onday-container'>
        <Route path="/" render={(props) => <SideTemplate {...props} />} exact={true} />
        <Route path="/" render={(props) => <MyCalendar {...props} />} exact={true} />
      </div>
    </>
  );
}

export default App;
