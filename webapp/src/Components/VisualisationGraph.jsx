import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const VisualisationGraph = ({ sensorValues, anomalies }) => {
  const [showAll, setShowAll] = useState(false);
  const [startIndex, setStartIndex] = useState(Math.max(anomalies.length - 10, 0));

  const maxIndex = Math.max(anomalies.length - 10, 0);

  // Determine the range of data to display
  const displayAnomalies = showAll ? anomalies : anomalies.slice(startIndex, startIndex + 10);

  const timestamps = displayAnomalies.map(anomaly => anomaly.date);
  const MQ2Values = displayAnomalies.map(anomaly => anomaly.MQ2);
  const MQ3Values = displayAnomalies.map(anomaly => anomaly.MQ3);
  const MQ135Values = displayAnomalies.map(anomaly => anomaly.MQ135);

  // Filter anomalies for red dots
  const MQ2Anomalies = displayAnomalies.map(anomaly => anomaly.anomalies.MQ2 === -1 ? anomaly.MQ2 : null);
  const MQ3Anomalies = displayAnomalies.map(anomaly => anomaly.anomalies.MQ3 === -1 ? anomaly.MQ3 : null);
  const MQ135Anomalies = displayAnomalies.map(anomaly => anomaly.anomalies.MQ135 === -1 ? anomaly.MQ135 : null);

  useEffect(() => {
    if (showAll) {
      // Reset slider position when showing all data
      setStartIndex(0);
    } else {
      // Ensure startIndex is within valid range when showing latest 10 points
      setStartIndex(Math.max(anomalies.length - 10, 0));
    }
  }, [anomalies.length, showAll]);

  const handleSliderChange = (event) => {
    const newStartIndex = parseInt(event.target.value, 10);
    setStartIndex(newStartIndex);
  };

  const handleToggleClick = () => {
    setShowAll(prevShowAll => !prevShowAll);
  };

  return (
    <div style={{ width: '100%', height: '384px' }}>
      <Plot
        className='h-96'
        data={[
          {
            x: timestamps,
            y: MQ2Values,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'MQ2',
            marker: { color: 'blue' },
          },
          {
            x: timestamps,
            y: MQ2Anomalies,
            type: 'scatter',
            mode: 'markers',
            name: 'MQ2 Anomalies',
            marker: { color: 'red', symbol: 'circle', size: 7 },
          },
          {
            x: timestamps,
            y: MQ3Values,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'MQ3',
            marker: { color: 'green' },
          },
          {
            x: timestamps,
            y: MQ3Anomalies,
            type: 'scatter',
            mode: 'markers',
            name: 'MQ3 Anomalies',
            marker: { color: 'red', symbol: 'circle', size: 7 },
          },
          {
            x: timestamps,
            y: MQ135Values,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'MQ135',
            marker: { color: 'orange' },
          },
          {
            x: timestamps,
            y: MQ135Anomalies,
            type: 'scatter',
            mode: 'markers',
            name: 'MQ135 Anomalies',
            marker: { color: 'red', symbol: 'circle', size: 7 },
          },
        ]}
        layout={{
          xaxis: { title: 'Timestamp', tickangle: 0 },
          yaxis: { title: 'Sensor Values' },
          autosize: true,
          margin: { t: 40, b: 40, l: 60, r: 30 },
        }}
        style={{ width: '100%', height: '350px' }}
      />

      <input
        type="range"
        min="0"
        max={showAll ? anomalies.length - 1 : maxIndex}
        value={startIndex}
        onChange={handleSliderChange}
        style={{ width: '80%', marginTop: '2px', height: '1px' }}
        disabled={showAll} // Disable slider when showing all data
      />

      <button onClick={handleToggleClick} className='mt-2 ml-2 bg-gray-300 py-1 px-2 rounded-xl text-xs font-medium '>
        {showAll ? 'Show Last 10 Points' : 'Show All Points'}
      </button>
    </div>
  );
};

export default VisualisationGraph;
