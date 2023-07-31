import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import Chart from 'react-google-charts';
import { tokens } from "../../theme";

const GSGoogleChart = () => {
  const [chartData, setChartData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/vote/category/1/all/'); // Replace with your API endpoint
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: "80px 50px",
        backgroundColor: colors.primary[200],
        borderRadius: '8px',
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
      }}
    >
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
          title: 'Vote Count for Candidates in GENERAL SECRETARY CATEGORY',
          width: '100%',
          colors: [colors.greenAccent[500],colors.greenAccent[400],colors.greenAccent[300],colors.greenAccent[200],colors.greenAccent[100]],
          height: 350,
          legend: { position: 'none' },
          vAxis: {
            title: 'Candidate',
          },
          hAxis: {
            title: 'Vote Count',
          },
          backgroundColor: 'transparent',
          chartArea: {
            width: '70%',
          },
          bar: {
            groupWidth: '60%',
          },
        }}
      />
    </Box>
  );
};

export default GSGoogleChart;
