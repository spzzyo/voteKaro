import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

const SGooglePieChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/vote/category/3/all/'); // Replace with your API endpoint
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const chartRows = chartData.map((candidate) => [candidate.candidate_name, candidate.vote_count]);

  return (
    <div>
      <h2>Vote Count for Candidates - Pie Chart</h2>
      <Chart
        width={'100%'}
        height={400}
        chartType="PieChart"
        loader={<div>Loading Chart...</div>}
        data={[['Candidate', 'Votes'], ...chartRows]}
        options={{
          title: 'Vote Count for Candidates',
          width: '100%',
          height: 400,
        }}
      />
    </div>
  );
};

export default SGooglePieChart;
