import React, { useState, useEffect } from 'react';
import GaugeChart from 'react-gauge-chart';
import ReactApexChart from 'react-apexcharts';
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
  const [valV1, setvalV1] = useState();
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
        setvalV1(resultData);
      }); // set data for pin V1
  }, []);
  // Client-side Runtime Data Fetching
  const [valV2, setvalV2] = useState();
  useEffect(() => { // get data from Blynk REST API
    const timer = setTimeout(() => {
      fetch('https://jamoor.nephertz.dev/api/get/V2', {
        headers: {
          Accept: 'application/json',
        },
        credentials: 'include',
      })
        .then((response) => response.json()) // parse JSON from request
        .then((resultData) => {
          setvalV2(resultData); // set data for pin V2
        }, 10000);
      return () => {
        clearTimeout(timer);
      };
    });
  }, []);

  // Client-side Runtime Data Fetching
  const [valV3, setvalV3] = useState();
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
        setvalV3(resultData);
      }); // set data for pin V3
  }, []);
  const valueV1 = parseFloat(valV1) / 100;
  const valueV2 = parseFloat(valV2) / 100;
  const valueV3 = parseFloat(valV3) / 100;
  const ApexChart = {
    series: [valV1],
    options: {
      chart: {
        height: 350,
        type: 'radialBar',
        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: '70%',
            background: '#fff',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24,
            },
          },
          track: {
            background: '#fff',
            strokeWidth: '67%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35,
            },
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: '#888',
              fontSize: '17px',
            },
            value: {
              formatter(val) {
                return parseFloat(val);
              },
              color: '#111',
              fontSize: '36px',
              show: true,
            },
          },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#ABE5A1'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: 'round',
      },
      labels: ['Percent'],
    },

  };
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
          href="https://jamoor.cloudflareaccess.com/cdn-cgi/access/logout"
          target="_blank"
          rel="noopener noreferrer"
        >
          Log Out
        </a>
      </header>
      <p className="text-pink-600">
        {isHardwareConnected}
      </p>
      <div id="card">
        <div id="chart">
          <ReactApexChart options={ApexChart.options} series={ApexChart.series} type="radialBar" height={350} />
        </div>
      </div>
      <div className="md:grid grid-cols-3 bg-gray-900">
        <div className="flex-1">
          <GaugeChart
            id="gauge-chart1"
            percent={valueV1}
            formatTextValue={(value) => `${value}%`}
          />
          <p className="text-white">
            Kelembapan
          </p>
        </div>
        <div className="flex-1">
          <GaugeChart
            id="gauge-chart2"
            percent={valueV2}
            formatTextValue={(value) => `${value}°C`}
          />
          <p className="text-white">
            Temperatur
          </p>
        </div>
        <div className="flex-1">
          <GaugeChart
            id="gauge-chart3"
            percent={valueV3}
            formatTextValue={(value) => `${value}°C`}
          />
          <p className="text-white">
            Temperatur Tangki
          </p>
        </div>
      </div>
      <p className="text-pink-600">
        {valV1}
      </p>
      <p className="text-pink-600">
        {valV2}
      </p>
      <p className="text-pink-600">
        {valV3}
      </p>
    </div>
  );
}

export default App;
