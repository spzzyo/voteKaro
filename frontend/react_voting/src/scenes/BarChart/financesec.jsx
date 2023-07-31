import React, { useState, useEffect } from 'react';
import Chart from 'react-google-charts';

const FSGoogleChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/vote/category/2/all/'); 
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Vote Count for Candidates</h2>
      <Chart
        width={'100%'}
        height={400}
        chartType="BarChart"
        loader={<div>Loading Chart...</div>}
        data={[
          ['Candidate', 'Vote Count'],
          ...chartData.map((candidate) => [candidate.candidate_name, candidate.vote_count]),
        ]}
        options={{
          title: 'Vote Count for Candidates',
          width: '100%',
          height: 400,
          legend: { position: 'none' },
          vAxis: {
            title: 'Candidate',
          },
          hAxis: {
            title: 'Vote Count',
          },
        }}
      />
    </div>
  );
};

export default FSGoogleChart;
