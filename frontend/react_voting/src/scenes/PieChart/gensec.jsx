import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import Chart from 'react-google-charts';
import { tokens } from "../../theme";


 
const GGooglePieChart = () => {
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

  const chartRows = chartData.map((candidate) => [candidate.candidate_name, candidate.vote_count]);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: "80px 50px",
        backgroundColor: theme.palette.primary[200],
        borderRadius: '8px',
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
      }}
    >
      <Box width="80%">
        <Typography variant="h5" color="primary" gutterBottom>
          Vote Count in General Secretary Category
        </Typography>
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
            colors: [colors.greenAccent[500],colors.greenAccent[300],colors.greenAccent[200],colors.greenAccent[100],colors.greenAccent[700]],
            backgroundColor: colors.primary[100],
          }}
        />
      </Box>
    </Box>
  );
};

export default GGooglePieChart;
