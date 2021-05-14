import React, { useState, useEffect } from 'react';
import GaugeChart from 'react-gauge-chart';
import logo from './logo.svg';
import './App.css';

function App() {
  // Client-side Runtime Data Fetching
  const [isHardwareConnected, sethardwareStatus] = useState('Fetching data');
  useEffect(() => {
    // get data from Blynk REST API
    fetch('https://jamoor.nephertz.dev/api/isHardwareConnected', {
      headers: {
        Accept: 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => response.text()) // parse JSON from request
      .then((resultData) => {
        sethardwareStatus(resultData === 'true' ? 'ONLINE' : 'OFFLINE');
      }); // set data for hardware status
  }, []);
  // Client-side Runtime Data Fetching
  const [valV1, setvalV1] = useState('Fetching data');
  useEffect(() => {
    // get data from Blynk REST API
    fetch('https://jamoor.nephertz.dev/api/get/V1', {
      headers: {
        Accept: 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => response.json()) // parse JSON from request
      .then((resultData) => {
        setvalV1(`${resultData}%`);
      }); // set data for pin V1
  }, []);
  // Client-side Runtime Data Fetching
  const [valV2, setvalV2] = useState('Fetching data');
  useEffect(() => {
    // get data from Blynk REST API
    fetch('https://jamoor.nephertz.dev/api/get/V2', {
      headers: {
        Accept: 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => response.json()) // parse JSON from request
      .then((resultData) => {
        setvalV2(`${resultData}°C`);
      }); // set data for pin V2
  }, []);

  // Client-side Runtime Data Fetching
  const [valV3, setvalV3] = useState('Fetching data');
  useEffect(() => {
    // get data from Blynk REST API
    fetch('https://jamoor.nephertz.dev/api/get/V3', {
      headers: {
        Accept: 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => response.json()) // parse JSON from request
      .then((resultData) => {
        setvalV3(`${resultData}°C`);
      }); // set data for pin V3
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="text-pink-600">
          Edit
          {' '}
          <code>src/App.js</code>
          {' '}
          and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <p className="text-pink-600">
        {isHardwareConnected}
      </p>
      <div className="md:grid grid-cols-3 bg-gray-900">
        <GaugeChart
          id="gauge-chart1"
          className="flex-1"
          percent={valV1}
          arcWidth={0.3}
          formatTextValue={(value) => `${value}°C`}
        />
        <GaugeChart
          id="gauge-chart2"
          className="flex-1"
          percent={valV2}
          arcWidth={0.3}
          formatTextValue={(value) => `${value}°C`}
        />
        <GaugeChart
          id="gauge-chart3"
          className="flex-1"
          percent={valV3}
          arcWidth={0.3}
          formatTextValue={(value) => `${value}°C`}
        />
      </div>
    </div>
  );
}

export default App;
