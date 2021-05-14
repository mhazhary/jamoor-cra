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
        setvalV1(resultData.Number() / 100);
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
        setvalV2(resultData.Number() / 100);
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
        setvalV3(resultData.Number() / 100);
      }); // set data for pin V3
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo flex-1" alt="logo" />
        <p className="text-pink-600 flex-3">
          Dashboard
          {' '}
          <code>Jamoor</code>
          {' '}
        </p>
        <a
          className="App-link flex-1"
          href="https://http://jamoor.cloudflareaccess.com/cdn-cgi/access/logout"
          target="_blank"
          rel="noopener noreferrer"
        >
          Log Out
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
          formatTextValue={(value) => `${value}%`}
        />
        <GaugeChart
          id="gauge-chart2"
          className="flex-1"
          percent={valV2}
          formatTextValue={(value) => `${value}°C`}
        />
        <GaugeChart
          id="gauge-chart3"
          className="flex-1"
          percent={valV3}
          formatTextValue={(value) => `${value}°C`}
        />
      </div>
    </div>
  );
}

export default App;
