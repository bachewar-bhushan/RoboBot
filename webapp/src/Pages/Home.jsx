import React, { useEffect, useState } from 'react';
import ReactSpeedometer from "react-d3-speedometer";
import VisualisationGraph from '../Components/VisualisationGraph';

const Home = () => {
  const [streamURL, setStreamURL] = useState('');
  const [sensorValues, setSensorValues] = useState({date:'', MQ2: '', MQ3: '', MQ135: '' });
  const [anomalies, setAnomalies] = useState([]);
  const [currentRowIndex, setCurrentRowIndex] = useState(1);

  const STREAM_GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1L5EZOriApgFilIcOFvtuSb9e1_fYf5HhOA5zftnnxPI/edit?gid=0#gid=0';
  const SENSOR_GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1NHgHWxy_4XP16883YpW4CL920zkthJTEksoNU2FsC1g/edit?gid=0#gid=0';

  useEffect(() => {
    const fetchStreamURL = async () => {
      try {
        const response = await fetch(STREAM_GOOGLE_SHEET_URL);
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const rows = Array.from(doc.querySelectorAll('table tbody tr'));

        if (rows.length > 0) {
          const latestRow = rows[rows.length - 1];
          const cells = latestRow.querySelectorAll('td');
          const url = cells[1].innerText; 
          console.log(url);
          setStreamURL(url);
        }
      } catch (error) {
        console.error('Error fetching the stream URL:', error);
      }
    };

    fetchStreamURL();
  }, []);

  useEffect(() => {
    const fetchSensorValues = async () => {
      try {
        const response = await fetch(SENSOR_GOOGLE_SHEET_URL);
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const rows = Array.from(doc.querySelectorAll('table tbody tr'));
        
        if (rows.length > 0 && currentRowIndex < rows.length) {
          const latestRow = rows[currentRowIndex];
          const cells = latestRow.querySelectorAll('td');
          const date = cells[0].innerText;
          console.log("date",date);
          const MQ2 = parseFloat(cells[1].innerText);
          console.log("MQ2",MQ2);
          const MQ3 = parseFloat(cells[2].innerText);
          console.log("MQ3",MQ3);
          const MQ135 = parseFloat(cells[3].innerText);
          console.log("MQ135",MQ135);

          const newValues = { date, MQ2, MQ3, MQ135 };
          setSensorValues(newValues);
          console.log("snsor values: ",sensorValues)

          const anomalyResponse = await fetch('http://127.0.0.1:5000/api/predict-anomalies', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newValues),
          });
          const anomalyData = await anomalyResponse.json();
          setAnomalies(prev => [...prev, { ...newValues, anomalies: anomalyData }]);
          console.log(anomalies)

          setCurrentRowIndex(prevIndex => prevIndex + 1); // Increment currentRowIndex
        }
      } catch (error) {
        console.error('Error fetching sensor values:', error);
      }
    };

    fetchSensorValues();

    const interval = setInterval(fetchSensorValues, 10000);

    return () => clearInterval(interval);
  }, [currentRowIndex]);

  return (
    <>
      <section id="home" className="h-[100vh] mx-12 ">
        <div className='flex justify-between pt-14'>
          <div>
            <h1 className="font-black flex justify-center my-2">Live Streaming from Bot</h1>
            <div>
              {streamURL ? (
                <img className="h-96" src={streamURL} alt="Live Stream" />
              ) : (
                <p className="flex justify-center items-center h-96 ">Loading stream...</p>
              )}
            </div>
          </div>
          <div className='pl-4 flex flex-col justify-center items-center w-[55vw]'>
            <h1 className="font-black flex mt-2">Data Visualisation</h1>
            <VisualisationGraph sensorValues={sensorValues} anomalies={anomalies} />
          </div>
        </div>
        <div className="flex justify-between items-center mt-8 ">
          <div className="guage h-44  w-72">
            <h2 className="text-center font-black text-lg">MQ2</h2>
            <ReactSpeedometer
              maxValue={5000}
              value={sensorValues.MQ2}
              needleColor="red"
              startColor="green"
              segments={10}
              endColor="blue"
            />
          </div>
          <div className="guage h-44  w-72">
            <h2 className="text-center font-black text-lg">MQ3</h2>
            <ReactSpeedometer
              maxValue={5000}
              value={sensorValues.MQ3}
              needleColor="red"
              startColor="green"
              segments={10}
              endColor="blue"
            />
          </div>
          <div className="guage h-44  w-72">
            <h2 className="text-center font-black text-lg">MQ135</h2>
            <ReactSpeedometer
              maxValue={5000}
              value={sensorValues.MQ135}
              needleColor="red"
              startColor="green"
              segments={10}
              endColor="blue"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
